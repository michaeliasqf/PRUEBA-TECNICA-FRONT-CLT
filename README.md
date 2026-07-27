# Prueba técnica Frontend - CLT

Aplicación desarrollada con Next.js, TypeScript, Redux Toolkit y Axios.

## Segunda etapa

Esta versión funcional incluye:

- Estructura base de la aplicación.
- Instancia configurada de Axios.
- Estado de productos con Redux Toolkit.
- Paginación real mediante `limit` y `skip`.
- Loading mediante skeleton.
- Manejo de errores con opción de reintentar.
- Tarjetas responsive de productos.
- Búsqueda con debounce de 300 ms.
- Scroll infinito con botón alternativo.
- Pull to refresh en dispositivos táctiles.

## Ejecutar

```powershell
pnpm install
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Validar

```powershell
pnpm lint
pnpm typecheck
pnpm build
```
