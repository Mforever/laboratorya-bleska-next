'use client';

import React from 'react';
import { useGalleryStats } from '@/hooks/useGalleryStats';
import { PLACEHOLDER_IMAGE } from '@/constants/placeholder';
import { Icon } from '@/components/ui/Icon';

interface GalleryCardProps {
  item: {
    id: number;
    title: string;
    carModel: string;
    afterImage?: string;
    videoUrl?: string;
    description?: string;
    type: 'image' | 'video';
  };
  onView: () => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, onView }) => {
  const { likes, handleLike, getLikeCount, getViewCount } = useGalleryStats();

  const renderContent = () => {
    if (item.type === 'video') {
      return (
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-secondary">
          <iframe
            src={item.videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            title={item.title}
          />
          <div className="absolute top-3 left-3 bg-accent/90 text-bg-primary text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm flex items-center gap-1">
            <Icon name="fa-play" className="text-[10px]" />
            <span>Видео</span>
          </div>
        </div>
      );
    }

    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-secondary">
        <img
          src={item.afterImage || PLACEHOLDER_IMAGE}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />
      </div>
    );
  };

  return (
    <div className="relative group cursor-pointer" onClick={onView}>
      <div className="bg-bg-element rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
        {renderContent()}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-white/90 text-xs z-10">
          <button
            onClick={(e) => handleLike(item.id, e)}
            className="flex items-center gap-1 hover:scale-110 transition-transform"
          >
            <Icon name={likes[item.id] ? 'fas fa-heart' : 'far fa-heart'} className={likes[item.id] ? 'text-red-500 text-xs' : 'text-white text-xs'} />
            <span className="text-xs font-medium text-white">{getLikeCount(item.id)}</span>
          </button>
          <div className="flex items-center gap-1">
            <Icon name="far fa-eye" className="text-xs text-white" />
            <span className="text-xs font-medium text-white">{getViewCount(item.id)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};