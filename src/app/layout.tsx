import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreProvider } from "@/store/StoreProvider";
import "./globals.css";

// Metadata compartida por todas las rutas; las páginas pueden sobrescribir el título.
export const metadata: Metadata = {
  title: { default: "Productos | Prueba técnica CLT", template: "%s | CLT" },
  description: "Catálogo de productos desarrollado para la prueba técnica Frontend de CLT",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {/* Redux envuelve toda la aplicación para compartir productos y favoritos. */}
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
