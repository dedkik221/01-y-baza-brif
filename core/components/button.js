import { isInternalPath, toHref } from "../../shared/paths.js";

export function Button({ label, href, variant = "primary", size = "md", type = "button" }) {
  const className = `c-button c-button--${variant} c-button--${size}`;
  if (href) {
    const finalHref = isInternalPath(href) ? toHref(href) : href;
    return `<a class="${className}" href="${finalHref}" data-link>${label}</a>`;
  }
  return `<button class="${className}" type="${type}">${label}</button>`;
}
