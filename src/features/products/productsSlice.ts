import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "@/services/products.service";
import type { Product, ProductsQuery } from "@/types/product";

// Estados posibles de una petición; la interfaz los usa para mostrar carga, éxito o error.
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

// Estado global de productos, búsqueda y paginación solicitado por el ejercicio.
interface ProductsState {
  items: Product[];
  status: RequestStatus;
  error: string | null;
  page: number;
  hasMore: boolean;
  total: number;
  search: string;
}

// Cantidad fija de productos solicitada en cada página.
export const PAGE_SIZE = 12;

// Antes de la primera petición no hay productos ni errores.
const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  page: 1,
  hasMore: true,
  total: 0,
  search: "",
};

// Conecta Redux con el servicio Axios.
// createAsyncThunk genera automáticamente las acciones pending, fulfilled y rejected.
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (query: ProductsQuery, { rejectWithValue }) => {
    try {
      return await getProducts(query);
    } catch {
      // Guardamos un mensaje entendible en vez del error técnico de Axios.
      return rejectWithValue("No pudimos cargar los productos. Verificá tu conexión.");
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Una búsqueda nueva debe comenzar desde la primera página y sin resultados anteriores.
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
      state.hasMore = true;
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Se ejecuta apenas comienza la petición.
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // Recibe la respuesta paginada cuando Axios finaliza correctamente.
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { products, total, skip, limit } = action.payload;

        if (skip === 0) {
          // Primera página o búsqueda nueva: reemplazamos el listado.
          state.items = products;
        } else {
          // Scroll infinito: agregamos la página nueva después de los productos existentes.
          state.items = [...state.items, ...products];
        }

        state.total = total;
        // Reconstruimos la página actual a partir de skip y limit.
        state.page = Math.floor(skip / limit) + 1;
        // Al alcanzar el total dejamos de solicitar páginas adicionales.
        state.hasMore = state.items.length < total;
        state.status = "succeeded";
      })
      // Si falla otra página, mantenemos los productos cargados y guardamos el error.
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";

        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          // Mensaje de respaldo si el rechazo no trae nuestro texto personalizado.
          state.error = "Ocurrió un error inesperado.";
        }
      });
  },
});

// setSearch se usa desde el catálogo; el reducer se registra en store.ts.
export const { setSearch } = productsSlice.actions;
export default productsSlice.reducer;
