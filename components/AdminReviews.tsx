'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

const AdminReviews: React.FC = () => {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState(0);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_REVIEWS_PASSWORD;

  const loadReviews = () => {
    const saved = localStorage.getItem('site_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadReviews();
    setLoading(false);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'site_reviews') {
        loadReviews();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    const interval = setInterval(() => {
      loadReviews();
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleApprove = (id: number) => {
    const updated = reviews.map(r =>
      r.id === id ? { ...r, verified: true } : r
    );
    setReviews(updated);
    localStorage.setItem('site_reviews', JSON.stringify(updated));
  };

  const handleDelete = (id: number) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem('site_reviews', JSON.stringify(updated));
  };

  const handleLogin = () => {
    if (Date.now() < blockedUntil) return;

    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setAttempts(0);
      loadReviews();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        setBlockedUntil(Date.now() + 5 * 60 * 1000);
        setAttempts(0);
      }
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword('');
    router.push('/');
  };

  if (loading) {
    return <div className="min-h-screen bg-bg-primary" />;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="bg-bg-element p-2 rounded-xl w-full max-w-[220px]">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-3 py-2 bg-bg-secondary rounded-lg focus:outline-none focus:ring-1 focus:ring-accent text-text-primary text-sm text-center"
            placeholder="Введите пароль"
            autoFocus
          />
        </div>
      </div>
    );
  }

  const pendingReviews = reviews.filter(r => !r.verified);
  const approvedReviews = reviews.filter(r => r.verified);

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-8 px-4">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Модерация отзывов</h1>
          <div className="flex gap-3">
            <button
              onClick={loadReviews}
              className="px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-lg transition-all text-sm"
            >
              <i className="fas fa-sync-alt mr-1"></i>
              Обновить
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-text-secondary/30 rounded-lg hover:border-accent transition-all text-sm"
            >
              Выйти
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            На модерации ({pendingReviews.length})
          </h2>
          {pendingReviews.length === 0 ? (
            <div className="bg-bg-element rounded-xl p-6 text-center text-text-secondary border border-white/5">
              Нет отзывов на модерации
            </div>
          ) : (
            <div className="space-y-4">
              {pendingReviews.map(review => (
                <div key={review.id} className="bg-bg-element p-5 rounded-xl border border-white/10 hover:border-accent/30 transition-all">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="font-semibold text-lg">{review.name}</span>
                        <span className="text-text-secondary text-sm">• {review.carModel}</span>
                        {review.service && (
                          <span className="text-accent text-xs px-2 py-0.5 bg-accent/10 rounded-full">{review.service}</span>
                        )}
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`fas fa-star text-xs ${i < review.rating ? 'text-accent' : 'text-text-secondary/30'}`}></i>
                        ))}
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">{review.text}</p>
                      <p className="text-text-secondary/40 text-xs mt-2">{review.date}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleApprove(review.id)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all text-sm font-medium">
                        <i className="fas fa-check mr-1"></i>Одобрить
                      </button>
                      <button onClick={() => handleDelete(review.id)} className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-all text-sm font-medium">
                        <i className="fas fa-trash mr-1"></i>Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Опубликованные ({approvedReviews.length})
          </h2>
          {approvedReviews.length === 0 ? (
            <div className="bg-bg-element rounded-xl p-6 text-center text-text-secondary border border-white/5">
              Нет опубликованных отзывов
            </div>
          ) : (
            <div className="space-y-3">
              {approvedReviews.map(review => (
                <div key={review.id} className="bg-bg-element/50 p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <span className="font-semibold">{review.name}</span>
                      <span className="text-text-secondary text-sm ml-2">• {review.carModel}</span>
                      {review.service && <span className="text-accent text-xs ml-2">({review.service})</span>}
                    </div>
                    <button onClick={() => handleDelete(review.id)} className="text-text-secondary/50 hover:text-red-500 transition-all text-sm">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fas fa-star text-xs ${i < review.rating ? 'text-accent' : 'text-text-secondary/30'}`}></i>
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm mt-2">{review.text}</p>
                  <p className="text-text-secondary/40 text-xs mt-2">{review.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;