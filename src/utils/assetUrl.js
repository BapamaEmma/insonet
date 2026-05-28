export function assetUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }
  return path;
}

export function phoneHref(phone) {
  if (!phone) return "";
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone) {
  if (!phone) return "";
  const digits = phone.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/Admininso",
  instagram: "https://www.instagram.com/insonetgh/",
  whatsapp: "https://wa.me/233262842077",
};
