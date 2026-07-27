export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="productGrid" aria-label="Cargando productos" aria-busy="true">
      {/* Creamos tarjetas temporales para conservar el espacio mientras responde la API. */}
      {Array.from({ length: count }, (_, index) => (
        <div className="productCard skeletonCard" key={index}>
          <div className="skeleton skeletonMedia" />
          <div className="cardBody">
            <div className="skeleton skeletonLine short" />
            <div className="skeleton skeletonLine" />
            <div className="skeleton skeletonLine medium" />
          </div>
        </div>
      ))}
    </div>
  );
}
