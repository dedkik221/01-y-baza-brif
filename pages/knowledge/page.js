import { Card } from "../../core/components/card.js";
import { getKnowledgeList } from "../../shared/api.js";
import { formatDate } from "../../shared/helpers.js";

export async function render() {
  const list = await getKnowledgeList();

  const cards = list
    .map((item) => {
      const card = Card({
        title: item.title,
        href: `/knowledge/${item.slug}`,
        badge: item.category,
        meta: item.updated_at ? `Обновлено: ${formatDate(item.updated_at)}` : ""
      });

      return card;
    })
    .join("");

  return {
    title: "База знаний",
    content: `
      <section class="l-section">
        <div class="l-container">
          <div class="c-page-head">
            <h1 class="c-hero__title">База знаний</h1>
            <p class="c-hero__subtitle">Инструкции и технические регламенты</p>
          </div>
          <div class="c-grid c-grid--3">${cards}</div>
        </div>
      </section>
    `
  };
}
