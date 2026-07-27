"use client";

import { Search, X } from "lucide-react";
import type { ChangeEvent, ReactNode } from "react";

interface SearchInputProps {
  value: string;
  // El padre conserva el estado; este componente solo comunica el nuevo texto.
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  // Extraemos el texto del evento antes de enviarlo a ProductCatalog.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);

  let clearButton: ReactNode = null;

  // El botón para limpiar solo tiene sentido cuando existe texto.
  if (value) {
    clearButton = (
      <button type="button" onClick={() => onChange("")} aria-label="Limpiar búsqueda">
        <X size={18} aria-hidden />
      </button>
    );
  }

  return (
    <div className="searchField">
      <Search size={20} aria-hidden />
      <input
        type="search"
        placeholder="Buscar por nombre..."
        aria-label="Buscar productos por nombre"
        // Input controlado: su valor siempre proviene del estado query del catálogo.
        value={value}
        onChange={handleChange}
      />
      {clearButton}
    </div>
  );
}
