import { ArrowLeft, PackageCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FavoriteButton } from "@/components/products/FavoriteButton";
import type { Product } from "@/types/product";
import { formatCategory, formatPrice } from "@/utils/format";

export function ProductDetail({ product }: { product: Product }) {
  // La API entrega el precio final; calculamos el anterior solo para mostrar el descuento.
  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  let imageSource = product.thumbnail;
  let discountInformation: ReactNode = null;

  // Preferimos la primera imagen grande y dejamos thumbnail como respaldo.
  if (product.images.length > 0) {
    imageSource = product.images[0];
  }

  // El precio anterior y el porcentaje solo aparecen cuando existe descuento.
  if (product.discountPercentage > 0) {
    discountInformation = (
      <>
        <del>{formatPrice(originalPrice)}</del>
        <span>-{Math.round(product.discountPercentage)}%</span>
      </>
    );
  }

  return (
    <main className="detailShell">
      <Link className="backLink" href="/"><ArrowLeft size={18} /> Volver al catálogo</Link>
      <div className="productDetail">
        <section className="detailMedia">
          <Image
            src={imageSource}
            alt={product.title}
            fill
            // Es la imagen principal de la ruta, por eso se carga con prioridad.
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </section>
        <section className="detailContent">
          <span className="eyebrow">{formatCategory(product.category)}</span>
          <h1>{product.title}</h1>
          <div className="detailRating">
            <span><Star size={16} fill="currentColor" /> {product.rating.toFixed(1)}</span>
          </div>
          <div className="detailPrice">
            <strong>{formatPrice(product.price)}</strong>
            {discountInformation}
          </div>
          <p className="detailDescription">{product.description}</p>
          {/* El requisito permite agregar o quitar favoritos desde el detalle. */}
          <FavoriteButton product={product} />
          <div className="detailStock">
            <PackageCheck size={22} />
            <span>
              <strong>Stock disponible</strong>
              {product.stock} unidades
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
