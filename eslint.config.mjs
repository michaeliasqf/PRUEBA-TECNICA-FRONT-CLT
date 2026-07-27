import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  // Reglas recomendadas de Next.js para rendimiento, accesibilidad y TypeScript.
  ...nextVitals,
  ...nextTs,
  // Estos archivos son generados automáticamente y no corresponde analizarlos.
  globalIgnores([".next/**", "next-env.d.ts"]),
]);
