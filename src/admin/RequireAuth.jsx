import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, setToken } from "../api/client";

function RequireAuth() {
  const [status, setStatus] = useState("loading");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("insonet_admin_token");
    if (!token) {
      setStatus("denied");
      return;
    }
    api.me()
      .then(() => setStatus("ok"))
      .catch(() => {
        setToken(null);
        setStatus("denied");
      });
  }, []);

  if (status === "loading") {
    return <div style={{ padding: 40 }}>Checking session...</div>;
  }

  if (status === "denied") {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export { RequireAuth };
