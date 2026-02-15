import { Button } from "../../core/components/button.js";
import { Modal } from "../../core/components/modal.js";
import { renderBriefSections, initBriefForm } from "../../shared/briefRenderer.js";
import { serviceSchemas } from "../../shared/briefSchemas.js";

const schema = serviceSchemas.support;

export async function render() {
  const sections = renderBriefSections(schema);

  return {
    title: "Техническая поддержка",
    content: `
      <section class="l-section">
        <div class="l-container">
          <div class="c-page-head">
            <h1 class="c-hero__title">Бриф: Техническая поддержка</h1>
            <p class="c-hero__subtitle">Расскажите, что нужно сделать, и мы возьмём в работу.</p>
          </div>
          <form id="brief-support">
            ${sections}
            <div class="c-form-actions">
              ${Button({ label: "Скачать PDF", type: "button", variant: "primary" }).replace(
                "<button",
                "<button data-action=\"download-pdf\""
              )}
              ${Button({ label: "Отправить", type: "submit", variant: "secondary" })}
            </div>
          </form>
          ${Modal({
            id: "brief-success-modal",
            title: "Заявка принята",
            body: "Мы получили ваш бриф. Можно скачать PDF ниже.",
            actions: `
              ${Button({ label: "Скачать PDF", type: "button", variant: "primary" }).replace(
                "<button",
                "<button data-action=\"modal-download\""
              )}
              ${Button({ label: "Закрыть", type: "button", variant: "secondary" }).replace(
                "<button",
                "<button data-action=\"close-modal\""
              )}
            `
          })}
        </div>
      </section>
    `
  };
}

export function afterRender() {
  initBriefForm({
    formId: "brief-support",
    schema,
    serviceType: "support",
    serviceLabel: schema.serviceLabel
  });
}
