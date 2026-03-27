import { Outlet, Navigate } from "react-router";
import { AccountSidebar } from "./AccountSidebar";
import { useMe } from "../../../entities/user/queries";
import { useAuthStore } from "../../../shared/model/auth.store";

export function AccountLayout() {
  return (
    <div className="flex flex-1 gap-11 pt-8 pb-40">
      <AccountSidebar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
