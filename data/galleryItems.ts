// data/galleryItems.ts
export interface GalleryItem {
  id: number;
  title: string;
  carModel: string;
  beforeImage?: string;
  afterImage?: string;
  videoUrl?: string;
  description?: string;
  type: 'image' | 'video';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'BMW X5',
    carModel: 'BMW X5',
    beforeImage: '/images/gallery/bmw-x5/before.jpg',
    afterImage: '/images/gallery/bmw-x5/after.jpg',
    description: 'Полная полировка кузова + керамическое покрытие. Удалены царапины, возвращен глубокий блеск.',
    type: 'image'
  },
  {
    id: 2,
    title: 'BMW X7',
    carModel: 'BMW X7',
    beforeImage: '/images/gallery/bmw-x7/before.jpg',
    afterImage: '/images/gallery/bmw-x7/after.jpg',
    description: 'Керамическое покрытие кузова + бронирование фар. Защита от реагентов и ультрафиолета.',
    type: 'image'
  },
  {
    id: 3,
    title: 'Lexus LX600',
    carModel: 'Lexus LX600',
    beforeImage: '/images/gallery/LX600/before.jpg',
    afterImage: '/images/gallery/LX600/after.jpg',
    description: 'Бронирование передней части пленкой + керамика. Максимальная защита для премиум внедорожника.',
    type: 'image'
  },
  {
    id: 4,
    title: 'Mercedes E-Class',
    carModel: 'Mercedes E-Class',
    beforeImage: '/images/gallery/mercedes-e-class/before.jpg',
    afterImage: '/images/gallery/mercedes-e-class/after.jpg',
    description: 'Абразивная полировка + керамическое покрытие. Автомобиль сияет как новый.',
    type: 'image'
  },
  {
    id: 5,
    title: 'Porsche Cayenne',
    carModel: 'Porsche Cayenne',
    beforeImage: '/images/gallery/porsche-cayenne/before.jpg',
    afterImage: '/images/gallery/porsche-cayenne/after.jpg',
    description: 'Полное бронирование кузова + керамика. Идеальная защита для премиум авто.',
    type: 'image'
  },
  {
    id: 6,
    title: 'Lexus RX350',
    carModel: 'Lexus RX350',
    beforeImage: '/images/gallery/RX350/before.jpg',
    afterImage: '/images/gallery/RX350/after.jpg',
    description: 'Восстановление ЛКП + нанокерамика. Удалены все дефекты, авто как из салона.',
    type: 'image'
  },
];