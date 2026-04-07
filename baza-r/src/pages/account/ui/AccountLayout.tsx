import { Outlet } from "react-router";
import { AccountSidebar } from "./AccountSidebar";

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
