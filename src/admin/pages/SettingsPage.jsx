import { useEffect, useState } from "react";
import { api } from "../../api/client";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getContent().then((content) => setSettings(content.settings ?? {}));
  }, []);

  if (!settings) return <p>Loading settings...</p>;

  const update = (path, value) => {
    setSettings((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let cursor = next;
      keys.slice(0, -1).forEach((key) => {
        cursor[key] = { ...cursor[key] };
        cursor = cursor[key];
      });
      cursor[keys.at(-1)] = value;
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await api.saveSettings(settings);
      setMessage("Settings saved.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin-header">
        <h2>Site Settings</h2>
        <button type="button" className="admin-btn admin-btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      {message ? <div className="admin-alert admin-alert-success">{message}</div> : null}
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}

      <div className="admin-card admin-grid">
        <h3>Contact details</h3>
        <div className="admin-grid admin-grid-2">
          <div className="admin-field"><label className="admin-label">Site name</label><input className="admin-input" value={settings.siteName ?? ""} onChange={(e) => update("siteName", e.target.value)} /></div>
          <div className="admin-field"><label className="admin-label">Email</label><input className="admin-input" value={settings.email ?? ""} onChange={(e) => update("email", e.target.value)} /></div>
          <div className="admin-field"><label className="admin-label">Phone</label><input className="admin-input" value={settings.phone ?? ""} onChange={(e) => update("phone", e.target.value)} /></div>
          <div className="admin-field"><label className="admin-label">Address</label><input className="admin-input" value={settings.address ?? ""} onChange={(e) => update("address", e.target.value)} /></div>
        </div>

        <h3>Hero section</h3>
        <div className="admin-grid admin-grid-2">
          <div className="admin-field"><label className="admin-label">Typing animation text</label><input className="admin-input" value={settings.hero?.typingText ?? ""} onChange={(e) => update("hero.typingText", e.target.value)} /></div>
          <div className="admin-field"><label className="admin-label">Highlighted portion</label><input className="admin-input" value={settings.hero?.highlightedText ?? ""} onChange={(e) => update("hero.highlightedText", e.target.value)} /></div>
          <div className="admin-field"><label className="admin-label">Headline line 1</label><input className="admin-input" value={settings.hero?.headlineLine1 ?? ""} onChange={(e) => update("hero.headlineLine1", e.target.value)} /></div>
          <div className="admin-field"><label className="admin-label">Headline line 2</label><input className="admin-input" value={settings.hero?.headlineLine2 ?? ""} onChange={(e) => update("hero.headlineLine2", e.target.value)} /></div>
          <div className="admin-field" style={{ gridColumn: "1 / -1" }}><label className="admin-label">Subtext</label><textarea className="admin-textarea" value={settings.hero?.subtext ?? ""} onChange={(e) => update("hero.subtext", e.target.value)} /></div>
          <div className="admin-field"><label className="admin-label">Hero image URL</label><input className="admin-input" value={settings.hero?.image ?? ""} onChange={(e) => update("hero.image", e.target.value)} /></div>
        </div>

        <h3>About section</h3>
        <div className="admin-grid admin-grid-2">
          <div className="admin-field"><label className="admin-label">About image URL</label><input className="admin-input" value={settings.about?.image ?? ""} onChange={(e) => update("about.image", e.target.value)} /></div>
          <div className="admin-field"><label className="admin-label">Years stat</label><input className="admin-input" value={settings.about?.yearsStat ?? ""} onChange={(e) => update("about.yearsStat", e.target.value)} /></div>
          <div className="admin-field"><label className="admin-label">Years label</label><input className="admin-input" value={settings.about?.yearsLabel ?? ""} onChange={(e) => update("about.yearsLabel", e.target.value)} /></div>
          <div className="admin-field"><label className="admin-label">Heading</label><input className="admin-input" value={settings.about?.heading ?? ""} onChange={(e) => update("about.heading", e.target.value)} /></div>
          <div className="admin-field" style={{ gridColumn: "1 / -1" }}><label className="admin-label">About body</label><textarea className="admin-textarea" value={settings.about?.body ?? ""} onChange={(e) => update("about.body", e.target.value)} /></div>
        </div>

        <h3>Footer</h3>
        <div className="admin-field"><label className="admin-label">Footer tagline</label><textarea className="admin-textarea" value={settings.footer?.tagline ?? ""} onChange={(e) => update("footer.tagline", e.target.value)} /></div>
      </div>
    </>
  );
}
