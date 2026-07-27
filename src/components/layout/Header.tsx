import { ShoppingBag } from "lucide-react";
import Link from "next/link";

// Encabezado inicial; la navegación de favoritos se agregará cuando exista esa funcionalidad.
export function Header() {
  return (
    <header className="siteHeader">
      <div className="headerInner">
        <Link className="siteTitle" href="/">
          Productos CLT
        </Link>
        <nav className="mainNav" aria-label="Navegación principal">
          <Link className="active" href="/">
            <ShoppingBag size={18} aria-hidden />
            Productos
          </Link>
        </nav>
      </div>
    </header>
  );
}
