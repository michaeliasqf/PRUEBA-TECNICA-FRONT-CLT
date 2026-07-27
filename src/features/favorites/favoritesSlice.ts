import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

// Guardamos los productos por ID para comprobar, agregar o eliminar sin duplicados.
interface FavoritesState {
  entities: Record<number, Product>;
  // Distingue "todavía no leí localStorage" de "el usuario no tiene favoritos".
  hydrated: boolean;
}

const initialState: FavoritesState = { entities: {}, hydrated: false };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // La misma acción agrega el producto si no existe o lo elimina si ya era favorito.
    toggleFavorite(state, action: PayloadAction<Product>) {
      const product = action.payload;
      if (state.entities[product.id]) delete state.entities[product.id];
      else state.entities[product.id] = product;
    },
    // Lleva a Redux los favoritos recuperados de localStorage al iniciar la aplicación.
    hydrateFavorites(state, action: PayloadAction<Record<number, Product>>) {
      state.entities = action.payload;
      state.hydrated = true;
    },
  },
});

// Estas acciones se consumen en FavoriteButton y StoreProvider.
export const { toggleFavorite, hydrateFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
