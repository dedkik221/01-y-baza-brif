# Архитектура проекта

Стек (по умолчанию): Vanilla HTML/CSS/JS (ES Modules) + History API router (SPA).
Если потребуется, добавим backend (Node/Express) в отдельной директории без изменения фронтенд-архитектуры.

Ключевые принципы
- Единая дизайн-система и общий UI только через /core.
- Общая логика, API, форматирование и валидации только через /shared.
- Страницы не содержат глобальных стилей. Допустимы только локальные классы, использующие токены из /core/theme.css.
- Нет копипаста компонентов между страницами.

Структура проекта
- /core
  - /components
  - layout.js
  - theme.css
  - styles.css
- /shared
  - api.js
  - config.js
  - helpers.js
  - router.js
- /pages
  - /home
  - /service-live
  - /service-video
  - /service-support
  - /knowledge
  - /knowledge-article
- app.js
- index.html
- README.md

Маршруты
- / — Главная
- /service/live — Бриф: Прямая трансляция
- /service/video — Бриф: Видеосъёмка
- /service/support — Бриф: Техническая поддержка
- /knowledge — Каталог базы знаний
- /knowledge/:slug — Страница инструкции

Ответственности слоёв
- /core/components: Button, Header, Footer, Card, Accordion, Form Controls, Modal.
- /core/theme.css: токены (цвета, шрифты, размеры, отступы).
- /core/styles.css: базовые стили, layout-классы и утилиты.
- /shared/api.js: единая точка запросов и моков.
- /shared/helpers.js: форматирование, валидации, сериализация форм.
- /shared/router.js: клиентский роутер и навигация.
- /pages/*: сборка страниц из компонентов и логики.

Именование и соглашения
- Папки: kebab-case (service-live, knowledge-article).
- Компоненты и модули: camelCase файлы (button.js, formControls.js).
- CSS классы:
  - c- для компонентов (c-button)
  - l- для layout (l-container)
  - u- для утилит (u-hidden)
  - is- для состояний (is-open)

Данные и интеграции (план)
- Формы брифов отправляют данные через shared/api.js.
- PDF-генерация и отправка email будут через backend (последующим шагом).
- База знаний берётся из API (пока мок в shared/api.js), позже из CMS/БД.

Дефолтный выбор стека
- Пока фиксируем Vanilla HTML/CSS/JS. Если нужно React (Vite), сообщите, и перестроим скелет.
