import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreProvider } from "@/store/StoreProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Productos | Prueba técnica CLT",
  description: "Catálogo de productos desarrollado para la prueba técnica Frontend de CLT",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {/* Redux envuelve el catálogo para compartir su estado con los componentes. */}
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
