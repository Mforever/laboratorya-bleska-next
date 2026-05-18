import { Metadata } from 'next';
import PPFClient from './PPFClient';

export const metadata: Metadata = {
  title: 'Бронирование пленкой | Лаборатория блеска Омск',
  description: 'Бронирование автомобиля защитной пленкой в Омске. Защита от сколов, царапин и реагентов. Интерактивный расчет стоимости.',
  openGraph: {
    title: 'Бронирование автомобиля пленкой',
    description: 'Защита кузова от сколов, царапин и реагентов',
    url: 'https://blesklab.ru/ppf',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Лаборатория блеска",
  "url": "https://blesklab.ru",
  "telephone": "+79620555858",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://blesklab.ru" },
    { "@type": "ListItem", "position": 2, "name": "Бронирование пленкой", "item": "https://blesklab.ru/ppf" }
  ]
};

export default function PPFPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PPFClient />
    </>
  );
}