import { Button } from "../../core/components/button.js";
import { getKnowledgeArticle } from "../../shared/api.js";
import { formatDate } from "../../shared/helpers.js";
import { renderKnowledgeArticle } from "../../shared/knowledgeRenderer.js";

export async function render({ params }) {
  const article = await getKnowledgeArticle(params.slug);

  if (!article) {
    return {
      title: "Инструкция",
      content: `
        <section class="l-section">
          <div class="l-container">
            <div class="c-page-head">
              <h1 class="c-hero__title">Инструкция не найдена</h1>
              <p class="c-hero__subtitle">Проверьте ссылку или вернитесь в каталог.</p>
            </div>
            ${Button({ label: "Назад в базу знаний", href: "/knowledge", variant: "secondary" })}
          </div>
        </section>
      `
    };
  }

  const { tocHtml, contentHtml } = renderKnowledgeArticle(article);

  return {
    title: article.title,
    content: `
      <section class="l-section">
        <div class="l-container">
          <div class="c-page-head__meta">
            ${article.category ? `<span class="c-badge">${article.category}</span>` : ""}
            ${article.updated_at ? `<span>Обновлено: ${formatDate(article.updated_at)}</span>` : ""}
          </div>

          <div class="k-layout">
            ${tocHtml}
            ${contentHtml}
          </div>

          <div class="k-back-row">
            ${Button({ label: "Назад в базу знаний", href: "/knowledge", variant: "secondary" })}
          </div>
        </div>
      </section>
    `
  };
}

export function afterRender() {
  const links = Array.from(document.querySelectorAll("[data-k-toc-link]"));
  const sections = Array.from(document.querySelectorAll("[data-k-section]"));

  if (!links.length || !sections.length) return;

  const map = new Map();
  links.forEach((link) => {
    const target = link.getAttribute("href")?.replace("#", "");
    if (target) map.set(target, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = id ? map.get(id) : null;
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
}
