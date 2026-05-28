import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { setToken } from "../api/client";
import "./admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h1>INSONET Admin</h1>
        <p>Website content manager</p>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/projects" className={linkClass}>
            Projects
          </NavLink>
          <NavLink to="/admin/testimonials" className={linkClass}>
            Testimonials
          </NavLink>
          <NavLink to="/admin/services" className={linkClass}>
            Services
          </NavLink>
          <NavLink to="/admin/media" className={linkClass}>
            Media Library
          </NavLink>
          <NavLink to="/admin/settings" className={linkClass}>
            Site Settings
          </NavLink>
          <NavLink to="/admin/contact" className={linkClass}>
            Contact Inbox
          </NavLink>
          <a href="/" target="_blank" rel="noreferrer">
            View Website
          </a>
        </nav>
        <button type="button" className="admin-btn admin-btn-secondary" style={{ marginTop: 24, width: "100%" }} onClick={logout}>
          Sign out
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
