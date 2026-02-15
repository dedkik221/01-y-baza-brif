import { toHref } from "../../shared/paths.js";

export function Header() {
  const homeHref = toHref("/");
  const knowledgeHref = toHref("/knowledge");

  return `
    <header class="c-header">
      <div class="l-container c-header__inner">
        <a class="c-logo" href="${homeHref}" data-link>Media Team</a>
        <nav class="c-nav">
          <a href="${homeHref}" data-link>Услуги</a>
          <a href="${knowledgeHref}" data-link>База знаний</a>
        </nav>
      </div>
    </header>
  `;
}
