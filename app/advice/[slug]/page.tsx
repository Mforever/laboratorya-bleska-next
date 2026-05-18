'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import adviceData from '@/data/advice.json';
import { PLACEHOLDER_IMAGE } from '@/constants/placeholder';
import { useModalContext } from '@/contexts/ModalContext';

export default function AdviceArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = adviceData.articles.find(a => a.slug === slug);
  const { openModal } = useModalContext();

  useEffect(() => {
    if (!slug) return;
    const savedViews = localStorage.getItem('advice_views');
    let views = savedViews ? JSON.parse(savedViews) : {};
    const sessionKey = `viewed_${slug}`;
    if (!sessionStorage.getItem(sessionKey)) {
      views[slug] = (views[slug] || 0) + 1;
      localStorage.setItem('advice_views', JSON.stringify(views));
      sessionStorage.setItem(sessionKey, 'true');
    }
  }, [slug]);

  if (!article) {
    notFound();
  }

  const { title, description, image, video, content, format } = article;
  const isShort = format === 'short';

  const openModalHandler = () => {
    openModal({ serviceType: 'general', serviceName: 'консультацию' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-bg-primary pt-32 pb-20">
      <div className={`container-custom ${isShort ? 'max-w-3xl' : 'max-w-4xl'}`}>
        {/* Хлебные крошки */}
        <div className="text-sm text-text-secondary/60 mb-6">
          <Link href="/advice" className="hover:text-accent transition-colors">Советы экспертов</Link>
          <span className="mx-2">/</span>
          <span className="text-text-secondary">{title}</span>
        </div>

        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-text-secondary text-lg">{description}</p>
        </div>

        {/* Изображение */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <img
            src={image && image.trim() !== '' ? image : PLACEHOLDER_IMAGE}
            alt={title}
            className="w-full h-auto"
            onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
          />
        </div>

        {/* Видео (если есть) */}
        {video && video.trim() !== '' && (
          <div className="mb-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                src={video.includes('youtube') ? video : video + '&autoplay=0'}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Содержимое статьи */}
        <div
          className="advice-content prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Блок с вопросом */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-text-secondary text-sm mb-4">Есть вопросы? Напишите нам в Telegram — ответим в течение 15 минут</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/rudenko_ds"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all"
            >
              <i className="fab fa-telegram"></i> Написать в Telegram
            </a>
            <button
              onClick={openModalHandler}
              className="px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-lg transition-all"
            >
              Заказать звонок
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}