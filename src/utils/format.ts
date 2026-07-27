// Centralizamos el formato para que todos los precios se muestren igual.
export const formatPrice = (value: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};

// Algunas categorías pueden venir con guiones (por ejemplo, mobile-accessories).
// Separamos esas palabras y capitalizamos cada una para mostrarlas de forma legible.
export const formatCategory = (value: string): string =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
