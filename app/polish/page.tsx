import { Metadata } from 'next';
import PolishClient from './PolishClient';

export const metadata: Metadata = {
  title: 'Полировка кузова | Лаборатория блеска Омск',
  description: 'Профессиональная полировка кузова в Омске. Восстановление ЛКП, удаление царапин, защитная полировка. Работаем с любыми типами авто.',
  openGraph: {
    title: 'Полировка кузова автомобиля',
    description: 'Восстановление ЛКП, удаление царапин, защитная полировка',
    url: 'https://blesklab.ru/polish',
  },
  alternates: {
    canonical: 'https://blesklab.ru/polish',
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
    { "@type": "ListItem", "position": 2, "name": "Полировка кузова", "item": "https://blesklab.ru/polish" }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Полировка кузова",
  "description": "Профессиональная полировка кузова. Восстановление ЛКП, удаление царапин.",
  "provider": { "@type": "AutoRepair", "name": "Лаборатория блеска" },
  "url": "https://blesklab.ru/polish"
};

export default function PolishPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PolishClient />
    </>
  );
}