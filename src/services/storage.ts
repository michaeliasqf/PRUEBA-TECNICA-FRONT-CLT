import type { Product } from "@/types/product";

const FAVORITES_KEY = "clt-product-explorer:favorites";

// Cargamos los favoritos desde localStorage; si no existen, devolvemos un objeto vacío.
export function loadFavorites(): Record<number, Product> {
  // window no existe durante el render del servidor de Next.js.
  if (typeof window === "undefined") return {};
  try {
    const stored = window.localStorage.getItem(FAVORITES_KEY);

    if (!stored) {
      return {};
    }

    // localStorage guarda texto; JSON.parse reconstruye el objeto de productos por ID.
    return JSON.parse(stored) as Record<number, Product>;
  } catch {
    // Si el contenido está dañado o no está disponible, iniciamos sin favoritos.
    return {};
  }
}

// Guarda el estado de favoritos cada vez que Redux informa un cambio.
export function saveFavorites(favorites: Record<number, Product>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // El storage puede fallar en modo privado; Redux sigue funcionando durante la sesión.
  }
}
