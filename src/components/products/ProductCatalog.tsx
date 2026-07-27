"use client";

import { ArrowDown, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ErrorState } from "@/components/products/ErrorState";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchInput } from "@/components/ui/SearchInput";
import { fetchProducts, PAGE_SIZE, setSearch } from "@/features/products/productsSlice";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function ProductCatalog() {
  const dispatch = useAppDispatch();
  const { items, status, error, page, hasMore, total, search } = useAppSelector(
    (state) => state.products,
  );

  // query cambia con cada tecla; search cambia en Redux después del debounce.
  const [query, setQuery] = useState(search);
  // El requisito pide esperar 300 ms para evitar una solicitud por cada tecla.
  const debouncedQuery = useDebouncedValue(query.trim(), 300);
  // Esta referencia apunta al área final que observa IntersectionObserver.
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Una búsqueda confirmada reinicia Redux y solicita la primera página.
    dispatch(setSearch(debouncedQuery));
    dispatch(
      fetchProducts({
        page: 1,
        limit: PAGE_SIZE,
        search: debouncedQuery,
      }),
    );
  }, [debouncedQuery, dispatch]);

  // Pull to refresh vuelve a pedir la primera página de la búsqueda activa.
  const handleRefresh = useCallback(async () => {
    dispatch(setSearch(debouncedQuery));
    await dispatch(
      fetchProducts({
        page: 1,
        limit: PAGE_SIZE,
        search: debouncedQuery,
      }),
    ).unwrap();
  }, [debouncedQuery, dispatch]);

  const { distance, refreshing } = usePullToRefresh(handleRefresh);

  // Solicita la página siguiente sin eliminar las tarjetas que ya se muestran.
  const loadMore = useCallback(() => {
    if (status === "loading") {
      return;
    }

    if (!hasMore) {
      return;
    }

    dispatch(
      fetchProducts({
        page: page + 1,
        limit: PAGE_SIZE,
        search,
      }),
    );
  }, [dispatch, hasMore, page, search, status]);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target) {
      return;
    }

    // Observamos el final del listado para implementar el scroll infinito.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      // La siguiente página comienza a cargar antes de llegar al final visible.
      { rootMargin: "240px" },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [loadMore]);

  // La carga inicial utiliza skeleton; las siguientes conservan los productos visibles.
  const initialLoading = status === "loading" && items.length === 0;

  let pullIndicatorClass = "pullIndicator";
  let pullIconClass = "";
  let pullText = "Deslizá para actualizar";
  let catalogTitle = "Todos los productos";
  let resultCount: ReactNode = null;
  let catalogContent: ReactNode = null;
  let loadMoreContent: ReactNode = null;

  if (distance > 0 || refreshing) {
    pullIndicatorClass = "pullIndicator visible";
  }

  if (refreshing) {
    pullIconClass = "spin";
    pullText = "Actualizando...";
  } else if (distance >= 72) {
    pullText = "Soltá para actualizar";
  }

  if (search) {
    catalogTitle = `Resultados para "${search}"`;
  }

  if (!initialLoading) {
    resultCount = <span className="resultCount">{total} productos</span>;
  }

  if (initialLoading) {
    catalogContent = <ProductGridSkeleton />;
  } else if (status === "failed" && items.length === 0) {
    let errorMessage = "No pudimos cargar los productos.";

    if (error) {
      errorMessage = error;
    }

    catalogContent = (
      <ErrorState
        message={errorMessage}
        onRetry={() => {
          dispatch(
            fetchProducts({
              page: 1,
              limit: PAGE_SIZE,
              search,
            }),
          );
        }}
      />
    );
  } else if (items.length === 0) {
    catalogContent = <EmptyState />;
  } else {
    catalogContent = (
      <div className="productGrid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  if (status === "loading" && items.length > 0) {
    loadMoreContent = (
      <span className="loadingMore">
        <RefreshCw size={18} className="spin" />
        Cargando más
      </span>
    );
  } else if (status === "failed" && items.length > 0) {
    // Un error adicional no elimina los productos cargados previamente.
    loadMoreContent = (
      <button className="secondaryButton" type="button" onClick={loadMore}>
        Reintentar carga
      </button>
    );
  } else if (hasMore && items.length > 0) {
    // El botón queda como alternativa accesible al scroll automático.
    loadMoreContent = (
      <button className="textButton" type="button" onClick={loadMore}>
        Cargar más
        <ArrowDown size={17} />
      </button>
    );
  } else if (items.length > 0) {
    loadMoreContent = <span className="endMessage">No hay más productos</span>;
  }

  return (
    <>
      <div
        className={pullIndicatorClass}
        style={{ transform: `translateY(${Math.max(0, distance - 48)}px)` }}
        aria-live="polite"
      >
        <RefreshCw size={18} className={pullIconClass} />
        {pullText}
      </div>

      <section className="catalogSection" aria-labelledby="catalog-title">
        <div className="catalogToolbar">
          <div>
            <h1 id="catalog-title">{catalogTitle}</h1>
            {resultCount}
          </div>
          <SearchInput value={query} onChange={setQuery} />
        </div>

        {catalogContent}

        {/* IntersectionObserver vigila esta zona para cargar la página siguiente. */}
        <div className="loadMoreArea" ref={loadMoreRef}>
          {loadMoreContent}
        </div>
      </section>
    </>
  );
}
