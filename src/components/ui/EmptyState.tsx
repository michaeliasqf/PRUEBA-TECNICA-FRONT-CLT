import { SearchX } from "lucide-react";

// Estado utilizado cuando la búsqueda termina sin coincidencias.
export function EmptyState() {
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
