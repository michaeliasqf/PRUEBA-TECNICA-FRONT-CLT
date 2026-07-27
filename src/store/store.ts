import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/features/products/productsSlice";

// En esta etapa el estado global contiene únicamente la sección de productos.
export const makeStore = () =>
  configureStore({
    reducer: {
      products: productsReducer,
    },
  });

// Derivamos los tipos para que se actualicen junto con la configuración del store.
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
