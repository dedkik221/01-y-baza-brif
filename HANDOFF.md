# Handoff: Media Team (Vanilla SPA)

## Стек
- Vanilla HTML/CSS/JS (ES modules), без фреймворков.
- SPA router (`/shared/router.js`) с поддержкой GitHub Pages base path.

## Ключевые папки
- `core/` — дизайн-система, layout, UI-компоненты.
- `shared/` — роутер, схемы брифов, рендерер форм, mock API/data, PDF.
- `pages/` — страницы `/`, `/service/*`, `/knowledge`, `/knowledge/{slug}`.
- `backups/` + `scripts/rollback-*.sh` — быстрый откат редизайнов.

## Что уже реализовано
- Главная страница с переходами в 3 брифа и базу знаний.
- Три страницы брифов (live/video/support) с аккордеонами, валидацией, UX-улучшениями и прогрессом.
- База знаний: каталог + стилизованные страницы инструкций.
- В каталоге отключены поиск/фильтр/сортировка.
- В каталоге добавлены 2 реальные инструкции:
  - `techtalk-live-reglament`
  - `video-editing`
- Роутинг и ссылки адаптированы для GitHub Pages.

## Файлы, важные для GitHub Pages
- `index.html` — автоопределение base path.
- `404.html` — SPA fallback для прямых заходов на вложенные роуты.
- `shared/paths.js` — нормализация base path и внутренних ссылок.

## Локальный запуск
- `npx serve -s . -l 4173`
- Открыть `http://localhost:4173`

## Откат
- Knowledge-редизайн:
  - `bash scripts/rollback-knowledge-redesign.sh`
- Brief-редизайн:
  - `bash scripts/rollback-brief-redesign.sh`
