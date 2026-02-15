export function Field({ label, inputId, hint, inputHtml }) {
  const hintHtml = hint ? `<div class="c-card__meta">${hint}</div>` : "";
  return `
    <label class="c-field__label" for="${inputId}">
      <span>${label}</span>
      ${inputHtml}
      ${hintHtml}
    </label>
  `;
}

export function Input({ id, type = "text", name, placeholder = "", value = "" }) {
  return `<input class="c-input" id="${id}" name="${name}" type="${type}" placeholder="${placeholder}" value="${value}" />`;
}

export function Select({ id, name, options = [] }) {
  const opts = options
    .map(({ label, value }) => `<option value="${value}">${label}</option>`)
    .join("");
  return `<select class="c-select" id="${id}" name="${name}">${opts}</select>`;
}

export function Textarea({ id, name, placeholder = "" }) {
  return `<textarea class="c-textarea" id="${id}" name="${name}" placeholder="${placeholder}"></textarea>`;
}

export function Checkbox({ id, name, label }) {
  return `
    <label class="c-field">
      <input id="${id}" name="${name}" type="checkbox" />
      <span>${label}</span>
    </label>
  `;
}
