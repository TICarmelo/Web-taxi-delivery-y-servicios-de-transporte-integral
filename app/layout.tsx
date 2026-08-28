import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UBI - Tu Ciudad, Tus Servicios, Simplificados',
  description: 'UBI: Tu plataforma integral de Delivery, Compras Asistidas con Personal Shopper y Transporte en Ciudad Bolívar.',
  openGraph: {
    title: 'UBI - Tu Ciudad, Tus Servicios, Simplificados',
    description: 'UBI: Tu plataforma integral de Delivery, Compras Asistidas con Personal Shopper y Transporte en Ciudad Bolívar.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UBI - Tu Ciudad, Tus Servicios, Simplificados',
    description: 'UBI: Tu plataforma integral de Delivery, Compras Asistidas con Personal Shopper y Transporte en Ciudad Bolívar.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="font-sans antialiased text-slate-800 bg-[#f4f7fb] selection:bg-[#00a896] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
