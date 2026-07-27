import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tomamos la carpeta actual como raíz para que Turbopack resuelva el proyecto correctamente.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // next/image bloquea dominios externos por defecto; habilitamos solo los usados por DummyJSON.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.dummyjson.com" },
      { protocol: "https", hostname: "dummyjson.com" },
    ],
  },
};

export default nextConfig;
