import Image from "next/image";
import type { ReactNode } from "react";
import type { Product } from "@/types/product";
import { formatCategory, formatPrice } from "@/utils/format";

export function ProductCard({ product }: { product: Product }) {
  let discountBadge: ReactNode = null;

  if (product.discountPercentage > 10) {
    discountBadge = (
      <span className="discountBadge">
        -{Math.round(product.discountPercentage)}%
      </span>
    );
  }

  return (
    <article className="productCard">
      <div className="cardMedia">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {discountBadge}
      </div>
      <div className="cardBody">
        <span className="eyebrow">{formatCategory(product.category)}</span>
        <h3>{product.title}</h3>
        <div className="priceRow">
          <strong>{formatPrice(product.price)}</strong>
          <span>★ {product.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
