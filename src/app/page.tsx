import { ProductCatalog } from "@/components/products/ProductCatalog";

// Ruta principal: delega la lógica de listado y búsqueda al catálogo.
export default function HomePage() {
  return <main><ProductCatalog /></main>;
}
