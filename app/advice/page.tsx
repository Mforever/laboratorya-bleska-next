'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import adviceData from '@/data/advice.json';
import { PLACEHOLDER_IMAGE } from '@/constants/placeholder';
import { Icon } from '@/components/ui/Icon';

interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  image: string;
  type: 'article' | 'faq' | 'tip';
  format: 'long' | 'short';
}

export default function AdvicePage() {
  const allArticles = adviceData.articles as ArticleMeta[];
  const shortTips = allArticles.filter(a => a.format === 'short');
  const longArticles = allArticles.filter(a => a.format === 'long');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});
  const [views, setViews] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedLikes = localStorage.getItem('advice_likes');
    const savedLikesCount = localStorage.getItem('advice_likes_count');
    const savedViews = localStorage.getItem('advice_views');
    if (savedLikes) setLikes(JSON.parse(savedLikes));
    if (savedLikesCount) setLikesCount(JSON.parse(savedLikesCount));
    if (savedViews) setViews(JSON.parse(savedViews));
  }, []);

  useEffect(() => {
    if (shortTips.length === 0 || isHovered) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shortTips.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [shortTips.length, isHovered]);

  const handleLike = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newLikes = { ...likes };
    const newLikesCount = { ...likesCount };
    if (newLikes[slug]) {
      delete newLikes[slug];
      newLikesCount[slug] = (newLikesCount[slug] || 0) - 1;
    } else {
      newLikes[slug] = true;
      newLikesCount[slug] = (newLikesCount[slug] || 0) + 1;
    }
    setLikes(newLikes);
    setLikesCount(newLikesCount);
    localStorage.setItem('advice_likes', JSON.stringify(newLikes));
    localStorage.setItem('advice_likes_count', JSON.stringify(newLikesCount));
  };

  const getLikeCount = (slug: string): number => likesCount[slug] || 0;
  const getViewCount = (slug: string): number => views[slug] || 0;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % shortTips.length);
      }, 5000);
    }
  };

  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerView(1);
      else if (width < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(shortTips.length / itemsPerView);
  const currentPage = Math.floor(currentIndex / itemsPerView);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-bg-primary pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-3">Знания экспертов</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">Советы экспертов</h1>
            <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">Отвечаем на частые вопросы и делимся опытом, чтобы ваш автомобиль всегда сиял</p>
          </motion.div>
        </div>

        {/* Быстрые советы - карусель */}
        {shortTips.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-2">Быстрые ответы</h2>
            <p className="text-text-secondary text-sm mb-6">Коротко и по делу — 30 секунд на ответ</p>

            <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-out gap-5" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
                  {Array.from({ length: totalPages }).map((_, pageIdx) => (
                    <div key={pageIdx} className="flex gap-5 flex-shrink-0 w-full">
                      {shortTips.slice(pageIdx * itemsPerView, (pageIdx + 1) * itemsPerView).map((tip) => (
                        <div key={tip.slug} className="flex-1 group">
                          <Link href={`/advice/${tip.slug}`} className="block">
                            <div className="bg-bg-element rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 h-full border border-white/5 hover:border-accent/30">
                              <div className="relative aspect-square overflow-hidden">
                                <img
                                  src={tip.image && tip.image.trim() !== '' ? tip.image : PLACEHOLDER_IMAGE}
                                  alt={tip.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-sm mb-2 line-clamp-2 min-h-[40px] group-hover:text-accent transition-colors">{tip.title}</h3>
                                <div className="flex items-center justify-between mt-3">
                                  <span className="text-accent text-xs font-medium inline-flex items-center gap-1">Читать <Icon name="fa-arrow-right" className="text-[10px]" /></span>
                                  <div className="flex items-center gap-2 text-text-secondary/50 text-xs">
                                    <button onClick={(e) => handleLike(tip.slug, e)} className="flex items-center gap-1 hover:text-accent transition-colors">
                                      <Icon name={likes[tip.slug] ? 'fas fa-heart' : 'far fa-heart'} className={likes[tip.slug] ? 'text-accent' : ''} />
                                      <span>{getLikeCount(tip.slug)}</span>
                                    </button>
                                    <div className="flex items-center gap-1"><Icon name="far fa-eye" /><span>{getViewCount(tip.slug)}</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                      {shortTips.slice(pageIdx * itemsPerView, (pageIdx + 1) * itemsPerView).length < itemsPerView &&
                        Array.from({ length: itemsPerView - shortTips.slice(pageIdx * itemsPerView, (pageIdx + 1) * itemsPerView).length }).map((_, i) => (
                          <div key={`empty-${i}`} className="flex-1 invisible" />
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              {totalPages > 1 && (
                <>
                  <button onClick={() => goToSlide(Math.max(0, currentIndex - itemsPerView))} className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 rounded-full bg-black/50 hover:bg-accent text-white hover:text-bg-primary transition-all flex items-center justify-center z-10 backdrop-blur-sm">
                    <Icon name="fa-chevron-left" className="text-sm" />
                  </button>
                  <button onClick={() => goToSlide(Math.min(shortTips.length - 1, currentIndex + itemsPerView))} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-8 h-8 rounded-full bg-black/50 hover:bg-accent text-white hover:text-bg-primary transition-all flex items-center justify-center z-10 backdrop-blur-sm">
                    <Icon name="fa-chevron-right" className="text-sm" />
                  </button>
                </>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button key={idx} onClick={() => goToSlide(idx * itemsPerView)} className={`h-1.5 rounded-full transition-all duration-300 ${currentPage === idx ? 'w-8 bg-accent' : 'w-4 bg-white/20 hover:bg-white/40'}`} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Полезные статьи */}
        {longArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Полезные статьи</h2>
            <p className="text-text-secondary text-sm mb-6">Разбираем сложные темы подробно и с примерами</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {longArticles.map((article, index) => (
                <motion.div key={article.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="group">
                  <Link href={`/advice/${article.slug}`} className="block h-full">
                    <div className="bg-bg-element rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 h-full flex flex-col border border-white/5 hover:border-accent/30">
                      <div className="relative aspect-video overflow-hidden">
                        <img src={article.image || PLACEHOLDER_IMAGE} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-accent text-xs font-medium uppercase tracking-wider border-l-2 border-accent pl-2">Статья</span>
                          <div className="flex items-center gap-2 text-text-secondary/40 text-xs">
                            <div className="flex items-center gap-1"><Icon name="far fa-eye" /><span>{getViewCount(article.slug)}</span></div>
                            <button onClick={(e) => handleLike(article.slug, e)} className="flex items-center gap-1 hover:text-accent transition-colors">
                              <Icon name={likes[article.slug] ? 'fas fa-heart' : 'far fa-heart'} className={likes[article.slug] ? 'text-accent' : ''} />
                              <span>{getLikeCount(article.slug)}</span>
                            </button>
                          </div>
                        </div>
                        <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-accent transition-colors">{article.title}</h3>
                        <p className="text-text-secondary text-sm line-clamp-3 mb-4">{article.description}</p>
                        <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-white/5 gap-3 sm:gap-2">
                          <span className="text-accent text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                            Читать статью
                            <Icon name="fa-arrow-right" className="text-xs" />
                          </span>
                          <div className="flex items-center gap-1 text-text-secondary/40 text-xs whitespace-nowrap">
                            <Icon name="fa-clock" className="text-xs flex-shrink-0" />
                            <span>5-7 мин</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {allArticles.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <Icon name="fa-newspaper" className="text-3xl text-accent" />
            </div>
            <p className="text-text-secondary">Скоро здесь появятся первые статьи</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}