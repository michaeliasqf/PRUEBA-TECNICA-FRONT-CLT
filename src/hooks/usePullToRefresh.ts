"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Distancia mínima para confirmar el gesto de actualización.
const THRESHOLD = 72;

// Detecta el arrastre táctil hacia abajo cuando la página está en el inicio.
export function usePullToRefresh(onRefresh: () => Promise<void>) {
  // La posición inicial no necesita provocar un render, por eso usamos useRef.
  const startY = useRef(0);
  const [distance, setDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);

    try {
      await onRefresh();
    } finally {
      // Restauramos la interfaz aunque la petición termine con un error.
      setRefreshing(false);
      setDistance(0);
    }
  }, [onRefresh, refreshing]);

  useEffect(() => {
    const onTouchStart = (event: TouchEvent) => {
      // El gesto solo debe comenzar cuando no existe scroll vertical previo.
      if (window.scrollY === 0) startY.current = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (window.scrollY !== 0 || !startY.current) return;
      const pulled = Math.max(0, event.touches[0].clientY - startY.current);
      // La resistencia evita que el indicador se mueva exactamente junto con el dedo.
      setDistance(Math.min(pulled * 0.5, 100));
    };

    const onTouchEnd = () => {
      if (distance >= THRESHOLD) void refresh();
      else setDistance(0);
      startY.current = 0;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Evitamos acumular listeners cuando el efecto se vuelve a ejecutar.
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [distance, refresh]);

  return { distance, refreshing };
}
