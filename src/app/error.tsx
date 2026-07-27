"use client";

import { useEffect } from "react";

// Este límite captura errores de render no controlados por el estado de Redux.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="pageShell errorPage">
      <span>Ups</span>
      <h1>No pudimos mostrar esta página</h1>
      <p>Ocurrió un error inesperado. Intentá nuevamente.</p>
      <button className="primaryButton" type="button" onClick={reset}>
        Reintentar
      </button>
    </main>
  );
}
