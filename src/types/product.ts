// Propiedades de DummyJSON que realmente usamos en la interfaz.
// Este contrato compartido evita repetir tipos en Redux, servicios y componentes.
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

// Forma de la respuesta paginada de /products y /products/search.
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Datos que la interfaz entrega al servicio para construir una consulta.
export interface ProductsQuery {
  page: number;
  limit: number;
  search: string;
}
