import { Navbar, type Route } from "./Navbar";
import { Searchbar } from "./Searchbar";

const routes: Route[] = [
  { name: "Accueil", path: "/" },
  { name: "Visualisation", path: "/visualisation" },
  { name: "Prédictions", path: "/predictions" },
  { name: "Athletes", path: "/athletes" },  // Ajoutez cette ligne

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
