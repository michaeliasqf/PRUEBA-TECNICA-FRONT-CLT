import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "@/services/products.service";
import type { Product, ProductsQuery } from "@/types/product";

// Estos estados permiten que la interfaz distinga carga, éxito y error.
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface ProductsState {
  items: Product[];
  status: RequestStatus;
  error: string | null;
  page: number;
  hasMore: boolean;
  total: number;
  search: string;
}

// Cantidad fija de productos que se solicita en cada página.
export const PAGE_SIZE = 12;

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  page: 1,
  hasMore: true,
  total: 0,
  search: "",
};

// El thunk conecta Redux con el servicio Axios y recibe búsqueda y paginación.
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (query: ProductsQuery, { rejectWithValue }) => {
    try {
      return await getProducts(query);
    } catch {
      return rejectWithValue("No pudimos cargar los productos. Verificá tu conexión.");
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Una búsqueda nueva comienza desde la primera página y elimina los resultados anteriores.
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
      state.hasMore = true;
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { products, total, skip, limit } = action.payload;

        if (skip === 0) {
          // Primera página o búsqueda nueva: reemplazamos el listado.
          state.items = products;
        } else {
          // Scroll infinito: agregamos la página nueva al final de las anteriores.
          state.items = [...state.items, ...products];
        }

        state.total = total;
        state.page = Math.floor(skip / limit) + 1;
        state.hasMore = state.items.length < total;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";

        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Ocurrió un error inesperado.";
        }
      });
  },
});

export const { setSearch } = productsSlice.actions;
export default productsSlice.reducer;
