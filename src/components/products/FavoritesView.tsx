"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import { ProductCard } from "@/components/products/ProductCard";
import { useIsClient } from "@/hooks/useIsClient";
import { useAppSelector } from "@/store/hooks";
import type { ReactNode } from "react";

export function FavoritesView() {
  const isClient = useIsClient();
  // Redux contiene los productos por ID y avisa cuándo terminó de leer localStorage.
  const { entities, hydrated } = useAppSelector((state) => state.favorites);
  // Para renderizar tarjetas convertimos el objeto indexado en un array.
  const products = Object.values(entities);
  let content: ReactNode;

  if (!isClient || !hydrated) {
    // El servidor y el primer render del navegador muestran el mismo placeholder.
    content = <div className="favoritesPlaceholder" aria-label="Cargando favoritos" />;
  } else if (products.length === 0) {
    content = <EmptyState type="favorites" />;
  } else {
    let countText = `${products.length} productos guardados`;

    if (products.length === 1) {
      countText = "1 producto guardado";
    }

    content = (
      <>
        <p className="favoritesCount">{countText}</p>
        <div className="productGrid">
          {/* ProductCard se reutiliza sin permitir editar favoritos desde la tarjeta. */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    );
  }

  return (
    <main className="pageShell">
      <header className="pageHeading">
        <h1>Favoritos</h1>
        <p>Productos guardados para consultar más tarde.</p>
      </header>
      {content}
    </main>
  );
}
