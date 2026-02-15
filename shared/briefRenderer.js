import { AccordionGroup } from "../core/components/accordion.js";
import { Field, Input, Select, Textarea } from "../core/components/formControls.js";
import { generateBriefPdf } from "./pdf.js";
import { submitBrief } from "./api.js";
import { validateEmail, validatePhone, isNumeric } from "./helpers.js";

function renderMultiCheckbox({ name, options, label, sectionId }) {
  const items = options
    .map(
      (option) => `
        <label class="c-field__check">
          <input type="checkbox" name="${name}" value="${option.value}" />
          <span>${option.label}</span>
        </label>
      `
    )
    .join("");

  return `
    <div class="c-field" data-field="${name}" data-section="${sectionId}" data-field-type="multiCheckbox">
      <div class="c-field__label">
        <span>${label}</span>
        <div class="c-field__row">${items}</div>
      </div>
      <div class="c-field__error" data-error-for="${name}"></div>
    </div>
  `;
}

function renderFileInput({ name, label, multiple, sectionId }) {
  return `
    <div class="c-field" data-field="${name}" data-section="${sectionId}" data-field-type="file">
      <label class="c-field__label">
        <span>${label}</span>
        <input class="c-input" type="file" name="${name}" ${multiple ? "multiple" : ""} />
      </label>
      <div class="c-field__error" data-error-for="${name}"></div>
    </div>
  `;
}

function renderField(field, sectionId) {
  if (field.type === "multiCheckbox") {
    return renderMultiCheckbox({ ...field, sectionId });
  }

  if (field.type === "file") {
    return renderFileInput({ ...field, sectionId });
  }

  let inputHtml = "";
  if (field.type === "select") {
    inputHtml = Select({ id: field.name, name: field.name, options: field.options || [] });
  } else if (field.type === "textarea") {
    inputHtml = Textarea({ id: field.name, name: field.name, placeholder: field.placeholder || "" });
  } else {
    inputHtml = Input({
      id: field.name,
      name: field.name,
      type: field.type,
      placeholder: field.placeholder || ""
    });
  }

  return `
    <div class="c-field" data-field="${field.name}" data-section="${sectionId}" data-field-type="${field.type}">
      ${Field({ label: field.label, inputId: field.name, hint: field.hint || "", inputHtml })}
      <div class="c-field__error" data-error-for="${field.name}"></div>
    </div>
  `;
}

function wrapConditional(content, field) {
  if (!field.showWhen) return content;
  const mode = field.showMode ? ` data-show-mode="${field.showMode}"` : "";
  return `
    <div class="u-conditional" data-show-when="${field.showWhen}"${mode}>
      ${content}
    </div>
  `;
}

function renderSection(section, index) {
  const description = section.description ? `<p class="c-card__meta">${section.description}</p>` : "";
  const fieldsHtml = section.fields.map((field) => wrapConditional(renderField(field, section.id), field)).join("");

  const title = `
    <span class="b-accordion-title">
      <span class="b-accordion-title__index">${index + 1}</span>
      <span>${section.title}</span>
      <span class="b-accordion-title__status" data-section-status="${section.id}">0/${section.fields.length}</span>
    </span>
  `;

  return {
    id: section.id,
    title,
    content: `<div class="b-section-body" id="brief-anchor-${section.id}" data-brief-section="${section.id}">${description}${fieldsHtml}</div>`,
    open: index === 0
  };
}

function buildProgress(schema, form) {
  const result = {
    total: 0,
    completed: 0,
    bySection: {}
  };

  schema.sections.forEach((section) => {
    const sectionState = { total: 0, completed: 0 };

    section.fields.forEach((field) => {
      const fieldNode = form.querySelector(`[data-field="${field.name}"]`);
      if (!fieldNode) return;

      const conditionalParent = fieldNode.closest(".u-conditional");
      const hidden = conditionalParent ? conditionalParent.classList.contains("u-hidden") : false;
      if (hidden) return;

      sectionState.total += 1;
      result.total += 1;

      const value = getFieldValue(field, form);
      if (typeof value === "string" ? value.trim() !== "" : Boolean(value)) {
        sectionState.completed += 1;
        result.completed += 1;
      }
    });

    result.bySection[section.id] = sectionState;
  });

  result.percent = result.total > 0 ? Math.round((result.completed / result.total) * 100) : 0;
  return result;
}

function renderProgressState(schema, form) {
  const progress = buildProgress(schema, form);

  const label = form.querySelector("[data-brief-progress-label]");
  const bar = form.querySelector("[data-brief-progress-bar]");
  const count = form.querySelector("[data-brief-progress-count]");
  const total = form.querySelector("[data-brief-progress-total]");

  if (label) label.textContent = `${progress.percent}%`;
  if (bar) bar.style.width = `${progress.percent}%`;
  if (count) count.textContent = String(progress.completed);
  if (total) total.textContent = String(progress.total);

  schema.sections.forEach((section) => {
    const sectionData = progress.bySection[section.id] || { completed: 0, total: 0 };
    const statusText = `${sectionData.completed}/${sectionData.total}`;

    form.querySelectorAll(`[data-section-status="${section.id}"]`).forEach((node) => {
      node.textContent = statusText;
      node.classList.toggle("is-done", sectionData.total > 0 && sectionData.completed === sectionData.total);
    });

    document.querySelectorAll(`[data-nav-status="${section.id}"]`).forEach((node) => {
      node.textContent = statusText;
      node.classList.toggle("is-done", sectionData.total > 0 && sectionData.completed === sectionData.total);
    });
  });
}

function updateConditionalFields(form) {
  const conditionalFields = form.querySelectorAll(".u-conditional");
  const formData = new FormData(form);

  conditionalFields.forEach((wrapper) => {
    const condition = wrapper.dataset.showWhen || "";
    const mode = wrapper.dataset.showMode || "equals";
    const [fieldName, expected] = condition.split(":");
    if (!fieldName || !expected) return;

    let shouldShow = false;
    if (mode === "includes") {
      const values = formData.getAll(fieldName);
      shouldShow = values.includes(expected);
    } else {
      const value = formData.get(fieldName);
      shouldShow = value === expected;
    }

    wrapper.classList.toggle("u-hidden", !shouldShow);
  });
}

function getFieldValue(field, form) {
  const data = new FormData(form);

  if (field.type === "multiCheckbox") {
    const values = data.getAll(field.name);
    return values.length ? values.join(", ") : "";
  }

  if (field.type === "file") {
    const files = form.querySelector(`input[name="${field.name}"]`)?.files;
    if (!files || files.length === 0) return "";
    return Array.from(files)
      .map((file) => file.name)
      .join(", ");
  }

  return data.get(field.name) || "";
}

function validateForm(schema, form) {
  const errors = {};

  schema.sections.forEach((section) => {
    section.fields.forEach((field) => {
      const fieldNode = form.querySelector(`[data-field="${field.name}"]`);
      const conditionalParent = fieldNode ? fieldNode.closest(".u-conditional") : null;
      const hidden = conditionalParent ? conditionalParent.classList.contains("u-hidden") : false;
      if (hidden) return;

      const value = getFieldValue(field, form);

      if (field.type === "email" && value && !validateEmail(value)) {
        errors[field.name] = "Проверьте корректность email";
      }

      if (field.type === "tel" && value && !validatePhone(value)) {
        errors[field.name] = "Проверьте корректность телефона";
      }

      if (field.type === "number" && value && !isNumeric(value)) {
        errors[field.name] = "Нужно число";
      }
    });
  });

  return errors;
}

function renderErrors(form, errors) {
  form.querySelectorAll(".c-field__error").forEach((node) => {
    node.textContent = "";
  });

  Object.entries(errors).forEach(([name, message]) => {
    const target = form.querySelector(`[data-error-for="${name}"]`);
    if (target) {
      target.textContent = message;
    }
  });
}

function buildSectionsForPdf(schema, form) {
  return schema.sections.map((section) => {
    const items = section.fields.map((field) => {
      const value = getFieldValue(field, form);
      return {
        label: field.label,
        value: value && value.trim() ? value : "—"
      };
    });

    return {
      title: section.title,
      items
    };
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("is-open");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("is-open");
  }
}

function initBriefNavigation(form) {
  const layout = form.closest(".b-brief-layout") || document;
  const links = Array.from(layout.querySelectorAll("[data-nav-target]"));
  const sections = Array.from(form.querySelectorAll("[data-brief-section]"));

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionId = link.dataset.navTarget;
      const summary = sectionId ? document.getElementById(sectionId) : null;
      const details = summary ? summary.closest("details") : null;

      if (details) {
        details.open = true;
        details.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const sectionId = entry.target.dataset.briefSection;
        if (!sectionId) return;

        links.forEach((link) => link.classList.remove("is-active"));
        const active = layout.querySelector(`[data-nav-target="${sectionId}"]`);
        if (active) active.classList.add("is-active");
      });
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: [0.2, 0.6] }
  );

  sections.forEach((section) => observer.observe(section));
}

export function renderBriefShell(schema, options = {}) {
  const guidanceTitle = options.guidanceTitle || "Как заполнить бриф";
  const guidanceItems = options.guidanceItems || [];
  const totalFields = schema.sections.reduce((sum, section) => sum + section.fields.length, 0);

  const sectionsHtml = AccordionGroup(schema.sections.map((section, index) => renderSection(section, index)));

  const navItems = schema.sections
    .map(
      (section, index) => `
        <li>
          <a class="b-step-link" href="#brief-anchor-${section.id}" data-nav-target="${section.id}">
            <span class="b-step-link__index">${index + 1}</span>
            <span class="b-step-link__text">${section.title}</span>
            <span class="b-step-link__status" data-nav-status="${section.id}">0/${section.fields.length}</span>
          </a>
        </li>
      `
    )
    .join("");

  const guideItems = guidanceItems
    .map((item) => `<li class="b-guide__item"><span>•</span><span>${item}</span></li>`)
    .join("");

  const progressHtml = `
    <section class="b-progress-card">
      <div class="b-progress-card__top">
        <h2>Прогресс заполнения</h2>
        <span class="b-progress-card__value" data-brief-progress-label>0%</span>
      </div>
      <div class="b-progress-track">
        <span class="b-progress-track__bar" data-brief-progress-bar style="width: 0%;"></span>
      </div>
      <p class="c-card__meta">Заполнено <span data-brief-progress-count>0</span> из <span data-brief-progress-total>${totalFields}</span> полей</p>
    </section>
  `;

  const sidebarHtml = `
    <section class="b-panel">
      <h2 class="b-panel__title">Маршрут заполнения</h2>
      <ol class="b-steps">${navItems}</ol>
    </section>
    <section class="b-panel">
      <h2 class="b-panel__title">${guidanceTitle}</h2>
      <ul class="b-guide">${guideItems}</ul>
    </section>
  `;

  return {
    sectionsHtml,
    progressHtml,
    sidebarHtml
  };
}

export function initBriefForm({ formId, schema, serviceType, serviceLabel }) {
  const form = document.getElementById(formId);
  if (!form) return;

  const modalId = "brief-success-modal";

  function syncUi() {
    updateConditionalFields(form);
    renderProgressState(schema, form);
  }

  syncUi();
  initBriefNavigation(form);

  form.addEventListener("change", syncUi);
  form.addEventListener("input", syncUi);

  const downloadButton = form.querySelector("[data-action='download-pdf']");
  const modalClose = form.querySelector("[data-action='close-modal']");
  const modalDownload = form.querySelector("[data-action='modal-download']");

  async function handlePdfDownload() {
    const sections = buildSectionsForPdf(schema, form);
    const { url, fileName } = await generateBriefPdf({
      title: `Бриф: ${serviceLabel}`,
      sections
    });

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  }

  if (downloadButton) {
    downloadButton.addEventListener("click", handlePdfDownload);
  }

  if (modalClose) {
    modalClose.addEventListener("click", () => closeModal(modalId));
  }

  if (modalDownload) {
    modalDownload.addEventListener("click", handlePdfDownload);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    syncUi();

    const errors = validateForm(schema, form);
    renderErrors(form, errors);

    const firstError = Object.keys(errors)[0];
    if (firstError) {
      const fieldNode = form.querySelector(`[data-field="${firstError}"]`);
      const details = fieldNode ? fieldNode.closest("details") : null;
      if (details) {
        details.open = true;
        details.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const sections = buildSectionsForPdf(schema, form);
    const { url } = await generateBriefPdf({
      title: `Бриф: ${serviceLabel}`,
      sections
    });

    await submitBrief({
      serviceType,
      serviceLabel,
      payload: { sections },
      pdfUrl: url,
      email: new FormData(form).get("contact_email") || ""
    });

    openModal(modalId);
  });
}
