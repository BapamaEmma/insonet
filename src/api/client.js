const API_BASE = import.meta.env.VITE_API_URL || "/api";

function getToken() {
  return localStorage.getItem("insonet_admin_token");
}

export function setToken(token) {
  if (token) localStorage.setItem("insonet_admin_token", token);
  else localStorage.removeItem("insonet_admin_token");
}

async function request(path, options = {}) {
  const headers = { ...options.headers };
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${response.status})`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  me: () => request("/auth/me"),

  getContent: () => request("/content"),

  saveProjects: (payload) =>
    request("/content/projects", { method: "PUT", body: JSON.stringify(payload) }),

  saveTestimonials: (testimonials) =>
    request("/content/testimonials", { method: "PUT", body: JSON.stringify({ testimonials }) }),

  saveServices: (services) =>
    request("/content/services", { method: "PUT", body: JSON.stringify({ services }) }),

  saveSettings: (settings) =>
    request("/content/settings", { method: "PUT", body: JSON.stringify({ settings }) }),

  getMedia: () => request("/media"),

  uploadMedia: (file) => {
    const form = new FormData();
    form.append("file", file);
    return request("/media/upload", { method: "POST", body: form });
  },

  deleteMedia: (filename) => request(`/media/${filename}`, { method: "DELETE" }),

  submitContact: (payload) =>
    request("/contact", { method: "POST", body: JSON.stringify(payload) }),
};
