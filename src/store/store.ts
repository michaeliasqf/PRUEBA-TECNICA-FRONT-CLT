import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "@/features/favorites/favoritesSlice";
import productsReducer from "@/features/products/productsSlice";

// Creamos el store mediante una función para conservar una instancia por montaje del Provider.
export const makeStore = () =>
  configureStore({
    // Cada clave define una sección del estado global: state.products y state.favorites.
    reducer: {
      products: productsReducer,
      favorites: favoritesReducer,
    },
  });

// Estos tipos se derivan del store y se actualizan si agregamos otro reducer.
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
