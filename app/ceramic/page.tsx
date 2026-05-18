import { Metadata } from 'next';
import CeramicClient from './CeramicClient';

export const metadata: Metadata = {
  title: 'Керамическое покрытие | Лаборатория блеска Омск',
  description: 'Керамическое покрытие для авто в Омске. Базовое покрытие до 2 лет, премиум-покрытие с обслуживанием до 5 лет. Профессиональное нанесение Hendlex FC8 и FC15.',
  openGraph: {
    title: 'Керамическое покрытие для авто',
    description: 'Защита кузова от ультрафиолета, реагентов и мелких царапин',
    url: 'https://blesklab.ru/ceramic',
  },
  alternates: {
    canonical: 'https://blesklab.ru/ceramic',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Лаборатория блеска",
  "alternateName": "Laboratorya Bleska",
  "description": "Профессиональный детейлинг в Омске. Полировка, керамическое покрытие, бронирование пленкой.",
  "url": "https://blesklab.ru",
  "telephone": "+79620555858",
  "email": "mforever040@gmail.com",
  "priceRange": "от 5 000 ₽ до 230 000 ₽",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Индустриальная, 5Б",
    "addressLocality": "Омск",
    "addressRegion": "Омская область",
    "postalCode": "644000",
    "addressCountry": "RU"
  },
  "openingHours": ["Mo-Su 10:00-20:00"]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://blesklab.ru" },
    { "@type": "ListItem", "position": 2, "name": "Керамическое покрытие", "item": "https://blesklab.ru/ceramic" }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Керамическое покрытие",
  "description": "Защита кузова от ультрафиолета, реагентов и мелких царапин. Гидрофобный эффект и глубокий блеск на годы.",
  "provider": { "@type": "AutoRepair", "name": "Лаборатория блеска", "url": "https://blesklab.ru" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Варианты керамического покрытия",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Базовое покрытие" }, "price": "22000", "priceCurrency": "RUB" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Премиум-защита" }, "price": "32000", "priceCurrency": "RUB" }
    ]
  },
  "url": "https://blesklab.ru/ceramic"
};

export default function CeramicPage() {
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
      <CeramicClient />
    </>
  );
}