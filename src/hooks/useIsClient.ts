"use client";

import { useSyncExternalStore } from "react";

// No existe un estado externo que escuchar, por eso la suscripción no hace nada.
const subscribe = () => () => {};

// Durante el primer render del servidor devolvemos false y en el navegador devolvemos true.
// React usa esa diferencia después de hidratar, evitando que el HTML inicial sea distinto.
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
