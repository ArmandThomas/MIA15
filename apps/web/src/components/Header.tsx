import { Navbar, type Route } from "./Navbar";
import { Searchbar } from "./Searchbar";

const routes: Route[] = [
  { name: "Accueil", path: "/" },
  { name: "Athletes", path: "/athletes" },  // Ajoutez cette ligne
  {name: "Classement", path: "/classement"},
  { name: "Prédictions", path: "/predictions" },
];

export function Header() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          {/* logo */}
          <Navbar className="mx-6" routes={routes} />
        </div>
      </div>
    </div>
  );
}
