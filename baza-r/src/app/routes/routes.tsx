import type { RouteObject } from "react-router";
import { Layout } from "../layout/Layout";
import { HomePage } from "../../pages/home/ui/HomePage";
import { NotFound } from "../../pages/not-found/ui/NotFound";
import { BlankLayout } from "../layout/BlankLayout";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      // { path: "/catalog/:slug", element: <CatalogPage /> },
    ],
  },
  {
    element: <BlankLayout />,
    children: [{ path: "/*", element: <NotFound /> }],
  },
];
