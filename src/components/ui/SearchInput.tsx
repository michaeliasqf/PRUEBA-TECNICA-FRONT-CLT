"use client";

import { Search, X } from "lucide-react";
import type { ChangeEvent, ReactNode } from "react";

interface SearchInputProps {
  value: string;
  // El estado pertenece al catálogo; el input comunica cada nuevo texto.
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);

  let clearButton: ReactNode = null;

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
        // Es un input controlado: el valor siempre proviene del estado del padre.
        value={value}
        onChange={handleChange}
      />
      {clearButton}
    </div>
  );
}
