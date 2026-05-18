// components/gallery/GalleryGrid.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS } from '@/data/galleryItems';
import { GalleryCard } from './GalleryCard';
import { GalleryModal } from './GalleryModal';
import { useGalleryStats } from '@/hooks/useGalleryStats';

export const GalleryGrid: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const { handleView } = useGalleryStats();

  const visibleItems = GALLERY_ITEMS.slice(0, visibleCount);
  const hasMore = visibleCount < GALLERY_ITEMS.length;

  const handleItemClick = (item: typeof GALLERY_ITEMS[0], index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    handleView(item.id);
  };

  const nextItem = () => {
    const newIndex = (selectedIndex + 1) % GALLERY_ITEMS.length;
    setSelectedIndex(newIndex);
    setSelectedItem(GALLERY_ITEMS[newIndex]);
    handleView(GALLERY_ITEMS[newIndex].id);
  };

  const prevItem = () => {
    const newIndex = (selectedIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setSelectedIndex(newIndex);
    setSelectedItem(GALLERY_ITEMS[newIndex]);
    handleView(GALLERY_ITEMS[newIndex].id);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GalleryCard item={item} onView={() => handleItemClick(item, index)} />
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="px-8 py-3 border border-accent rounded-lg hover:bg-accent hover:text-bg-primary transition-colors"
          >
            Показать еще
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedItem && (
          <GalleryModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onNext={nextItem}
            onPrev={prevItem}
          />
        )}
      </AnimatePresence>
    </>
  );
};