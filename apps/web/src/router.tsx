import { Navigate, createBrowserRouter } from "react-router-dom";

import Home from "./pages";
import { commonRoutes } from "./routes/common";
import { RootLayout } from "./components/layouts/RootLayout";

export function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        ...commonRoutes,
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}
