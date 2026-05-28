import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ projects: 0, testimonials: 0, services: 0, submissions: 0, media: 0 });

  useEffect(() => {
    Promise.all([api.getContent(), api.getMedia().catch(() => ({ files: [] }))]).then(([content, media]) => {
      setStats({
        projects: content.projects?.length ?? 0,
        testimonials: content.testimonials?.length ?? 0,
        services: content.services?.length ?? 0,
        submissions: content.contactSubmissions?.length ?? 0,
        media: media.files?.length ?? 0,
      });
    });
  }, []);

  return (
    <>
      <div className="admin-header">
        <h2>Dashboard</h2>
      </div>
      <div className="admin-grid admin-grid-2">
        <div className="admin-stat"><strong>{stats.projects}</strong> Projects</div>
        <div className="admin-stat"><strong>{stats.testimonials}</strong> Testimonials</div>
        <div className="admin-stat"><strong>{stats.services}</strong> Services</div>
        <div className="admin-stat"><strong>{stats.media}</strong> Uploaded images</div>
        <div className="admin-stat"><strong>{stats.submissions}</strong> Contact messages</div>
      </div>
      <div className="admin-card" style={{ marginTop: 24 }}>
        <h3 style={{ marginTop: 0 }}>Quick actions</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <Link to="/admin/projects" className="admin-btn admin-btn-primary">Manage projects</Link>
          <Link to="/admin/services" className="admin-btn admin-btn-secondary">Edit services</Link>
          <Link to="/admin/media" className="admin-btn admin-btn-secondary">Upload images</Link>
          <Link to="/admin/settings" className="admin-btn admin-btn-secondary">Edit site settings</Link>
        </div>
      </div>
    </>
  );
}
