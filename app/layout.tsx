import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Momentum | Interactive Digital Experience Builder',
  description: 'Crea calendarios de adviento interactivos, cápsulas del tiempo y tarjetas digitales compartibles con un enlace seguro.',
  keywords: ['advent calendar', 'time capsule', 'greeting card', 'countdown', 'momentum', 'digital gifts'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
