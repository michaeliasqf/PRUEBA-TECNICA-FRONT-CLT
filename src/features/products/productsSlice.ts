import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "@/services/products.service";
import type { Product } from "@/types/product";

// Estos estados permiten que la interfaz distinga carga, éxito y error.
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface ProductsState {
  items: Product[];
  status: RequestStatus;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

// El thunk conecta Redux con el servicio que utiliza Axios.
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch {
      return rejectWithValue("No pudimos cargar los productos. Verificá tu conexión.");
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.products;
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

export default productsSlice.reducer;
