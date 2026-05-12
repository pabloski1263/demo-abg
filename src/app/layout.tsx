import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABG Abogados | Estudio Jurídico",
  description: "Asesoría legal de excelencia con más de 25 años de experiencia. Derecho Corporativo, Tributario, Laboral, Civil, Comercial y Regulatorio.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-navy-900 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
