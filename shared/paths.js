function trimTrailingSlash(value) {
  return value.length > 1 ? value.replace(/\/+$/, "") : value;
}

export function getBasePath() {
  const value = typeof window !== "undefined" ? window.__APP_BASE__ || "" : "";
  if (!value) return "";
  return trimTrailingSlash(value.startsWith("/") ? value : `/${value}`);
}

export function normalizeAppPath(pathname = "/") {
  if (!pathname) return "/";
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return trimTrailingSlash(normalized) || "/";
}

export function toHref(pathname) {
  const appPath = normalizeAppPath(pathname);
  return `${getBasePath()}${appPath}`;
}

export function fromLocationPath(pathname) {
  const locationPath = normalizeAppPath(pathname);
  const basePath = getBasePath();

  if (!basePath) return locationPath;
  if (locationPath === basePath) return "/";
  if (locationPath.startsWith(`${basePath}/`)) {
    const stripped = locationPath.slice(basePath.length);
    return normalizeAppPath(stripped);
  }
  return locationPath;
}

export function isInternalPath(href = "") {
  return !/^(https?:|mailto:|tel:|#)/i.test(href);
}
