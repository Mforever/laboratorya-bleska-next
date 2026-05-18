// components/ui/ModalForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegram } from '@/hooks/useTelegram';
import { useYandexGoal } from '@/hooks/useYandexGoal';
import { useRouter } from 'next/navigation';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType?: 'polish' | 'ceramic' | 'ppf' | 'general';
  serviceName?: string;
  selectedZones?: string[];
  totalPrice?: number;
}

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  serviceType = 'general',
  serviceName = 'услугу',
  selectedZones = [],
  totalPrice = 0
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '+7',
    car: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const { sendMessage } = useTelegram();
  const { sendGoal } = useYandexGoal();

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', phone: '+7', car: '', message: '' });
      setPhoneTouched(false);
      setPhoneError(null);
      setSubmitStatus(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const getDigitsCount = (): number => {
    const digits = formData.phone.replace(/\D/g, '').slice(1);
    return digits.length;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (!value.startsWith('+7')) {
      value = '+7';
    }

    const cleaned = value.replace(/[^\d+]/g, '');

    let formatted = '+7';
    const digits = cleaned.slice(2).replace(/\D/g, '').slice(0, 10);

    if (digits.length > 0) {
      formatted += ' ' + digits.slice(0, 3);
    }
    if (digits.length > 3) {
      formatted += ' ' + digits.slice(3, 6);
    }
    if (digits.length > 6) {
      formatted += ' ' + digits.slice(6, 8);
    }
    if (digits.length > 8) {
      formatted += ' ' + digits.slice(8, 10);
    }

    setFormData({ ...formData, phone: formatted });
    setPhoneTouched(true);

    const digitsOnly = formatted.replace(/\D/g, '');
    if (digitsOnly.length !== 11) {
      setPhoneError('Введите 10 цифр после +7');
    } else {
      setPhoneError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length !== 11) {
      setPhoneError('Введите полный номер телефона');
      setPhoneTouched(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    let serviceDisplayName = '';
    switch (serviceType) {
      case 'polish':
        serviceDisplayName = 'Полировка кузова';
        break;
      case 'ceramic':
        serviceDisplayName = 'Керамическое покрытие';
        break;
      case 'ppf':
        serviceDisplayName = 'Бронирование пленкой';
        break;
      default:
        serviceDisplayName = serviceName;
    }

    const success = await sendMessage({
      name: formData.name,
      phone: formData.phone,
      car: formData.car,
      service: serviceType !== 'general' ? serviceType : undefined,
      message: formData.message || `Запись на ${serviceDisplayName}`,
      selectedZones: selectedZones.join(', '),
      totalPrice: totalPrice
    });

    if (success) {
      sendGoal('form_submit', {
        service_type: serviceType,
        service_name: serviceDisplayName,
        total_price: totalPrice,
        order_price: totalPrice,
        currency: 'RUB'
      });

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const getTitle = () => {
    switch (serviceType) {
      case 'polish':
        return 'Запись на полировку';
      case 'ceramic':
        return 'Запись на керамику';
      case 'ppf':
        return 'Запись на бронирование';
      default:
        return `Запись на ${serviceName}`;
    }
  };

  const renderSelectedZones = () => {
    if (selectedZones.length === 0) return null;

    const zonesList = selectedZones.slice(0, 4).join(', ');
    const remainingCount = selectedZones.length - 4;

    return (
      <div className="px-6 pt-4">
        <div className="bg-accent/5 rounded-lg p-3 border border-accent/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Выбрано зон:</span>
            <span className="text-accent font-medium">{selectedZones.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-text-secondary">Сумма:</span>
            <span className="text-accent font-medium">{totalPrice.toLocaleString()} ₽</span>
          </div>
          <div className="text-text-secondary/60 text-xs mt-2">
            {zonesList}
            {remainingCount > 0 && ` и ещё ${remainingCount}`}
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-bg-element rounded-xl w-full max-w-md pointer-events-auto shadow-2xl border border-white/5 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h2 className="text-lg font-semibold text-text-primary">
                  {getTitle()}
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-white/5 text-text-secondary hover:text-accent transition-colors flex items-center justify-center"
                  aria-label="Закрыть"
                >
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>

              {renderSelectedZones()}

              <div className="px-6 pt-4">
                <div className="flex items-center gap-2 text-xs text-text-secondary/70">
                  <i className="fab fa-telegram text-accent"></i>
                  <span>Сообщение в Telegram · ответ 5-15 минут</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя *"
                    required
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-text-primary placeholder-text-secondary/50 text-sm transition-all"
                  />
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onFocus={() => setPhoneTouched(true)}
                      className={`w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 text-text-primary font-mono text-base tracking-wider transition-all ${phoneTouched && phoneError
                        ? 'focus:ring-error/50 ring-1 ring-error/30'
                        : phoneTouched && !phoneError && formData.phone !== '+7' && getDigitsCount() === 10
                          ? 'focus:ring-success/50 ring-1 ring-success/30'
                          : 'focus:ring-accent/50'
                        }`}
                      placeholder="+7 (___) ___-__-__"
                      maxLength={16}
                    />

                    {formData.phone !== '+7' && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        <span className={`text-xs ${getDigitsCount() === 10 ? 'text-success' : 'text-text-secondary'}`}>
                          {getDigitsCount()}/10
                        </span>
                      </div>
                    )}
                  </div>
                  {phoneTouched && phoneError && (
                    <p className="text-error/80 text-xs mt-1">{phoneError}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.car}
                    onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                    placeholder="Марка и модель авто"
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-text-primary placeholder-text-secondary/50 text-sm transition-all"
                  />
                </div>

                <div>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ваш вопрос (необязательно)"
                    rows={2}
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-text-primary placeholder-text-secondary/50 text-sm resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.phone || formData.phone === '+7' || !!phoneError}
                  className="w-full py-3 bg-accent hover:bg-accent-hover text-bg-primary font-medium rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-spinner fa-spin"></i>
                      Отправка...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fab fa-telegram group-hover:scale-110 transition-transform"></i>
                      Отправить
                    </span>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-success/90 text-xs text-center flex items-center justify-center gap-1 p-2 bg-success/10 rounded-lg"
                  >
                    <i className="fas fa-check-circle"></i>
                    Заявка отправлена! Ответим в ближайшее время.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-error/90 text-xs text-center flex items-center justify-center gap-1 p-2 bg-error/10 rounded-lg"
                  >
                    <i className="fas fa-exclamation-circle"></i>
                    Ошибка. Попробуйте позже.
                  </motion.div>
                )}
              </form>

              <div className="px-6 pb-6">
                <p className="text-xs text-text-secondary/40 text-center">
                  Нажимая кнопку, вы соглашаетесь с
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        router.push('/privacy');
                      }, 300);
                    }}
                    className="text-accent/70 hover:text-accent transition-colors ml-1"
                  >
                    политикой конфиденциальности
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalForm;