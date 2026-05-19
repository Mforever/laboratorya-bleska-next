// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
// Удалите эту строку: import '@fortawesome/fontawesome-free/css/all.min.css';
import { ModalProvider } from '@/contexts/ModalContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Лаборатория блеска - Детейлинг студия в Омске',
    template: '%s | Лаборатория блеска'
  },
  description: 'Профессиональный детейлинг в Омске. Полировка, керамическое покрытие, бронирование пленкой.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-bg-primary text-text-primary font-montserrat overflow-x-hidden">
        <ModalProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}