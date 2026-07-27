import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "@/types/product";
import { formatCategory, formatPrice } from "@/utils/format";

interface ProductCardProps {
  product: Product;
  eagerImage?: boolean;
}

export function ProductCard({ product, eagerImage = false }: ProductCardProps) {
  let discountBadge: ReactNode = null;
  let imageLoading: "eager" | "lazy" = "lazy";

  // Mostramos la etiqueta solamente cuando el descuento supera el 10 %.
  if (product.discountPercentage > 10) {
    discountBadge = (
      <span className="discountBadge">
        -{Math.round(product.discountPercentage)}%
      </span>
    );
  }

  if (eagerImage) {
    // Las primeras tarjetas son visibles al abrir la página y conviene cargarlas antes.
    imageLoading = "eager";
  }

  return (
    <article className="productCard">
      <div className="cardMedia">
        {/* La imagen y el título llevan a la ruta dinámica del producto. */}
        <Link href={`/products/${product.id}`} aria-label={`Ver ${product.title}`}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            loading={imageLoading}
            // Ayuda a Next.js a servir un tamaño apropiado según el ancho de pantalla.
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>
        {discountBadge}
      </div>
      <div className="cardBody">
        <span className="eyebrow">{formatCategory(product.category)}</span>
        <Link href={`/products/${product.id}`}><h3>{product.title}</h3></Link>
        <div className="priceRow">
          <strong>{formatPrice(product.price)}</strong>
          <span>★ {product.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
