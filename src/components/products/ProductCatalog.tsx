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
  // Leemos en una sola selección todo el estado de productos administrado por Redux.
  const { items, status, error, page, hasMore, total, search } = useAppSelector(
    (state) => state.products,
  );
  // query cambia con cada tecla; search cambia en Redux después del debounce.
  const [query, setQuery] = useState(search);
  // El requisito pide esperar 300 ms antes de buscar para evitar una petición por tecla.
  const debouncedQuery = useDebouncedValue(query.trim(), 300);
  // Esta referencia apunta al área final que observa IntersectionObserver.
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cada búsqueda confirmada reinicia Redux y solicita nuevamente la primera página.
    dispatch(setSearch(debouncedQuery));
    dispatch(
      fetchProducts({
        page: 1,
        limit: PAGE_SIZE,
        search: debouncedQuery,
      }),
    );
  }, [debouncedQuery, dispatch]);

  // Pull to refresh vuelve a solicitar la primera página de la búsqueda activa.
  const handleRefresh = useCallback(async () => {
    dispatch(setSearch(debouncedQuery));
    await dispatch(
      fetchProducts({
        page: 1,
        limit: PAGE_SIZE,
        search: debouncedQuery,
      }),
      // unwrap permite que el hook espere el éxito o reciba el rechazo del thunk.
    ).unwrap();
  }, [debouncedQuery, dispatch]);

  const { distance, refreshing } = usePullToRefresh(handleRefresh);

  // Solicita la página siguiente sin borrar los productos que ya se muestran.
  const loadMore = useCallback(() => {
    // Evita peticiones duplicadas mientras una página sigue cargando.
    if (status === "loading") {
      return;
    }

    // Cuando Redux determina que alcanzamos el total, no pedimos más páginas.
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

    // Observamos un elemento al final de la lista para implementar scroll infinito.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      // Carga 240 px antes de llegar al final para reducir la espera visible.
      { rootMargin: "240px" },
    );

    observer.observe(target);

    // Desconectamos el observer al desmontar o cuando cambia loadMore.
    return () => {
      observer.disconnect();
    };
  }, [loadMore]);

  // La primera carga usa un skeleton completo; las páginas siguientes conservan las tarjetas.
  const initialLoading = status === "loading" && items.length === 0;

  // Estas variables permiten resolver los estados con if explícitos y mantener limpio el JSX final.
  let pullIndicatorClass = "pullIndicator";
  let pullIconClass = "";
  let pullText = "Deslizá para actualizar";
  let catalogTitle = "Todos los productos";
  let resultCount: ReactNode = null;
  let catalogContent: ReactNode = null;
  let loadMoreContent: ReactNode = null;

  // Muestra el indicador mientras el usuario arrastra o la actualización está ejecutándose.
  if (distance > 0 || refreshing) {
    pullIndicatorClass = "pullIndicator visible";
  }

  if (refreshing) {
    pullIconClass = "spin";
    pullText = "Actualizando...";
  } else if (distance >= 72) {
    // El texto cambia al alcanzar el mismo umbral definido en usePullToRefresh.
    pullText = "Soltá para actualizar";
  }

  if (search) {
    catalogTitle = `Resultados para "${search}"`;
  }

  if (!initialLoading) {
    resultCount = <span className="resultCount">{total} productos</span>;
  }

  // Estado 1: carga inicial.
  if (initialLoading) {
    catalogContent = <ProductGridSkeleton />;
  // Estado 2: error inicial, todavía sin productos para mostrar.
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
  // Estado 3: la búsqueda terminó correctamente pero no encontró coincidencias.
  } else if (items.length === 0) {
    catalogContent = <EmptyState type="search" />;
  } else {
    // Estado 4: convertimos cada producto de Redux en una tarjeta.
    catalogContent = (
      <div className="productGrid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  // Una carga adicional usa un indicador pequeño para no reemplazar el listado existente.
  if (status === "loading" && items.length > 0) {
    loadMoreContent = (
      <span className="loadingMore">
        <RefreshCw size={18} className="spin" />
        Cargando más
      </span>
    );
  } else if (status === "failed" && items.length > 0) {
    // Si falla una página adicional, conservamos lo anterior y permitimos reintentar.
    loadMoreContent = (
      <button className="secondaryButton" type="button" onClick={loadMore}>
        Reintentar carga
      </button>
    );
  } else if (hasMore && items.length > 0) {
    // El botón es una alternativa accesible al scroll infinito automático.
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
        {/* El texto dinámico se anuncia de forma no intrusiva a lectores de pantalla. */}
        <RefreshCw size={18} className={pullIconClass} />
        {pullText}
      </div>

      <section className="catalogSection" aria-labelledby="catalog-title">
        <div className="catalogToolbar">
          <div>
            <h1 id="catalog-title">{catalogTitle}</h1>
            {resultCount}
          </div>
          {/* SearchInput es controlado: ProductCatalog conserva su valor en query. */}
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
