import { Navbar, type Route } from "./Navbar";
import { Searchbar } from "./Searchbar";

const routes: Route[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          {/* logo */}
          <Navbar className="mx-6" routes={routes} />
          <div className="ml-auto flex items-center space-x-4">
            <Searchbar />
          </div>
        </div>
      </div>
    </div>
  );
}
