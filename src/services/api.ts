import axios from "axios";

// DummyJSON es el valor por defecto, pero puede reemplazarse desde .env.local.
let apiBaseUrl = "https://dummyjson.com";

if (process.env.NEXT_PUBLIC_API_URL) {
  apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
}

// Una sola instancia evita repetir la URL, el timeout y los headers en cada petición.
export const api = axios.create({
  baseURL: apiBaseUrl,
  // Si la API no responde en 10 segundos, Axios rechaza la solicitud.
  timeout: 10_000,
  headers: { Accept: "application/json" },
});
