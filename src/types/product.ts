// Propiedades de DummyJSON que realmente usamos en esta primera versión del catálogo.
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
}

// Forma de la respuesta paginada que devuelve el endpoint /products.
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
