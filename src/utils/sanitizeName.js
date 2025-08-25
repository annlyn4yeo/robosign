export function sanitizeName(raw) {
  if (typeof raw !== "string") return "";
  const cleaned = raw.replace(/[^a-z]/gi, "");
  return cleaned.toUpperCase();
}
