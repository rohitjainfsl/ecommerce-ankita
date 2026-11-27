import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import instance from "../axios";

// Renders child routes only if /auth/me confirms a logged-in user
// (and, when `role` is given, that the user has that role).
function ProtectedRoute({ role }) {
  const [status, setStatus] = useState("loading"); // loading | ok | denied | forbidden
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    instance
      .get("/auth/me")
      .then((res) => {
        if (cancelled) return;
        setStatus(role && res.data.user.role !== role ? "forbidden" : "ok");
      })
      .catch(() => !cancelled && setStatus("denied"));
    return () => {
      cancelled = true;
    };
  }, [role]);

  if (status === "loading") return <h3>Loading...</h3>;
  if (status === "denied")
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (status === "forbidden") return <Navigate to="/" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
