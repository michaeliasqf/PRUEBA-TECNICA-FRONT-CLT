"use client";

import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useAppSelector } from "@/store/hooks";

export function Header() {
  // La ruta actual permite marcar visualmente el enlace activo.
  const pathname = usePathname();
  // Como los favoritos están indexados por ID, contamos las claves del objeto.
  const favoriteCount = useAppSelector(
    (state) => Object.keys(state.favorites.entities).length,
  );

  let productsLinkClass = "";
  let favoritesLinkClass = "";
  let favoritesBadge: ReactNode = null;

  // El detalle de cualquier producto también pertenece a la sección Productos.
  if (pathname === "/" || pathname.startsWith("/products/")) {
    productsLinkClass = "active";
  }

  if (pathname === "/favorites") {
    favoritesLinkClass = "active";
  }

  // Evitamos mostrar una insignia con cero.
  if (favoriteCount > 0) {
    favoritesBadge = (
      <span className="navBadge" aria-label={`${favoriteCount} favoritos`}>
        {favoriteCount}
      </span>
    );
  }

  return (
    <header className="siteHeader">
      <div className="headerInner">
        <Link className="siteTitle" href="/">
          Productos CLT
        </Link>
        <nav className="mainNav" aria-label="Navegación principal">
          <Link className={productsLinkClass} href="/">
            <ShoppingBag size={18} aria-hidden />
            Productos
          </Link>
          <Link className={favoritesLinkClass} href="/favorites">
            <Heart size={18} aria-hidden />
            Favoritos
            {favoritesBadge}
          </Link>
        </nav>
      </div>
    </header>
  );
}
