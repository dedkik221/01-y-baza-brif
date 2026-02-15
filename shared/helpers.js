export function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium" }).format(date);
}

export function isNumeric(value) {
  return value !== "" && !Number.isNaN(Number(value));
}

export function validateEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

export function validatePhone(value) {
  return /^[+\d\s()-]{7,}$/.test(value);
}
