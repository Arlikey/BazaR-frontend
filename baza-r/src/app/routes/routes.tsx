import { Navigate, type RouteObject } from "react-router";
import { Layout } from "../layout/Layout";
import { HomePage } from "../../pages/home/ui/HomePage";
import { NotFound } from "../../pages/not-found/ui/NotFound";
import { BlankLayout } from "../layout/BlankLayout";
import ProductPage from "../../pages/product/ui/ProductPage";
import { AccountLayout } from "../../pages/account/ui/AccountLayout";
import { AccountProfilePage } from "../../pages/account/ui/AccountProfilePage";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product/:productId", element: <ProductPage /> },
      // { path: "/catalog/:slug", element: <CatalogPage /> },
      {
        path: "/account",
        element: <AccountLayout />,
        children: [
          { index: true, element: <Navigate to="/account/profile" replace /> },
          { path: "profile", element: <AccountProfilePage /> },
          { path: "orders", element: <AccountProfilePage /> },
          { path: "wishlist", element: <AccountProfilePage /> },
          { path: "viewed", element: <AccountProfilePage /> },
          { path: "newsletters", element: <AccountProfilePage /> },
          { path: "wallet", element: <AccountProfilePage /> },
          { path: "bonus", element: <AccountProfilePage /> },
          { path: "premium", element: <AccountProfilePage /> },
          { path: "reviews", element: <AccountProfilePage /> },
          { path: "messages", element: <AccountProfilePage /> },
          { path: "promotions", element: <AccountProfilePage /> },
        ],
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [{ path: "/*", element: <NotFound /> }],
  },
];
