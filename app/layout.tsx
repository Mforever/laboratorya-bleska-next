// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

// Правильный путь к ModalProvider
import { ModalProvider } from '@/contexts/ModalContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/CookieConsent';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

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
        {/* Предзагрузка критического CSS */}
        <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
        />
        {/* Яндекс Метрика - отложенная загрузка */}
        <Script
          id="yandex-metrika"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for(var j=0;j<document.scripts.length;j++)
                  if(document.scripts[j].src===r)return;
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(108982663, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: false,
                trackHash: true
              });
            `,
          }}
        />
      </head>
      <body className="bg-bg-primary text-text-primary font-montserrat overflow-x-hidden">
        <ModalProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CookieConsent />
        </ModalProvider>
      </body>
    </html>
  );
}