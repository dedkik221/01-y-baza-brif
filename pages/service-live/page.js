import { Button } from "../../core/components/button.js";
import { Modal } from "../../core/components/modal.js";
import { renderBriefShell, initBriefForm } from "../../shared/briefRenderer.js";
import { serviceSchemas } from "../../shared/briefSchemas.js";

const schema = serviceSchemas.live;

export async function render() {
  const briefUi = renderBriefShell(schema, {
    guidanceTitle: "Что подготовить перед заполнением",
    guidanceItems: [
      "Контакты ответственных и финального согласующего.",
      "Базовый тайминг мероприятия и локации.",
      "Технические вводные: звук, экраны, интернет.",
      "Если параметр не нужен, ставьте 0 в числовых полях."
    ]
  });

  return {
    title: "Прямая трансляция",
    content: `
      <section class="l-section">
        <div class="l-container">
          <div class="c-page-head">
            <h1 class="c-hero__title">Бриф: Прямая трансляция</h1>
            <p class="c-hero__subtitle">Заполните секции, скачайте PDF или отправьте заявку.</p>
          </div>
          <div class="b-brief-layout">
            <form id="brief-live" class="b-brief-main">
              ${briefUi.progressHtml}
              ${briefUi.sectionsHtml}
              <div class="c-form-actions">
                ${Button({ label: "Скачать PDF", type: "button", variant: "primary" }).replace(
                  "<button",
                  "<button data-action=\"download-pdf\""
                )}
                ${Button({ label: "Отправить", type: "submit", variant: "secondary" })}
              </div>
            </form>
            <aside class="b-brief-side">
              ${briefUi.sidebarHtml}
            </aside>
          </div>
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
    formId: "brief-live",
    schema,
    serviceType: "live",
    serviceLabel: schema.serviceLabel
  });
}
