import { useEffect, useState } from "react";
import { api } from "../../api/client";

export default function AdminMediaPage() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = () => {
    api.getMedia().then((data) => setFiles(data.files ?? [])).catch((err) => setError(err.message));
  };

  useEffect(() => {
    load();
  }, []);

  const onUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const result = await api.uploadMedia(file);
      setMessage(`Uploaded: ${result.file.url}`);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const onDelete = async (filename) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await api.deleteMedia(filename);
      setMessage("Image deleted.");
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setMessage(`Copied URL: ${url}`);
  };

  return (
    <>
      <div className="admin-header">
        <h2>Media Library</h2>
        <label className="admin-btn admin-btn-primary" style={{ cursor: "pointer" }}>
          {uploading ? "Uploading..." : "Upload image"}
          <input type="file" accept="image/*" hidden onChange={onUpload} disabled={uploading} />
        </label>
      </div>

      {message ? <div className="admin-alert admin-alert-success">{message}</div> : null}
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}

      <p style={{ color: "#64748b", marginBottom: 16 }}>
        Upload images here, then paste the URL (e.g. <code>/uploads/filename.jpg</code>) into projects or settings.
      </p>

      <div className="admin-media-grid">
        {files.map((file) => (
          <div key={file.filename} className="admin-media-item">
            <img src={file.url} alt={file.filename} />
            <div className="admin-media-meta">
              <div>{file.filename}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => copyUrl(file.url)}>Copy URL</button>
                <button type="button" className="admin-btn admin-btn-danger" onClick={() => onDelete(file.filename)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
