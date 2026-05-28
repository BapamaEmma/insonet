import { useEffect, useState } from "react";
import { api } from "../../api/client";

const emptyProject = () => ({
  id: `project-${Date.now()}`,
  title: "",
  category: "CCTV Surveillance",
  summary: "",
  description: "",
  client: "",
  location: "Accra, Ghana",
  duration: "",
  year: new Date().getFullYear().toString(),
  image: "/assets/images/projects/proj1.png",
  alt: "",
  objectPosition: "50% 50%",
  scope: [""],
  deliverables: [""],
  outcomes: [""],
  serviceLink: "/services/cctv",
});

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getContent().then((content) => {
      setProjects(content.projects ?? []);
      setCategories(content.projectCategories ?? []);
      if (content.projects?.[0]) setSelectedId(content.projects[0].id);
    });
  }, []);

  const selected = projects.find((p) => p.id === selectedId) ?? projects[0];

  const updateSelected = (field, value) => {
    setProjects((prev) => prev.map((p) => (p.id === selected.id ? { ...p, [field]: value } : p)));
  };

  const updateListField = (field, index, value) => {
    const list = [...(selected[field] ?? [])];
    list[index] = value;
    updateSelected(field, list);
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await api.saveProjects({ projects, projectCategories: categories });
      setMessage("Projects saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addProject = () => {
    const project = emptyProject();
    setProjects((prev) => [...prev, project]);
    setSelectedId(project.id);
  };

  const removeProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (selectedId === id) setSelectedId(projects[0]?.id);
  };

  if (!selected) {
    return (
      <div>
        <div className="admin-header"><h2>Projects</h2></div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={addProject}>Add first project</button>
      </div>
    );
  }

  return (
    <>
      <div className="admin-header">
        <h2>Projects</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" className="admin-btn admin-btn-secondary" onClick={addProject}>Add project</button>
          <button type="button" className="admin-btn admin-btn-primary" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {message ? <div className="admin-alert admin-alert-success">{message}</div> : null}
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16 }}>
        <div className="admin-card">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedId(project.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                marginBottom: 6,
                borderRadius: 10,
                border: selected.id === project.id ? "1px solid #1a56db" : "1px solid #e2e8f0",
                background: selected.id === project.id ? "#eff6ff" : "#fff",
                cursor: "pointer",
              }}
            >
              {project.title || "Untitled project"}
            </button>
          ))}
        </div>

        <div className="admin-card">
          <div className="admin-grid admin-grid-2">
            <div className="admin-field">
              <label className="admin-label">Title</label>
              <input className="admin-input" value={selected.title} onChange={(e) => updateSelected("title", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Category</label>
              <select className="admin-select" value={selected.category} onChange={(e) => updateSelected("category", e.target.value)}>
                {categories.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label className="admin-label">Image URL</label>
              <input className="admin-input" value={selected.image} onChange={(e) => updateSelected("image", e.target.value)} placeholder="/uploads/your-image.jpg" />
            </div>
            <div className="admin-field">
              <label className="admin-label">Service link</label>
              <input className="admin-input" value={selected.serviceLink} onChange={(e) => updateSelected("serviceLink", e.target.value)} />
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-label">Summary</label>
            <textarea className="admin-textarea" value={selected.summary} onChange={(e) => updateSelected("summary", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Full description</label>
            <textarea className="admin-textarea" style={{ minHeight: 140 }} value={selected.description} onChange={(e) => updateSelected("description", e.target.value)} />
          </div>

          <div className="admin-grid admin-grid-2">
            <div className="admin-field"><label className="admin-label">Client</label><input className="admin-input" value={selected.client} onChange={(e) => updateSelected("client", e.target.value)} /></div>
            <div className="admin-field"><label className="admin-label">Location</label><input className="admin-input" value={selected.location} onChange={(e) => updateSelected("location", e.target.value)} /></div>
            <div className="admin-field"><label className="admin-label">Duration</label><input className="admin-input" value={selected.duration} onChange={(e) => updateSelected("duration", e.target.value)} /></div>
            <div className="admin-field"><label className="admin-label">Year</label><input className="admin-input" value={selected.year} onChange={(e) => updateSelected("year", e.target.value)} /></div>
          </div>

          {["scope", "deliverables", "outcomes"].map((field) => (
            <div key={field} className="admin-field">
              <label className="admin-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              {(selected[field] ?? []).map((item, index) => (
                <input
                  key={`${field}-${index}`}
                  className="admin-input"
                  style={{ marginBottom: 8 }}
                  value={item}
                  onChange={(e) => updateListField(field, index, e.target.value)}
                />
              ))}
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => updateSelected(field, [...(selected[field] ?? []), ""])}>
                Add item
              </button>
            </div>
          ))}

          <button type="button" className="admin-btn admin-btn-danger" onClick={() => removeProject(selected.id)}>
            Delete project
          </button>
        </div>
      </div>
    </>
  );
}
