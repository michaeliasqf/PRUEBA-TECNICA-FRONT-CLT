# Prueba técnica Frontend - CLT

Aplicación desarrollada con Next.js, TypeScript, Redux Toolkit y Axios. Consume la API pública de DummyJSON para listar productos, buscar por título, consultar detalles y gestionar favoritos.

## Requisitos

- Node.js 20.9 o superior.
- pnpm.

## Ejecutar el proyecto

```powershell
pnpm install
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

La variable de entorno es opcional. Para cambiar la URL base de la API:

```powershell
Copy-Item .env.example .env.local
```

## Scripts

```powershell
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
```

## Funcionalidades

- Listado de productos con imagen, título y precio.
- Estado de carga mediante skeleton.
- Manejo de errores con mensaje y botón para reintentar.
- Pull to refresh en dispositivos táctiles.
- Paginación real con infinite scroll y botón "Cargar más".
- Búsqueda por título con debounce de 300 ms.
- Pantalla de detalle con imagen, título, precio y descripción.
- Gestión de favoritos desde el detalle del producto.
- Pantalla con la lista de favoritos.
- Persistencia de favoritos en `localStorage`.

## Estructura

```text
src/
├── app/          # Rutas y layout de Next.js
├── components/   # Componentes de interfaz
├── features/     # Estado Redux de productos y favoritos
├── hooks/        # Debounce y pull to refresh
├── services/     # Configuración de Axios, API y localStorage
├── store/        # Configuración y hooks de Redux
├── types/        # Tipos de TypeScript
└── utils/        # Funciones de formato
```

## Decisiones principales

### Redux Toolkit

El estado de productos conserva `items`, `status`, `error`, `page` y `hasMore`, como solicita el enunciado. Los favoritos se guardan por ID mediante `Record<number, Product>` para evitar duplicados.

### Axios

Las solicitudes utilizan una instancia de Axios con `baseURL`, timeout y headers comunes. La lógica de acceso a productos está separada en un servicio.

### Persistencia

El enunciado menciona AsyncStorage, una herramienta utilizada principalmente en React Native. Como esta aplicación se ejecuta en Next.js web, se usa `localStorage` para mantener los favoritos después de recargar la página.

### Paginación

DummyJSON permite paginación real mediante `limit` y `skip`. Al cargar una página nueva, Redux concatena los productos recibidos con los anteriores.

## API

URL predeterminada:

```text
https://dummyjson.com
```

Endpoints utilizados:

```text
GET /products?limit=12&skip=0
GET /products/search?q=phone&limit=12&skip=0
GET /products/:id
```

## Validación

Antes de entregar:

```powershell
pnpm lint
pnpm typecheck
pnpm build
```
