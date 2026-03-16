import { Routes, Route, Navigate } from "react-router";
import { AdminLayout } from "./layouts/AdminLayout";
import { CategoriesPage } from "./pages/CategoriesPage";
import { LoginPage } from "./pages/LoginPage";
import { getRole, tokenStorage } from "./api/token.storage";
import { AttributesPage } from "./pages/AttributesPage";
import { CategoryFormPage } from "./pages/CategoryFormPage";
import { CategoryAttributesPage } from "./pages/CategoryAttributesPage";
import { AttributeOptionsPage } from "./pages/AttributeOptionsPage";
import { AttributeFormPage } from "./pages/AttributeFormPage";

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!tokenStorage.getAccess()) return <Navigate to="/login" replace />;
  if (getRole() !== "Admin") return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/categories" replace />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/new" element={<CategoryFormPage />} />
        <Route path="categories/:id/edit" element={<CategoryFormPage />} />
        <Route
          path="categories/:id/attributes"
          element={<CategoryAttributesPage />}
        />
        <Route path="attributes" element={<AttributesPage />} />
        <Route path="attributes/new" element={<AttributeFormPage />} />
        <Route
          path="attributes/:id/options"
          element={<AttributeOptionsPage />}
        />
      </Route>
    </Routes>
  );
}
