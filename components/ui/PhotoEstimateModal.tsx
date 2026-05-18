'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoEstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhotoEstimateModal: React.FC<PhotoEstimateModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+7',
    carModel: '',
    comment: '',
  });
  const [phoneError, setPhoneError] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const MAX_FILES = 5;

  // Блокировка скролла body при открытии модалки
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Очистка превью при размонтировании
  useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} Б`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
  };

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '+7';
    let cleaned = digits;
    if (cleaned[0] === '8') {
      cleaned = '7' + cleaned.slice(1);
    }
    if (cleaned[0] !== '7') {
      cleaned = '7' + cleaned;
    }
    const limited = cleaned.slice(0, 11);
    let result = '+7';
    if (limited.length > 1) {
      result += ` (${limited.slice(1, 4)}`;
    }
    if (limited.length > 4) {
      result += `) ${limited.slice(4, 7)}`;
    }
    if (limited.length > 7) {
      result += `-${limited.slice(7, 9)}`;
    }
    if (limited.length > 9) {
      result += `-${limited.slice(9, 11)}`;
    }
    return result;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatPhone(raw);
    setFormData({ ...formData, phone: formatted });

    const digits = formatted.replace(/\D/g, '');
    if (digits.length === 11) {
      setPhoneError('');
    } else if (digits.length > 1 && digits.length < 11) {
      setPhoneError(`Введите 10 цифр после +7 (осталось ${10 - (digits.length - 1)})`);
    } else if (digits.length === 0 || digits === '7') {
      setPhoneError('');
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setErrorMessage('');

    if (photos.length + files.length > MAX_FILES) {
      setErrorMessage(`Можно загрузить не более ${MAX_FILES} фото. Сейчас выбрано ${photos.length} из ${MAX_FILES}.`);
      return;
    }

    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      const names = oversizedFiles.map(f => f.name).join(', ');
      setErrorMessage(`Файлы: ${names.substring(0, 50)} превышают лимит ${formatFileSize(MAX_FILE_SIZE)}.`);
      return;
    }

    const newPhotos = [...photos, ...files].slice(0, MAX_FILES);
    setPhotos(newPhotos);

    const newPreviews = newPhotos.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setPreviews(newPreviews);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Введите ваше имя');
      nameInputRef.current?.focus();
      return;
    }

    const digits = formData.phone.replace(/\D/g, '');
    if (digits.length !== 11) {
      setPhoneError('Введите полный номер телефона (10 цифр после +7)');
      return;
    }

    if (photos.length === 0) {
      setErrorMessage('Загрузите хотя бы одно фото для оценки');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setPhoneError('');

    const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Telegram не настроен');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const textMessageMaster = `
🔍 <b>НОВАЯ ЗАЯВКА НА ОЦЕНКУ ПО ФОТО</b>

👤 <b>Имя:</b> ${formData.name}
📞 <b>Телефон:</b> ${formData.phone}
🚗 <b>Автомобиль:</b> ${formData.carModel || 'Не указан'}
💬 <b>Комментарий:</b> ${formData.comment || 'Нет'}
📎 <b>Фото:</b> ${photos.length} шт.

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
      `;

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: textMessageMaster, parse_mode: 'HTML' }),
      });

      for (let i = 0; i < photos.length; i++) {
        const formDataPhoto = new FormData();
        formDataPhoto.append('chat_id', CHAT_ID);
        formDataPhoto.append('photo', photos[i]);
        formDataPhoto.append('caption', `📸 Фото ${i + 1}/${photos.length} от ${formData.name}`);

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
          method: 'POST',
          body: formDataPhoto,
        });
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setSubmitStatus('success');
      setFormData({ name: '', phone: '+7', carModel: '', comment: '' });
      setPhotos([]);
      setPreviews([]);

      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2500);
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-bg-element rounded-2xl w-full max-w-2xl shadow-2xl border border-white/10 overflow-hidden">
              {/* Заголовок */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <i className="fas fa-camera text-accent text-lg"></i>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">Оценить по фото</h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-bg-secondary hover:bg-accent hover:text-bg-primary text-text-secondary transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Контент с прокруткой и кастомным скроллбаром */}
              <div className="max-h-[calc(90vh-80px)] overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {/* Описание */}
                  <div className="bg-accent/5 rounded-xl p-4 border border-accent/10">
                    <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2">
                      <i className="fas fa-info-circle"></i>
                      <span>Как это работает</span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Загрузите фото повреждений, и мы предварительно оценим стоимость восстановления.
                      Мастер свяжется с вами в течение 15 минут.
                    </p>
                  </div>

                  {/* Имя */}
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      <i className="fas fa-user mr-2 text-accent"></i>
                      Ваше имя <span className="text-accent">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      placeholder="Как к вам обращаться?"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-text-primary text-sm transition-all"
                      required
                    />
                  </div>

                  {/* Телефон */}
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      <i className="fas fa-phone mr-2 text-accent"></i>
                      Телефон <span className="text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 bg-bg-secondary rounded-xl focus:outline-none focus:ring-2 text-text-primary text-sm transition-all ${phoneError ? 'focus:ring-error ring-1 ring-error/50' : 'focus:ring-accent'
                        }`}
                    />
                    {phoneError && <p className="text-error text-xs mt-2 flex items-center gap-1"><i className="fas fa-exclamation-circle"></i>{phoneError}</p>}
                  </div>

                  {/* Автомобиль */}
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      <i className="fas fa-car mr-2 text-accent"></i>
                      Марка и модель авто
                    </label>
                    <input
                      type="text"
                      placeholder="Например: BMW X5, 2020"
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      className="w-full px-4 py-3 bg-bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-text-primary text-sm transition-all"
                    />
                  </div>

                  {/* Комментарий */}
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      <i className="fas fa-comment mr-2 text-accent"></i>
                      Описание проблемы
                    </label>
                    <textarea
                      placeholder="Опишите, что нужно сделать (царапина, скол, вмятина и т.д.)"
                      rows={3}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full px-4 py-3 bg-bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-text-primary text-sm resize-none transition-all"
                    />
                  </div>

                  {/* Загрузка фото */}
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      <i className="fas fa-image mr-2 text-accent"></i>
                      Фото повреждений <span className="text-accent">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 border-2 border-dashed border-accent/40 rounded-xl text-accent hover:bg-accent/10 transition-all group"
                    >
                      <i className="fas fa-cloud-upload-alt text-2xl mb-2 block group-hover:scale-110 transition-transform"></i>
                      <span className="text-sm">Нажмите для загрузки фото</span>
                      <p className="text-text-secondary/50 text-xs mt-1">до {MAX_FILES} шт., до {formatFileSize(MAX_FILE_SIZE)}</p>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/heic"
                      multiple
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />

                    {previews.length > 0 && (
                      <div className="mt-4">
                        <p className="text-text-secondary text-xs mb-2">Загружено фото ({previews.length}/{MAX_FILES}):</p>
                        <div className="flex flex-wrap gap-3">
                          {previews.map((preview, idx) => (
                            <div key={idx} className="relative group/photo">
                              <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white/10 group-hover/photo:border-accent/50 transition-all">
                                <img src={preview} alt={`Превью ${idx + 1}`} className="w-full h-full object-cover" />
                              </div>
                              <button
                                type="button"
                                onClick={() => removePhoto(idx)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors shadow-lg"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <p className="text-text-secondary/40 text-[10px] mt-2">
                          Общий вес: {formatFileSize(photos.reduce((s, f) => s + f.size, 0))}
                        </p>
                      </div>
                    )}
                  </div>

                  {errorMessage && (
                    <div className="bg-error/10 rounded-xl p-3 border border-error/30">
                      <p className="text-error text-xs flex items-center gap-2">
                        <i className="fas fa-exclamation-triangle"></i>
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3 border border-text-secondary/30 rounded-xl hover:border-accent text-text-secondary hover:text-accent transition-all text-sm font-medium"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || photos.length === 0}
                      className={`flex-1 py-3 rounded-xl transition-all text-sm font-medium flex items-center justify-center gap-2 ${isSubmitting || photos.length === 0
                          ? 'bg-text-secondary/30 text-white/50 cursor-not-allowed'
                          : 'bg-accent hover:bg-accent-hover text-bg-primary hover:scale-105'
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Отправка...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane"></i>
                          Отправить на оценку
                        </>
                      )}
                    </button>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-success/20 rounded-xl p-4 border border-success/30">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-check-circle text-success text-xl"></i>
                        <div>
                          <p className="text-success font-medium">Заявка отправлена!</p>
                          <p className="text-text-secondary text-xs mt-1">Мастер свяжется с вами в ближайшее время.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-error/20 rounded-xl p-4 border border-error/30">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-exclamation-circle text-error text-xl"></i>
                        <div>
                          <p className="text-error font-medium">Ошибка отправки</p>
                          <p className="text-text-secondary text-xs mt-1">Попробуйте позже или напишите в Telegram: @rudenko_ds</p>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PhotoEstimateModal;