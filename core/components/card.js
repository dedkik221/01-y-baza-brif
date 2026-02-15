import { isInternalPath, toHref } from "../../shared/paths.js";

export function Card({ title, body = "", href, badge, meta }) {
  const badgeHtml = badge ? `<span class="c-badge">${badge}</span>` : "";
  const metaHtml = meta ? `<div class="c-card__meta">${meta}</div>` : "";
  const content = `
    <div class="c-card">
      ${badgeHtml}
      <h3 class="c-card__title">${title}</h3>
      <div>${body}</div>
      ${metaHtml}
    </div>
  `;

  if (href) {
    const finalHref = isInternalPath(href) ? toHref(href) : href;
    return `<a href="${finalHref}" data-link>${content}</a>`;
  }
  return content;
}
