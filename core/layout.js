import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { APP_NAME } from "../shared/config.js";

export function renderLayout({ title = "", content = "" } = {}) {
  document.title = title ? `${title} — ${APP_NAME}` : APP_NAME;

  return `
    ${Header()}
    <main class="l-main">
      ${content}
    </main>
    ${Footer()}
  `;
}
