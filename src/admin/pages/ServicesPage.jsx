import { useEffect, useState } from "react";
import { api } from "../../api/client";

const emptyService = () => ({
  id: `service-${Date.now()}`,
  title: "",
  description: "",
  image: "assets/images/services/serv1-wide.png",
  objectPosition: "50% 50%",
  cardTone: "bg-[#f2f4f8]",
  link: "/services/cctv",
});

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getContent().then((content) => {
      const list = content.services ?? [];
      setServices(list);
      if (list[0]) setSelectedId(list[0].id);
    });
  }, []);

  const selected = services.find((s) => s.id === selectedId) ?? services[0];

  const updateSelected = (field, value) => {
    setServices((prev) => prev.map((s) => (s.id === selected.id ? { ...s, [field]: value } : s)));
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await api.saveServices(services);
      setMessage("Services saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addService = () => {
    const service = emptyService();
    setServices((prev) => [...prev, service]);
    setSelectedId(service.id);
  };

  const removeService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(services[0]?.id);
  };

  if (!selected) {
    return (
      <div>
        <div className="admin-header">
          <h2>Services</h2>
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={addService}>
          Add first service
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="admin-header">
        <h2>Services</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="admin-btn admin-btn-secondary" onClick={addService}>
            Add service
          </button>
          <button type="button" className="admin-btn admin-btn-primary" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {message ? <div className="admin-alert admin-alert-success">{message}</div> : null}
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}

      <div className="admin-split">
        <div className="admin-list">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              className={`admin-list-item${selected.id === service.id ? " active" : ""}`}
              onClick={() => setSelectedId(service.id)}
            >
              {service.title || "Untitled service"}
            </button>
          ))}
        </div>

        <div className="admin-card admin-grid">
          <div className="admin-field">
            <label className="admin-label">Title</label>
            <input className="admin-input" value={selected.title} onChange={(e) => updateSelected("title", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Page link</label>
            <input className="admin-input" value={selected.link ?? ""} onChange={(e) => updateSelected("link", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Image URL</label>
            <input className="admin-input" value={selected.image ?? ""} onChange={(e) => updateSelected("image", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Object position</label>
            <input className="admin-input" value={selected.objectPosition ?? "50% 50%"} onChange={(e) => updateSelected("objectPosition", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Card tone (Tailwind class)</label>
            <input className="admin-input" value={selected.cardTone ?? ""} onChange={(e) => updateSelected("cardTone", e.target.value)} />
          </div>
          <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-label">Description</label>
            <textarea className="admin-textarea" value={selected.description ?? ""} onChange={(e) => updateSelected("description", e.target.value)} />
          </div>
          <button type="button" className="admin-btn admin-btn-danger" onClick={() => removeService(selected.id)}>
            Delete service
          </button>
        </div>
      </div>
    </>
  );
}
