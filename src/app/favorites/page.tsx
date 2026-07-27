import type { Metadata } from "next";
import { FavoritesView } from "@/components/products/FavoritesView";

// Título específico que se combina con el template definido en layout.tsx.
export const metadata: Metadata = { title: "Favoritos" };

// La vista cliente se encarga de leer los favoritos desde Redux.
export default function FavoritesPage() {
  return <FavoritesView />;
}
