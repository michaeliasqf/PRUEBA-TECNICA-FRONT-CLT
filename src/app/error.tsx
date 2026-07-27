"use client";

import { useEffect } from "react";

// Next.js renderiza este límite cuando ocurre un error no controlado en una ruta.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  // Dejamos el error técnico en consola y mostramos un mensaje simple al usuario.
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="pageShell notFound">
      <span>Ups</span>
      <h1>No pudimos mostrar esta página</h1>
      <p>Ocurrió un error inesperado. Intentá nuevamente.</p>
      {/* reset solicita a Next.js volver a renderizar la ruta que falló. */}
      <button className="primaryButton" type="button" onClick={reset}>Reintentar</button>
    </main>
  );
}
