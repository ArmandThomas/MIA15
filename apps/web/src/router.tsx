import { Navigate, createBrowserRouter } from "react-router-dom";

import Home from "./pages";
import { commonRoutes } from "./routes/common";

export function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    ...commonRoutes,
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
