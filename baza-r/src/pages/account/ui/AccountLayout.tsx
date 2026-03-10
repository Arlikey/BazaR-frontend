import { Outlet, Navigate } from "react-router";
import { AccountSidebar } from "./AccountSidebar";
import { useMe } from "../../../entities/user/queries";

export function AccountLayout() {
  const { data: user, isLoading } = useMe();

  if (isLoading) return null;
  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="flex flex-1 gap-11 pb-40">
      <AccountSidebar />
      <main className="min-w-0 flex-1 ">
        <Outlet />
      </main>
    </div>
  );
}
