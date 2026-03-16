import { NavLink, Outlet, useNavigate } from "react-router";
import { tokenStorage } from "../api/token.storage";
import { CustomNavLink } from "../shared/CustomNavLink";

export function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    tokenStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 text-black overflow-hidden">
      <aside className="w-60 bg-white shadow-md flex flex-col h-screen">
        <div className="p-6 text-xl font-bold border-b border-neutral-100 text-center">Baza-R Admin</div>
        <nav className="flex flex-col p-4 gap-1 flex-1">
          <CustomNavLink to="/categories">Категорії</CustomNavLink>
          <CustomNavLink to="/attributes">Атрибути</CustomNavLink>
        </nav>
        <div className="p-4 border-t border-neutral-100">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Вийти
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
}
