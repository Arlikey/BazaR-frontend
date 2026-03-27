import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../../shared/model/auth.store";

export function SellerGuard() {
  const isSeller = useAuthStore((s) => s.isSeller);

  if (!isSeller) {
    return <Navigate to="/account/profile" replace />;
  }

  return <Outlet />;
}
