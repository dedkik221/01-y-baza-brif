import { initRouter } from "./shared/router.js";
import { renderLayout } from "./core/layout.js";

const root = document.getElementById("app");

initRouter({
  onRoute: async ({ module, params, path }) => {
    try {
      if (!module.render) {
        root.innerHTML = renderLayout({
          title: "Ошибка",
          content: "<div class=\"l-container l-section\">Страница не найдена</div>"
        });
        return;
      }

      const page = await module.render({ params, path });
      root.innerHTML = renderLayout(page);

      if (typeof module.afterRender === "function") {
        module.afterRender({ params, path });
      }
    } catch (error) {
      console.error("Route render failed:", error);
      root.innerHTML = renderLayout({
        title: "Ошибка",
        content:
          "<div class=\"l-container l-section\"><h1>Ошибка рендера</h1><p>Проверьте консоль для деталей.</p></div>"
      });
    }
  }
});
