export function Footer() {
  const year = new Date().getFullYear();
  return `
    <footer class="c-footer">
      <div class="l-container">
        <div>Media Team © ${year}</div>
        <div>Услуги и база знаний для медиапроектов</div>
      </div>
    </footer>
  `;
}
