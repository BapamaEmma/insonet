import { useEffect, useState } from "react";
import { api } from "../../api/client";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getContent().then((content) => setTestimonials(content.testimonials ?? []));
  }, []);

  const update = (index, field, value) => {
    setTestimonials((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const add = () => {
    setTestimonials((prev) => [
      ...prev,
      { id: `t-${Date.now()}`, quote: "", name: "", role: "" },
    ]);
  };

  const remove = (index) => {
    setTestimonials((prev) => prev.filter((_, i) => i !== index));
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await api.saveTestimonials(testimonials);
      setMessage("Testimonials saved.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin-header">
        <h2>Testimonials</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" className="admin-btn admin-btn-secondary" onClick={add}>Add testimonial</button>
          <button type="button" className="admin-btn admin-btn-primary" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {message ? <div className="admin-alert admin-alert-success">{message}</div> : null}
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}

      <div className="admin-grid">
        {testimonials.map((item, index) => (
          <div key={item.id ?? index} className="admin-card">
            <div className="admin-field">
              <label className="admin-label">Quote</label>
              <textarea className="admin-textarea" value={item.quote} onChange={(e) => update(index, "quote", e.target.value)} />
            </div>
            <div className="admin-grid admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Name</label>
                <input className="admin-input" value={item.name} onChange={(e) => update(index, "name", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Role</label>
                <input className="admin-input" value={item.role} onChange={(e) => update(index, "role", e.target.value)} />
              </div>
            </div>
            <button type="button" className="admin-btn admin-btn-danger" onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
}
