"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Distancia mínima que debe alcanzar el gesto para confirmar la actualización.
const THRESHOLD = 72;

// Detecta el gesto táctil de arrastrar hacia abajo cuando la página está en el inicio.
export function usePullToRefresh(onRefresh: () => Promise<void>) {
  // startY es un dato interno que no necesita provocar un render.
  const startY = useRef(0);
  const [distance, setDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    // Evita iniciar dos actualizaciones al mismo tiempo.
    if (refreshing) return;
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      // El indicador vuelve a su estado inicial incluso cuando la petición falla.
      setRefreshing(false);
      setDistance(0);
    }
  }, [onRefresh, refreshing]);

  useEffect(() => {
    const onTouchStart = (event: TouchEvent) => {
      // Solo iniciamos el gesto cuando el usuario está arriba del todo.
      if (window.scrollY === 0) startY.current = event.touches[0].clientY;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (window.scrollY !== 0 || !startY.current) return;
      const pulled = Math.max(0, event.touches[0].clientY - startY.current);
      // Aplicamos resistencia visual y limitamos el desplazamiento a 100 px.
      setDistance(Math.min(pulled * 0.5, 100));
    };
    const onTouchEnd = () => {
      // Al soltar, actualizamos solamente si el gesto alcanzó el umbral.
      if (distance >= THRESHOLD) void refresh();
      else setDistance(0);
      startY.current = 0;
    };
    // passive mejora el desplazamiento porque estos handlers no usan preventDefault.
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    // Quitamos los listeners para no acumular eventos al repetir el efecto.
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [distance, refresh]);

  // ProductCatalog decide cómo representar visualmente estos valores.
  return { distance, refreshing };
}
