# Design Rules

Визуальное направление
- Чистая техническая эстетика с тёплой базой.
- Две зоны на главной: светлая зона услуг + контрастная зона базы знаний.

Цветовые токены (theme.css)
- --c-bg: #F6F2EB (теплый фон)
- --c-surface: #FFFFFF
- --c-surface-alt: #EEF1F6
- --c-ink: #1C1C1C
- --c-ink-muted: #5B6470
- --c-accent: #0F766E (основной акцент)
- --c-accent-strong: #115E59
- --c-accent-contrast: #FFFFFF
- --c-warn: #D97706
- --c-border: #D9DEE6
- --c-knowledge-bg: #0F172A
- --c-knowledge-ink: #E2E8F0

Типографика
- Заголовки: "Space Grotesk", 600-700
- Текст: "IBM Plex Sans", 400-500
- Масштаб:
  - h1: 40/44
  - h2: 28/34
  - h3: 22/28
  - body: 16/24
  - small: 13/18

Сетка и размеры
- Контейнер: max-width 1200px, боковой padding 24px
- Колонки: 12
- Гаттер: 24px
- Радиусы: 10px (cards), 8px (inputs/buttons)
- Тени: мягкие, 2 уровня

Компоненты
- Button:
  - primary: фон --c-accent, текст --c-accent-contrast
  - secondary: прозрачный фон, обводка --c-border
  - ghost: без обводки, текст --c-accent
- Card:
  - фон --c-surface, border --c-border
  - hover: лёгкое поднятие
- Input/Select/Textarea:
  - фон --c-surface
  - border --c-border
  - focus: outline 2px --c-accent
- Accordion:
  - заголовок жирный, контент скрыт
  - анимация открытия 150-200ms
- Badge:
  - фон --c-surface-alt, текст --c-ink-muted

Адаптив
- 1200+ desktop
- 768-1199 tablet
- <768 mobile

Доступность
- Контраст текста не ниже WCAG AA
- Фокус видимый у всех интерактивных элементов

Запреты
- Никаких магических цветов вне theme.css
- Никаких локальных шрифтов вне токенов
