import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../../api/client";
import FadeInUp from "../../components/motion/FadeInUp";
import "../admin.css";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@insonetgh.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("insonet_admin_token");
    if (!token) return;
    api.me().then(() => navigate("/admin")).catch(() => setToken(null));
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token } = await api.login(email, password);
      setToken(token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <FadeInUp className="admin-login-card">
        <h2 style={{ marginTop: 0 }}>Admin Sign In</h2>
        <p style={{ color: "#64748b", marginBottom: 24 }}>
          Manage projects, testimonials, images, and site settings.
        </p>
        {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label className="admin-label" htmlFor="email">Email</label>
            <input id="email" className="admin-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="admin-field">
            <label className="admin-label" htmlFor="password">Password</label>
            <input id="password" className="admin-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 16 }}>
          Default dev login: admin@insonetgh.com / admin123
        </p>
      </FadeInUp>
    </div>
  );
}
