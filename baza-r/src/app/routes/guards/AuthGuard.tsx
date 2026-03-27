import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../../shared/model/auth.store";

export function AuthGuard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
