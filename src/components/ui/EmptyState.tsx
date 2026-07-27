import { Heart, SearchX } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  type: "search" | "favorites";
}

export function EmptyState({ type }: EmptyStateProps) {
  // Reutilizamos el componente para búsqueda vacía y favoritos vacíos.
  if (type === "search") {
    return (
      <div className="emptyState">
        <span className="emptyIcon">
          <SearchX size={32} aria-hidden />
        </span>
        <h2>No encontramos coincidencias</h2>
        <p>Probá con otro término o revisá la ortografía.</p>
      </div>
    );
  }

  // En favoritos agregamos un enlace para volver al catálogo.
  return (
    <div className="emptyState">
      <span className="emptyIcon">
        <Heart size={32} aria-hidden />
      </span>
      <h2>Todavía no guardaste favoritos</h2>
      <p>Guardá los productos que te interesan para encontrarlos fácilmente.</p>
      <Link className="primaryButton" href="/">Explorar productos</Link>
    </div>
  );
}
