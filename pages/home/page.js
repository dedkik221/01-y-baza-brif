import { Button } from "../../core/components/button.js";

export async function render() {
  const serviceButtons = [
    Button({ label: "Прямая трансляция", href: "/service/live" }),
    Button({ label: "Видеосъёмка", href: "/service/video", variant: "secondary" }),
    Button({ label: "Техническая поддержка", href: "/service/support", variant: "secondary" })
  ].join("");

  return {
    title: "Главная",
    content: `
      <section class="l-section">
        <div class="l-container c-hero">
          <div class="c-zone">
            <h1 class="c-hero__title">Оформить услугу</h1>
            <p class="c-hero__subtitle">Выберите формат и заполните технический бриф</p>
            <div class="c-grid c-grid--3">${serviceButtons}</div>
          </div>
        </div>
      </section>
      <section class="l-section l-section--tight">
        <div class="l-container">
          <div class="c-zone c-zone--knowledge">
            <h2 class="c-hero__title">База знаний</h2>
            <p class="c-hero__subtitle">Инструкции и технические регламенты</p>
            ${Button({ label: "Перейти в базу знаний", href: "/knowledge" })}
          </div>
        </div>
      </section>
    `
  };
}
