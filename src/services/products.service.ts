import { api } from "@/services/api";
import type { ProductsResponse } from "@/types/product";

// Primera versión del servicio: solicita únicamente los primeros 12 productos.
export async function getProducts(): Promise<ProductsResponse> {
  const { data } = await api.get<ProductsResponse>("/products", {
    params: {
      limit: 12,
      skip: 0,
    },
  });

  return data;
}
