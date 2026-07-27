import { ProductCatalog } from "@/components/products/ProductCatalog";

// La ruta principal delega la carga y presentación al catálogo.
export default function HomePage() {
  return (
    <main>
      <ProductCatalog />
    </main>
  );
}
