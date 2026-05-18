// hooks/useGalleryStats.ts
'use client';

import { useState, useEffect } from 'react';

export const useGalleryStats = () => {
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<number, number>>({});
  const [views, setViews] = useState<Record<number, number>>({});

  useEffect(() => {
    const savedLikes = localStorage.getItem('gallery_likes');
    const savedLikesCount = localStorage.getItem('gallery_likes_count');
    const savedViews = localStorage.getItem('gallery_views');

    if (savedLikes) setLikes(JSON.parse(savedLikes));
    if (savedLikesCount) setLikesCount(JSON.parse(savedLikesCount));
    if (savedViews) setViews(JSON.parse(savedViews));
  }, []);

  const saveLikes = (newLikes: Record<number, boolean>) => {
    localStorage.setItem('gallery_likes', JSON.stringify(newLikes));
  };

  const saveLikesCount = (newLikesCount: Record<number, number>) => {
    localStorage.setItem('gallery_likes_count', JSON.stringify(newLikesCount));
  };

  const saveViews = (newViews: Record<number, number>) => {
    localStorage.setItem('gallery_views', JSON.stringify(newViews));
  };

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newLikes = { ...likes };
    const newLikesCount = { ...likesCount };

    if (newLikes[id]) {
      delete newLikes[id];
      newLikesCount[id] = (newLikesCount[id] || 0) - 1;
    } else {
      newLikes[id] = true;
      newLikesCount[id] = (newLikesCount[id] || 0) + 1;
    }

    setLikes(newLikes);
    setLikesCount(newLikesCount);
    saveLikes(newLikes);
    saveLikesCount(newLikesCount);
  };

  const handleView = (id: number) => {
    const sessionKey = `gallery_viewed_${id}`;
    if (!sessionStorage.getItem(sessionKey)) {
      const newViews = { ...views };
      newViews[id] = (newViews[id] || 0) + 1;
      setViews(newViews);
      saveViews(newViews);
      sessionStorage.setItem(sessionKey, 'true');
    }
  };

  const getLikeCount = (id: number): number => likesCount[id] || 0;
  const getViewCount = (id: number): number => views[id] || 0;

  return { likes, handleLike, getLikeCount, handleView, getViewCount };
};