import { fromLocationPath, isInternalPath, normalizeAppPath, toHref } from "./paths.js";

const routes = [
  { path: "/", module: () => import("../pages/home/page.js") },
  { path: "/service/live", module: () => import("../pages/service-live/page.js") },
  { path: "/service/video", module: () => import("../pages/service-video/page.js") },
  { path: "/service/support", module: () => import("../pages/service-support/page.js") },
  { path: "/knowledge", module: () => import("../pages/knowledge/page.js") },
  { path: "/knowledge/:slug", module: () => import("../pages/knowledge-article/page.js") }
];

let routeHandler = null;

function matchRoute(pathname) {
  const pathSegments = pathname.split("/").filter(Boolean);

  for (const route of routes) {
    const routeSegments = route.path.split("/").filter(Boolean);
    if (routeSegments.length !== pathSegments.length) continue;

    const params = {};
    let match = true;

    for (let i = 0; i < routeSegments.length; i += 1) {
      const segment = routeSegments[i];
      const current = pathSegments[i];
      if (segment.startsWith(":")) {
        params[segment.slice(1)] = current;
      } else if (segment !== current) {
        match = false;
        break;
      }
    }

    if (match) {
      return { route, params };
    }
  }

  return { route: routes[0], params: {} };
}

async function resolveRoute(pathname) {
  if (!routeHandler) return;
  const appPath = normalizeAppPath(pathname);
  const { route, params } = matchRoute(appPath);
  const module = await route.module();
  routeHandler({ module, params, path: appPath });
}

function onLinkClick(event) {
  const link = event.target.closest("a");
  if (!link) return;
  const href = link.getAttribute("href");

  if (!href || !isInternalPath(href)) {
    return;
  }

  if (!link.dataset.link) return;
  event.preventDefault();
  const url = new URL(link.href, window.location.origin);
  navigate(fromLocationPath(url.pathname));
}

export function initRouter({ onRoute }) {
  routeHandler = onRoute;
  window.addEventListener("popstate", () => resolveRoute(fromLocationPath(window.location.pathname)));
  document.addEventListener("click", onLinkClick);
  resolveRoute(fromLocationPath(window.location.pathname));
}

export function navigate(pathname) {
  const appPath = normalizeAppPath(pathname);
  window.history.pushState({}, "", toHref(appPath));
  resolveRoute(appPath);
}
