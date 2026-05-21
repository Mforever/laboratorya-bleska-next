'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

interface GalleryModalProps {
  item: {
    id: number;
    title: string;
    carModel: string;
    beforeImage?: string;
    afterImage?: string;
    videoUrl?: string;
    description?: string;
    type: 'image' | 'video';
  } | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const TELEGRAM_CONTACT = '@rudenko_ds';

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose, onNext, onPrev }) => {
  const [showBefore, setShowBefore] = useState(true);
  const [modalImageError, setModalImageError] = useState(false);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button onClick={onPrev} className="w-10 h-10 bg-white/10 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors">
              <Icon name="fa-chevron-left" />
            </button>
            <button onClick={onNext} className="w-10 h-10 bg-white/10 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors">
              <Icon name="fa-chevron-right" />
            </button>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white/10 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors">
            <Icon name="fa-times" />
          </button>
        </div>

        {item.type === 'image' && (
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setShowBefore(true)}
              className={`px-8 py-2.5 rounded-lg font-medium transition-all min-w-[100px] ${showBefore ? 'bg-accent text-bg-primary' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              До
            </button>
            <button
              onClick={() => setShowBefore(false)}
              className={`px-8 py-2.5 rounded-lg font-medium transition-all min-w-[100px] ${!showBefore ? 'bg-accent text-bg-primary' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              После
            </button>
          </div>
        )}

        <div className="relative w-full bg-bg-secondary rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {item.type === 'video' ? (
            <iframe
              src={`${item.videoUrl}&autoplay=1`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              title={item.title}
            />
          ) : modalImageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Icon name="fa-image" className="text-6xl text-text-secondary/30 mb-4" />
              <p className="text-text-secondary">Изображение не загрузилось</p>
            </div>
          ) : (
            <img
              src={showBefore ? item.beforeImage : item.afterImage}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-contain"
              onError={() => setModalImageError(true)}
            />
          )}
          <div className="absolute bottom-3 right-3 text-white/30 text-xs font-bold bg-black/20 px-2 py-1 rounded">
            {TELEGRAM_CONTACT}
          </div>
        </div>

        <div className="mt-4 text-white bg-black/20 p-4 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl md:text-2xl font-bold mb-1">{item.title}</h3>
          <p className="text-accent mb-2">{item.carModel}</p>
          <p className="text-white/80 text-sm">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};