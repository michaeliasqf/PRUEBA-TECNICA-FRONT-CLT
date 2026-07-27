import { api } from "@/services/api";
import type { ProductsQuery, ProductsResponse } from "@/types/product";

// Obtiene una página del catálogo o de los resultados de búsqueda.
// La interfaz trabaja con páginas, mientras DummyJSON espera limit y skip.
export async function getProducts(
  { page, limit, search }: ProductsQuery,
): Promise<ProductsResponse> {
  // Página 1 salta 0 productos, página 2 salta 12, página 3 salta 24, etc.
  const skip = (page - 1) * limit;
  let endpoint = "/products";
  // q es opcional porque solo se envía cuando el usuario escribió una búsqueda.
  const params: { limit: number; skip: number; q?: string } = { limit, skip };

  if (search) {
    // DummyJSON utiliza este endpoint para buscar con el texto ingresado.
    endpoint = "/products/search";
    params.q = search;
  }

  const { data } = await api.get<ProductsResponse>(endpoint, {
    params,
  });

  return data;
}
