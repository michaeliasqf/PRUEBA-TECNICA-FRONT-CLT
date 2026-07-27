"use client";

import { Heart } from "lucide-react";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Product } from "@/types/product";

interface FavoriteButtonProps {
  product: Product;
}

export function FavoriteButton({ product }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  // Consultamos por ID para saber si el producto ya está guardado en Redux.
  const isFavorite = useAppSelector(
    (state) => Boolean(state.favorites.entities[product.id]),
  );

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
