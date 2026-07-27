import Link from "next/link";

// Fallback para IDs inválidos o productos que la API no pudo encontrar.
export default function NotFound() {
  return (
    <main className="pageShell notFound">
      <span>404</span>
      <h1>Este producto no está disponible</h1>
      <p>Puede que haya sido retirado o que el enlace no sea correcto.</p>
      <Link className="primaryButton" href="/">Volver al catálogo</Link>
    </main>
  );
}
