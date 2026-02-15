export function Modal({ id, title, body, actions = "" }) {
  return `
    <div class="c-modal" id="${id}">
      <div class="c-modal__panel" role="dialog" aria-modal="true" aria-labelledby="${id}-title">
        <h3 id="${id}-title" class="c-card__title">${title}</h3>
        <div>${body}</div>
        <div class="c-grid" style="margin-top: 16px;">
          ${actions}
        </div>
      </div>
    </div>
  `;
}
