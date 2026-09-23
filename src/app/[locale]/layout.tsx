import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MMYO - Asesoría personalizada para satisfacer las más complejas necesidades.',
  description: 'MMYO ofrece servicios de asesoría financiera y consultoría personalizada para ayudar a empresas e individuos a navegar la complejidad del entorno económico actual. Nos enfocamos en la independencia, especialización y atención personalizada, garantizando la máxima calidad en nuestros servicios.',
  keywords: 'asesoría financiera, consultoría empresarial, asesoría personalizada, MMYO, soluciones económicas, planificación financiera, estrategia empresarial',
  authors: [{ name: 'MMYO' }],
  openGraph: {
    title: 'MMYO - Servicios de Asesoría Financiera y Consultoría',
    description: 'Servicios personalizados de asesoría financiera y consultoría para ayudarte a navegar la complejidad del entorno económico actual.',
    url: 'https://mmyo.com.mx',
    siteName: 'MMYO',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
