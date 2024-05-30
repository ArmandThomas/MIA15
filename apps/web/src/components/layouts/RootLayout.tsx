import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <main className="flex-1">
      <Outlet />
    </main>
  );
}
