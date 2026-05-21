import type { Metadata } from 'next';
import './globals.css';
import { ModalProvider } from '@/contexts/ModalContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'Лаборатория блеска - Детейлинг студия в Омске',
    template: '%s | Лаборатория блеска'
  },
  description: 'Профессиональный детейлинг в Омске. Полировка, керамическое покрытие, бронирование пленкой.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
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
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />

        {/* Предзагрузка шрифтов */}
        <link rel="preload" href="/fonts/Montserrat-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Montserrat-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Яндекс Метрика */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for(var j=0;j<document.scripts.length;j++){
                if(document.scripts[j].src===r){return;}
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
            })
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
            ym(108982663, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
        <noscript>
          <div><img src="https://mc.yandex.ru/watch/108982663" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div>
        </noscript>
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