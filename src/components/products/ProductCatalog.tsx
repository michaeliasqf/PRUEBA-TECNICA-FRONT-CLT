"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/products/ErrorState";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { fetchProducts } from "@/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function ProductCatalog() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    // La primera versión carga una sola página cuando se monta el catálogo.
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "idle" || status === "loading") {
    return (
      <section className="catalogSection" aria-labelledby="catalog-title">
        <div className="catalogToolbar">
          <div>
            <h1 id="catalog-title">Todos los productos</h1>
          </div>
        </div>
        <ProductGridSkeleton />
      </section>
    );
  }

  if (status === "failed") {
    let errorMessage = "No pudimos cargar los productos.";

    if (error) {
      errorMessage = error;
    }

    return (
      <section className="catalogSection" aria-labelledby="catalog-title">
        <div className="catalogToolbar">
          <div>
            <h1 id="catalog-title">Todos los productos</h1>
          </div>
        </div>
        <ErrorState
          message={errorMessage}
          onRetry={() => dispatch(fetchProducts())}
        />
      </section>
    );
  }

  return (
    <section className="catalogSection" aria-labelledby="catalog-title">
      <div className="catalogToolbar">
        <div>
          <h1 id="catalog-title">Todos los productos</h1>
          <span className="resultCount">{items.length} productos</span>
        </div>
      </div>

      <div className="productGrid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
