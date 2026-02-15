export function AccordionSection({ id, title, content, open = false }) {
  return `
    <details class="c-accordion" ${open ? "open" : ""}>
      <summary class="c-accordion__summary" id="${id}">${title}</summary>
      <div class="c-accordion__content">
        ${content}
      </div>
    </details>
  `;
}

export function AccordionGroup(sections = []) {
  return sections.map((section) => AccordionSection(section)).join("");
}
