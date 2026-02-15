import { escapeHtml } from "./helpers.js";

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-zа-я0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractSections(contentHtml) {
  const headingRegex = /<h2>(.*?)<\/h2>/gi;
  const matches = [...contentHtml.matchAll(headingRegex)];

  if (matches.length === 0) {
    return [
      {
        id: "content",
        title: "Содержание",
        body: contentHtml
      }
    ];
  }

  const sections = [];
  matches.forEach((match, index) => {
    const title = match[1].replace(/<[^>]+>/g, "").trim();
    const bodyStart = match.index + match[0].length;
    const bodyEnd = index + 1 < matches.length ? matches[index + 1].index : contentHtml.length;
    const body = contentHtml.slice(bodyStart, bodyEnd).trim();

    sections.push({
      id: slugify(`${title}-${index + 1}`),
      title,
      body
    });
  });

  return sections;
}

function renderFacts(facts = []) {
  if (!facts.length) return "";
  return `
    <section class="k-facts">
      ${facts
        .map(
          (fact) => `
            <article class="k-fact">
              <div class="k-fact__label">${escapeHtml(fact.label)}</div>
              <div class="k-fact__value">${escapeHtml(fact.value)}</div>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function renderCallouts(callouts = []) {
  if (!callouts.length) return "";

  return `
    <section class="k-callouts">
      ${callouts
        .map(
          (callout) => `
            <article class="k-callout k-callout--${callout.type || "info"}">
              <h3>${escapeHtml(callout.title)}</h3>
              <p>${escapeHtml(callout.text)}</p>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function renderTimeline(timeline = []) {
  if (!timeline.length) return "";

  return `
    <section class="k-timeline-wrap">
      <h3 class="k-subtitle">Ключевой тайминг</h3>
      <ol class="k-timeline">
        ${timeline
          .map(
            (item) => `
              <li class="k-timeline__item">
                <span class="k-timeline__time">${escapeHtml(item.time)}</span>
                <span class="k-timeline__text">${escapeHtml(item.text)}</span>
              </li>
            `
          )
          .join("")}
      </ol>
    </section>
  `;
}

function renderChecklist(checklist = []) {
  if (!checklist.length) return "";

  return `
    <section class="k-checklist-wrap">
      <h3 class="k-subtitle">Чеклист</h3>
      <ul class="k-checklist">
        ${checklist
          .map(
            (item) => `
              <li class="k-checklist__item">
                <span class="k-checklist__mark">✓</span>
                <span>${escapeHtml(item)}</span>
              </li>
            `
          )
          .join("")}
      </ul>
    </section>
  `;
}

export function renderKnowledgeArticle(article) {
  const sections = extractSections(article.content || "");

  const tocHtml = `
    <aside class="k-toc" aria-label="Содержание статьи">
      <h2 class="k-toc__title">Содержание</h2>
      <nav>
        <ul class="k-toc__list">
          ${sections
            .map(
              (section) =>
                `<li><a href="#${section.id}" data-k-toc-link>${escapeHtml(section.title)}</a></li>`
            )
            .join("")}
        </ul>
      </nav>
    </aside>
  `;

  const contentHtml = `
    <article class="k-main">
      <header class="k-hero-card">
        <h1 class="c-hero__title">${escapeHtml(article.title)}</h1>
        ${article.summary ? `<p class="k-hero-card__summary">${escapeHtml(article.summary)}</p>` : ""}
      </header>

      ${renderFacts(article.quickFacts)}
      ${renderCallouts(article.callouts)}
      <div class="k-top-widgets">
        ${renderTimeline(article.timeline)}
        ${renderChecklist(article.checklist)}
      </div>

      <div class="k-sections">
        ${sections
          .map(
            (section) => `
              <section id="${section.id}" class="k-section-card" data-k-section>
                <h2 class="k-section-card__title">${escapeHtml(section.title)}</h2>
                <div class="c-prose">${section.body}</div>
              </section>
            `
          )
          .join("")}
      </div>
    </article>
  `;

  return { tocHtml, contentHtml };
}
