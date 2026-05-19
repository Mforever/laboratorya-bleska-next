'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

interface Review {
  id: number;
  name: string;
  carModel: string;
  rating: number;
  text: string;
  date: string;
  service?: string;
  verified?: boolean;
}

const defaultSiteReviews: Review[] = [
  {
    id: 1,
    name: 'Александр',
    carModel: 'BMW X5',
    rating: 5,
    text: 'Сделал полировку и керамику — машина как новая спустя год! Вода просто скатывается, мыть одно удовольствие. Спасибо мастерам!',
    date: '2025-03-15',
    service: 'Полировка + Керамика',
    verified: true,
  },
  {
    id: 2,
    name: 'Дмитрий',
    carModel: 'Mercedes E-Class',
    rating: 5,
    text: 'Наносил керамику, результат отличный. Дополнительно защитил фары пленкой — спокойно езжу по трассе, не боюсь камней.',
    date: '2025-02-10',
    service: 'Керамическое покрытие',
    verified: true,
  },
  {
    id: 3,
    name: 'Сергей',
    carModel: 'Audi Q7',
    rating: 5,
    text: 'Забронировал переднюю часть, сделал полировку фар. Ребята профессионалы, всё быстро и качественно. Рекомендую!',
    date: '2025-01-20',
    service: 'Бронирование пленкой',
    verified: true,
  },
];

const Reviews: React.FC = () => {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    carModel: '',
    service: '',
    rating: 5,
    text: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const saved = localStorage.getItem('site_reviews');
    if (saved) {
      setAllReviews(JSON.parse(saved));
    } else {
      setAllReviews(defaultSiteReviews);
      localStorage.setItem('site_reviews', JSON.stringify(defaultSiteReviews));
    }
  }, []);

  const verifiedReviews = allReviews.filter(r => r.verified === true);
  const visibleReviews = verifiedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < verifiedReviews.length;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Icon
            key={i}
            name="fa-star"
            className={`text-xs ${i < rating ? 'text-accent' : 'text-text-secondary/30'}`}
          />
        ))}
      </div>
    );
  };

  const openModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    setFormStatus('submitting');

    const review: Review = {
      id: Date.now(),
      name: newReview.name,
      carModel: newReview.carModel || 'Не указана',
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split('T')[0],
      service: newReview.service || 'Не указана',
      verified: false,
    };

    const updated = [review, ...allReviews];
    setAllReviews(updated);
    localStorage.setItem('site_reviews', JSON.stringify(updated));

    setNewReview({ name: '', carModel: '', service: '', rating: 5, text: '' });
    setShowModal(false);
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-2">Отзывы</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Что говорят о нас</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Реальные люди, реальные автомобили — честные впечатления о нашей работе</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a
            href="https://yandex.ru/maps/org/laboratoriya_bleska/224582731097/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all text-sm font-medium"
          >
            <Icon name="fab fa-yandex" />
            Читать отзывы на Яндекс Картах
          </a>
          <a
            href="https://2gis.ru/omsk/firm/70000001028325432/tab/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-lg transition-all text-sm font-medium"
          >
            <Icon name="fa-map-marker-alt" />
            Читать отзывы на 2ГИС
          </a>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold">Наши клиенты пишут</h3>
            <button
              onClick={openModalHandler}
              className="px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-lg transition-all text-sm"
            >
              <Icon name="fa-pen" className="mr-2" />
              Оставить отзыв
            </button>
          </div>

          {verifiedReviews.length === 0 ? (
            <div className="text-center py-12 bg-bg-element rounded-xl">
              <p className="text-text-secondary">Пока нет отзывов. Будьте первым!</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                {visibleReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-bg-element rounded-xl p-5 border border-white/5 hover:border-accent/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-base">{review.name}</h4>
                        <p className="text-text-secondary text-xs">{review.carModel}</p>
                        {review.service && (
                          <p className="text-accent text-[10px] mt-0.5">{review.service}</p>
                        )}
                      </div>
                      {review.verified && (
                        <div className="text-accent/60 text-xs" title="Подтверждённый отзыв">
                          <Icon name="fa-check-circle" />
                        </div>
                      )}
                    </div>
                    {renderStars(review.rating)}
                    <p className="text-text-secondary text-sm mt-3 leading-relaxed">{review.text}</p>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
                      <span className="text-text-secondary/50 text-xs">{review.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 3)}
                    className="px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-lg transition-all text-sm"
                  >
                    <Icon name="fa-chevron-down" className="mr-2" />
                    Показать ещё
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={closeModalHandler}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-bg-element rounded-2xl w-full max-w-lg pointer-events-auto shadow-2xl border border-white/10">
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                  <h3 className="text-xl font-bold text-text-primary">Оставить отзыв</h3>
                  <button
                    onClick={closeModalHandler}
                    className="w-8 h-8 rounded-lg bg-bg-secondary hover:bg-accent hover:text-bg-primary text-text-secondary transition-colors flex items-center justify-center"
                  >
                    <Icon name="fa-times" />
                  </button>
                </div>

                <form onSubmit={handleSubmitReview} className="p-5 space-y-4">
                  <p className="text-text-secondary text-xs">Отзыв будет опубликован после проверки модератором.</p>

                  <input
                    type="text"
                    placeholder="Ваше имя *"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary text-sm"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Марка и модель авто"
                    value={newReview.carModel}
                    onChange={(e) => setNewReview({ ...newReview, carModel: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary text-sm"
                  />

                  <select
                    value={newReview.service}
                    onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary text-sm appearance-none cursor-pointer"
                  >
                    <option value="">Какую услугу заказывали?</option>
                    <option value="Полировка кузова">Полировка кузова</option>
                    <option value="Керамическое покрытие">Керамическое покрытие</option>
                    <option value="Бронирование пленкой">Бронирование пленкой</option>
                    <option value="Полировка + Керамика">Полировка + Керамика</option>
                    <option value="Комплексная защита">Комплексная защита</option>
                  </select>

                  <div>
                    <label className="text-text-secondary text-sm mb-2 block">Ваша оценка</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none"
                        >
                          <Icon
                            name="fa-star"
                            className={`text-xl ${star <= newReview.rating ? 'text-accent' : 'text-text-secondary/30'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    placeholder="Ваш отзыв *"
                    rows={4}
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary text-sm resize-none"
                    required
                  />

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all text-sm font-medium"
                    >
                      {formStatus === 'submitting' ? 'Отправка...' : 'Отправить на модерацию'}
                    </button>
                    <button
                      type="button"
                      onClick={closeModalHandler}
                      className="px-4 py-2.5 border border-text-secondary/30 rounded-lg hover:border-accent transition-all text-sm"
                    >
                      Отмена
                    </button>
                  </div>

                  {formStatus === 'success' && (
                    <p className="text-success text-xs text-center">Спасибо! Отзыв отправлен на модерацию.</p>
                  )}
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reviews;