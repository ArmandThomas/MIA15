import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface Route {
  name: string;
  path: string;
}

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  routes: Route[];
}

export function Navbar({ routes, className, ...props }: MainNavProps) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            cn(
              "text-sm font-medium transition-colors hover:text-primary",
              !isActive && "text-muted-foreground",
            )
          }
        >
          {route.name}
        </NavLink>
      ))}
    </nav>
  );
}
