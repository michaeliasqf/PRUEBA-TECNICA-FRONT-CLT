import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/ProductDetail";
import { getProduct } from "@/services/products.service";

interface ProductPageProps {
  // En Next.js 16 los parámetros dinámicos se reciben de forma asíncrona.
  params: Promise<{ id: string }>;
}

// Genera título y descripción propios para cada producto.
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProduct(Number(id));
    return { title: product.title, description: product.description };
  } catch {
    return { title: "Producto" };
  }
}

// Página dinámica: /products/1, /products/2, etc.
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  // Rechazamos textos, decimales, cero y números negativos antes de consultar la API.
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();
  let product;
  try {
    product = await getProduct(numericId);
  } catch {
    // Una respuesta fallida para este ID se presenta como producto no encontrado.
    notFound();
  }
  return <ProductDetail product={product} />;
}
