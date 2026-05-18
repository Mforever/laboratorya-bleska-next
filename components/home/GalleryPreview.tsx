// components/home/GalleryPreview.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PLACEHOLDER_IMAGE } from '@/constants/placeholder';
import { GALLERY_ITEMS } from '@/data/galleryItems';

const GalleryPreview: React.FC = () => {
  // Берём последние 4 работы для превью
  const previewItems = [...GALLERY_ITEMS].reverse().slice(0, 4);

  return (
    <section className="py-20 bg-bg-primary">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-2">
            Наши работы
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Примеры наших проектов
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Реальные результаты, которыми мы гордимся
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {previewItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href="/gallery" className="block">
                <div className="bg-bg-element rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 border border-white/5 hover:border-accent/30 h-full flex flex-col">
                  <div className="relative aspect-square overflow-hidden bg-bg-secondary">
                    <img
                      src={item.afterImage || PLACEHOLDER_IMAGE}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 bg-accent/90 text-bg-primary text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      После
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base mb-1 group-hover:text-accent transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-xs">{item.carModel}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all text-sm font-medium"
          >
            <span>Смотреть все работы</span>
            <i className="fas fa-arrow-right text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;