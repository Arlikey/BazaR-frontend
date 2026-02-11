import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "../routes/routes";

const router = createBrowserRouter(routes);

export const RoutesProvider = () => {
  return <RouterProvider router={router} />;
};
