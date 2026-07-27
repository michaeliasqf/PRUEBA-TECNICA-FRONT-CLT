"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { hydrateFavorites } from "@/features/favorites/favoritesSlice";
import { loadFavorites, saveFavorites } from "@/services/storage";
import { makeStore, type AppStore } from "@/store/store";

export function StoreProvider({ children }: { children: ReactNode }) {
  // useState conserva la misma instancia de Redux entre renderizados.
  const [store] = useState<AppStore>(makeStore);

  useEffect(() => {
    // Al montar en el navegador, recuperamos los favoritos persistidos y los llevamos a Redux.
    store.dispatch(hydrateFavorites(loadFavorites()));

    // subscribe escucha los cambios para mantener localStorage actualizado.
    // La función que devuelve subscribe también sirve para cancelar la suscripción al desmontar.
    return store.subscribe(() => {
      const favorites = store.getState().favorites;
      // Evitamos guardar el estado inicial vacío antes de haber leído localStorage.
      if (favorites.hydrated) saveFavorites(favorites.entities);
    });
  }, [store]);

  // Los componentes hijos ya pueden acceder al store con los hooks tipados.
  return <Provider store={store}>{children}</Provider>;
}
