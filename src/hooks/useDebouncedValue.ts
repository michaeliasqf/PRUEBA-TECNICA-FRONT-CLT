"use client";

import { useEffect, useState } from "react";

// Retrasa la actualización de un valor para no consultar la API por cada tecla.
// El genérico T mantiene el tipo recibido; en este proyecto el valor es un string.
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // El valor se confirma solo si pasa el tiempo indicado sin otro cambio.
    const timeout = window.setTimeout(() => setDebouncedValue(value), delay);
    // Si el usuario escribe antes de 300 ms, cancelamos el timeout anterior.
    return () => window.clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
