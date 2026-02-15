import { Button } from "../../core/components/button.js";
import { getKnowledgeArticle } from "../../shared/api.js";
import { formatDate } from "../../shared/helpers.js";

export async function render({ params }) {
  const article = await getKnowledgeArticle(params.slug);
  const meta = article
    ? `
        <div class="c-page-head__meta">
          ${article.category ? `<span class="c-badge">${article.category}</span>` : ""}
          ${article.updated_at ? `<span>Обновлено: ${formatDate(article.updated_at)}</span>` : ""}
        </div>
      `
    : "";
  const content = article
    ? `
        <div class="c-page-head">
          <h1 class="c-hero__title">${article.title}</h1>
          ${meta}
        </div>
        <div class="c-prose">${article.content}</div>
      `
    : `
        <div class="c-page-head">
          <h1 class="c-hero__title">Инструкция не найдена</h1>
          <p class="c-hero__subtitle">Проверьте ссылку или вернитесь в каталог.</p>
        </div>
      `;

  return {
    title: article ? article.title : "Инструкция",
    content: `
      <section class="l-section">
        <div class="l-container">
          ${content}
          <div style="margin-top: 24px;">
            ${Button({ label: "Назад в базу знаний", href: "/knowledge", variant: "secondary" })}
          </div>
        </div>
      </section>
    `
  };
}
