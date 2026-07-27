"use client";

import { Heart } from "lucide-react";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import { useIsClient } from "@/hooks/useIsClient";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Product } from "@/types/product";

interface FavoriteButtonProps {
  product: Product;
}

export function FavoriteButton({ product }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const isClient = useIsClient();
  // Consultamos por ID para saber si el producto ya está guardado en Redux.
  const storedAsFavorite = useAppSelector(
    (state) => Boolean(state.favorites.entities[product.id]),
  );
  // El primer render debe coincidir con el servidor; después usamos el valor persistido.
  const isFavorite = isClient && storedAsFavorite;

  let label = "Agregar a favoritos";
  let className = "favoriteButton";
  let fill = "none";

  // El texto, estilo e icono deben representar el estado actual.
  if (isFavorite) {
    label = "Quitar de favoritos";
    className = "favoriteButton selected";
    fill = "currentColor";
  }

  return (
    <button
      type="button"
      className={className}
      // toggleFavorite agrega o elimina el producto según exista en el estado.
      onClick={() => dispatch(toggleFavorite(product))}
      aria-label={label}
      // aria-pressed comunica que el botón funciona como un interruptor.
      aria-pressed={isFavorite}
    >
      <Heart size={20} fill={fill} />
      <span>{label}</span>
    </button>
  );
}
