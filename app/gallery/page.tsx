// app/gallery/page.tsx
'use client';

import { motion } from 'framer-motion';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export default function GalleryPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg-primary pt-32 pb-20"
    >
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
            Портфолио
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Наши работы</h1>
          <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Результаты нашей работы — каждый проект это история преображения
          </p>
        </div>

        <GalleryGrid />
      </div>
    </motion.div>
  );
}