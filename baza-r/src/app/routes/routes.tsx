import type { RouteObject } from "react-router";
import { Layout } from "../layout/Layout";
import { HomePage } from "../../pages/home/ui/HomePage";
import { NotFound } from "../../pages/not-found/ui/NotFound";
import { BlankLayout } from "../layout/BlankLayout";
import ProductPage from "../../pages/product/ui/ProductPage";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product/:productId", element: <ProductPage /> },
      // { path: "/catalog/:slug", element: <CatalogPage /> },
    ],
  },
  {
    element: <BlankLayout />,
    children: [{ path: "/*", element: <NotFound /> }],
  },
];
