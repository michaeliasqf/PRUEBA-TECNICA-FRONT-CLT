import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";

// Next.js muestra este fallback mientras una navegación de la ruta está pendiente.
export default function Loading() {
  return <main className="pageShell"><ProductGridSkeleton /></main>;
}
