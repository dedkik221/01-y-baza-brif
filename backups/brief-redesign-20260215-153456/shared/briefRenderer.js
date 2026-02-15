import { AccordionGroup } from "../core/components/accordion.js";
import { Field, Input, Select, Textarea } from "../core/components/formControls.js";
import { generateBriefPdf } from "./pdf.js";
import { submitBrief } from "./api.js";
import { validateEmail, validatePhone, isNumeric } from "./helpers.js";

function renderMultiCheckbox({ name, options, label }) {
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
    <div class="c-field">
      <div class="c-field__label">
        <span>${label}</span>
        <div class="c-field__row">${items}</div>
      </div>
      <div class="c-field__error" data-error-for="${name}"></div>
    </div>
  `;
}

function renderFileInput({ name, label, multiple }) {
  return `
    <div class="c-field">
      <label class="c-field__label">
        <span>${label}</span>
        <input class="c-input" type="file" name="${name}" ${multiple ? "multiple" : ""} />
      </label>
      <div class="c-field__error" data-error-for="${name}"></div>
    </div>
  `;
}

function renderField(field) {
  if (field.type === "multiCheckbox") {
    return renderMultiCheckbox(field);
  }

  if (field.type === "file") {
    return renderFileInput(field);
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
    <div class="c-field" data-field="${field.name}">
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

function renderSection(section) {
  const description = section.description
    ? `<p class="c-card__meta">${section.description}</p>`
    : "";
  const fieldsHtml = section.fields
    .map((field) => wrapConditional(renderField(field), field))
    .join("");

  return {
    id: section.id,
    title: section.title,
    content: `${description}${fieldsHtml}`,
    open: section.open || false
  };
}

export function renderBriefSections(schema) {
  const sections = schema.sections.map(renderSection);
  return AccordionGroup(sections);
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

export function initBriefForm({ formId, schema, serviceType, serviceLabel }) {
  const form = document.getElementById(formId);
  if (!form) return;

  updateConditionalFields(form);
  form.addEventListener("change", () => updateConditionalFields(form));

  const downloadButton = form.querySelector("[data-action='download-pdf']");
  const modalClose = form.querySelector("[data-action='close-modal']");
  const modalDownload = form.querySelector("[data-action='modal-download']");
  const modalId = "brief-success-modal";

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
    const errors = validateForm(schema, form);
    renderErrors(form, errors);
    if (Object.keys(errors).length > 0) return;

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
