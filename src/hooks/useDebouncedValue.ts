"use client";

import { useEffect, useState } from "react";

// Retrasa la actualización para no consultar la API por cada tecla.
// El genérico T conserva el tipo del valor recibido; aquí se utiliza con string.
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Solo confirmamos el valor si transcurre el tiempo indicado sin otro cambio.
    const timeout = window.setTimeout(() => setDebouncedValue(value), delay);
    // Una nueva tecla cancela el temporizador anterior y comienza otra espera.
    return () => window.clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
