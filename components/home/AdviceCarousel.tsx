'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import adviceData from '@/data/advice.json';
import { PLACEHOLDER_IMAGE } from '@/constants/placeholder';

interface ShortTip {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const AdviceCarousel: React.FC = () => {
  const [tips, setTips] = useState<ShortTip[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const shortTips = adviceData.articles
      .filter(article => article.format === 'short')
      .map(article => ({
        slug: article.slug,
        title: article.title,
        description: article.description,
        image: article.image,
        category: article.category,
      }));
    setTips(shortTips);
  }, []);

  useEffect(() => {
    if (tips.length === 0 || isHovered) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [tips.length, isHovered]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % tips.length);
      }, 5000);
    }
  };

  if (tips.length === 0) return null;

  const itemsPerView = typeof window !== 'undefined'
    ? (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4)
    : 4;
  const totalPages = Math.ceil(tips.length / itemsPerView);
  const currentPage = Math.floor(currentIndex / itemsPerView);

  return (
    <section className="py-16 bg-bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Быстрые советы</h2>
          <p className="text-text-secondary text-sm">Коротко о главном — 30 секунд на ответ</p>
        </div>

        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out gap-5" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <div key={pageIdx} className="flex gap-5 flex-shrink-0 w-full">
                  {tips.slice(pageIdx * itemsPerView, (pageIdx + 1) * itemsPerView).map((tip) => (
                    <div key={tip.slug} className="flex-1 group">
                      <Link href={`/advice/${tip.slug}`} className="block">
                        <div className="bg-bg-element rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 h-full border border-white/5 hover:border-accent/30">
                          <div className="relative aspect-square overflow-hidden bg-bg-secondary">
                            <img
                              src={tip.image || PLACEHOLDER_IMAGE}
                              alt={tip.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-sm mb-2 line-clamp-2 min-h-[40px] group-hover:text-accent transition-colors">
                              {tip.title}
                            </h3>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-accent text-xs font-medium inline-flex items-center gap-1">
                                Читать <i className="fas fa-arrow-right text-[10px]"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                  {tips.slice(pageIdx * itemsPerView, (pageIdx + 1) * itemsPerView).length < itemsPerView &&
                    Array.from({ length: itemsPerView - tips.slice(pageIdx * itemsPerView, (pageIdx + 1) * itemsPerView).length }).map((_, i) => (
                      <div key={`empty-${i}`} className="flex-1 invisible" />
                    ))}
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <>
              <button
                onClick={() => goToSlide(Math.max(0, currentIndex - itemsPerView))}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 rounded-full bg-black/50 hover:bg-accent text-white hover:text-bg-primary transition-all flex items-center justify-center z-10 backdrop-blur-sm"
              >
                <i className="fas fa-chevron-left text-sm"></i>
              </button>
              <button
                onClick={() => goToSlide(Math.min(tips.length - 1, currentIndex + itemsPerView))}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-8 h-8 rounded-full bg-black/50 hover:bg-accent text-white hover:text-bg-primary transition-all flex items-center justify-center z-10 backdrop-blur-sm"
              >
                <i className="fas fa-chevron-right text-sm"></i>
              </button>
            </>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx * itemsPerView)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentPage === idx ? 'w-8 bg-accent' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Link href="/advice" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm">
            <span>Все советы экспертов</span>
            <i className="fas fa-arrow-right text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdviceCarousel;