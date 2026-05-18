'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useModalContext } from '@/contexts/ModalContext';
import Button from '@/components/ui/Button';
import PromoBlock from '@/components/ui/PromoBlock';
import PhotoEstimateModal from '@/components/ui/PhotoEstimateModal';
import { useState } from 'react';

declare const ym: any;

export default function PolishClient() {
  const router = useRouter();
  const { openModal } = useModalContext();
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const openBookingModal = () => {
    openModal({ serviceType: 'polish', serviceName: 'Полировку' });
  };

  const goToPPFCalculator = () => {
    sessionStorage.setItem('scrollToCalculator', 'true');
    router.push('/ppf');
  };

  const benefits = [
    { icon: 'fas fa-brush', title: 'Глубокая очистка', description: 'Удаляем до 95% загрязнений, возвращаем первоначальный цвет' },
    { icon: 'fas fa-brush', title: 'Удаление царапин', description: 'Убираем паутину, голограммы и мелкие дефекты ЛКП' },
    { icon: 'fas fa-shield-alt', title: 'Защитный слой', description: 'Наносим защитную полироль для долговременного эффекта' },
    { icon: 'fas fa-gem', title: 'Глубокий блеск', description: 'Автомобиль сияет как новый, даже спустя месяцы' }
  ];

  const steps = [
    { number: '01', title: 'Мойка и подготовка', description: 'Тщательная бесконтактная мойка, удаление битума и обезжиривание' },
    { number: '02', title: 'Диагностика ЛКП', description: 'Измеряем толщину слоя, определяем глубину царапин' },
    { number: '03', title: 'Абразивная полировка', description: 'Удаляем верхний слой лака с царапинами специальными пастами' },
    { number: '04', title: 'Защитная полировка', description: 'Наносим финишный защитный слой для блеска' },
    { number: '05', title: 'Контроль качества', description: 'Проверяем результат под разными углами освещения' }
  ];

  const prices = [
    {
      car: 'Легковой (седан / хетчбэк)',
      price: 'от 10 000 ₽',
      examples: 'Solaris, Rio, Polo, Rapid'
    },
    {
      car: 'Бизнес-седан / Кроссовер',
      price: 'от 14 000 ₽',
      examples: 'BMW 5, Camry, RAV4, X3'
    },
    {
      car: 'Внедорожник / Минивэн',
      price: 'от 18 000 ₽',
      examples: 'Land Cruiser, X7, GLS, Alphard'
    },
    {
      car: 'Предпродажная полировка',
      price: '8 000 ₽',
      description: 'Освежение ЛКП перед продажей, удаление голограмм и паутины'
    }
  ];

  const faqs = [
    { question: 'Сколько держится полировка?', answer: 'При правильном уходе эффект сохраняется от 6 до 12 месяцев. Защитная полировка служит дольше, чем косметическая.' },
    { question: 'Не повредит ли полировка краску?', answer: 'Нет, мы используем профессиональные абразивные пасты и мягкие полировальные круги. Снимается только минимальный слой лака.' },
    { question: 'Как часто можно делать полировку?', answer: 'Рекомендуется не чаще 1-2 раз в год. Заводского лака хватает на 5-7 качественных полировок.' },
    { question: 'Стоит ли добавлять керамику после полировки?', answer: 'Да! Полировка восстанавливает блеск, а керамика сохраняет его на годы. Вместе они дают максимальный эффект и защиту.' },
    { question: 'Что делать с глубокими царапинами?', answer: 'Глубокие царапины могут потребовать локальной покраски. Но часто их можно скрыть полировкой или защитить пленкой, чтобы предотвратить коррозию.' },
    { question: 'Как понять, отполируется ли царапина?', answer: 'Намочите царапину водой — если она становится почти невидимой, полировка поможет. Не уверены? Отправьте фото, мы оценим бесплатно.' },
    { question: 'Нужна ли предварительная подготовка?', answer: 'Достаточно пригнать чистый автомобиль. Остальную подготовку мы берем на себя.' }
  ];

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-bg-primary overflow-x-hidden">
        {/* Hero секция с видео */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/polish-hero.jpg" alt="Полировка кузова" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/95 to-bg-primary/90" />
          </div>

          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-3xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Услуга</span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Полировка кузова</h1>
                  <p className="text-text-secondary text-lg mb-8 max-w-2xl">Вернем блеск и глубину цвета вашему автомобилю. Удалим царапины, паутину и голограммы.</p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="large" onClick={openBookingModal}>Записаться</Button>
                    <Button variant="outline" size="large" onClick={() => router.push('/gallery')}>Смотреть работы</Button>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-[400px]">
                  <iframe
                    src="https://vkvideo.ru/video_ext.php?oid=-99576867&id=456239036&hash=02a25e6b45df8abe&hd=4&autoplay=1&loop=1&mute=1"
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                    frameBorder="0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><i className="fas fa-brush text-accent text-sm"></i><span className="text-white text-xs">Глубокая полировка</span></div>
                      <div className="flex items-center gap-2"><i className="fas fa-gem text-accent text-sm"></i><span className="text-white text-xs">Восстановление блеска</span></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-20 bg-bg-secondary">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Преимущества</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Что вы получаете</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="bg-bg-element rounded-xl p-5 md:p-6 text-center hover:scale-105 transition-all duration-300 flex flex-col h-full">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                    <i className={`${benefit.icon} text-accent text-xl`}></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-base md:text-lg break-words">{benefit.title}</h3>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed break-words hyphens-auto">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Блок «Почему полировка без керамики — деньги на ветер?» */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-accent/5 rounded-2xl p-6 md:p-8 text-center">
              <i className="fas fa-question-circle text-accent text-3xl mb-4"></i>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Полировка без керамики — деньги на ветер?</h3>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto text-sm">Полировка возвращает блеск, но без защиты он уходит за 3-6 месяцев. Добавьте керамику — и блеск останется на годы!</p>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-left">
                <div className="bg-bg-element rounded-xl p-4"><i className="fas fa-times-circle text-error text-xl mb-2"></i><p className="font-semibold mb-1">Только полировка</p><p className="text-text-secondary text-sm">Блеск уходит через 3-6 месяцев. Нужно повторять раз в полгода.</p><p className="text-accent font-bold mt-2">≈ 10 000–20 000 ₽/год</p></div>
                <div className="bg-accent/20 rounded-xl p-4 border border-accent"><i className="fas fa-check-circle text-success text-xl mb-2"></i><p className="font-semibold mb-1">Полировка + Керамика</p><p className="text-text-secondary text-sm">Блеск и защита на 1-3 года. Экономия на повторных полировках.</p><p className="text-accent font-bold mt-2">≈ 20 000 ₽ на 3 года</p></div>
              </div>
              <button onClick={() => {
                if (typeof ym !== 'undefined') {
                  ym(555983697, 'reachGoal', 'form_submit');
                }
                openModal({ serviceType: 'ceramic', serviceName: 'Керамику' });
              }} className="mt-6 px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all">Хочу полировку + керамику</button>
            </motion.div>
          </div>
        </section>

        {/* Блок про защиту уязвимых зон */}
        <section className="py-16 bg-bg-secondary">
          <div className="container-custom max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-accent/5 rounded-2xl p-6 md:p-8 text-center">
              <i className="fas fa-shield-alt text-accent text-3xl mb-4"></i>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Защитите уязвимые зоны</h3>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto text-sm">Фары, капот и зеркала страдают от камней и реагентов больше всего. Бронирование этих зон продлит жизнь вашему авто и сэкономит бюджет.</p>
              <div className="grid sm:grid-cols-3 gap-4 text-left mb-6">
                <div className="bg-bg-element rounded-xl p-4 text-center"><i className="fas fa-car text-accent text-xl mb-2 block"></i><p className="font-semibold text-sm">Замена фары</p><p className="text-text-secondary text-xs">от 30 000 ₽</p></div>
                <div className="bg-bg-element rounded-xl p-4 text-center"><i className="fas fa-gem text-accent text-xl mb-2 block"></i><p className="font-semibold text-sm">Полировка фар</p><p className="text-text-secondary text-xs">от 3 000 ₽ (6-12 мес)</p></div>
                <div className="bg-accent/20 rounded-xl p-4 text-center border border-accent"><i className="fas fa-shield-alt text-accent text-xl mb-2 block"></i><p className="font-semibold text-sm">Бронирование фар</p><p className="text-text-secondary text-xs">от 5 000 ₽ (5-7 лет)</p></div>
              </div>
              <motion.button onClick={goToPPFCalculator} className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group mx-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <span>Рассчитать защиту зон</span>
                <motion.i className="fas fa-arrow-right text-sm" whileHover={{ x: 5 }} transition={{ duration: 0.2 }} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Этапы работы */}
        <section className="py-20">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Процесс</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Как мы работаем</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="bg-bg-element rounded-xl p-4 md:p-6 text-center relative">
                  <div className="text-2xl md:text-3xl font-bold text-accent/20 mb-2">{step.number}</div>
                  <h3 className="font-semibold mb-2 text-sm">{step.title}</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Таблица цен */}
        <section className="py-20 bg-bg-secondary">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Цены</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Стоимость полировки</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">Цена зависит от класса автомобиля и объема работ</p>
            </motion.div>

            <div className="overflow-x-auto mb-12">
              <div className="bg-bg-element rounded-xl overflow-hidden min-w-[280px]">
                {prices.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                    className={`flex justify-between items-center p-4 ${index < prices.length - 1 ? 'border-b border-white/5' : ''}`}>
                    <div>
                      <span className="text-text-primary text-sm md:text-base">{item.car}</span>
                      {item.examples && <div className="text-text-secondary/50 text-xs mt-0.5">{item.examples}</div>}
                      {item.description && <div className="text-text-secondary/50 text-xs mt-0.5">{item.description}</div>}
                    </div>
                    <span className="text-accent font-semibold text-sm md:text-base">{item.price}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Детальная полировка */}
            <div className="max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-accent/5 rounded-2xl p-6 md:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Полировка отдельных элементов кузова</h3>
                  <p className="text-text-secondary text-sm">Восстановление ЛКП на конкретных деталях</p>
                </div>
                <div className="bg-bg-element rounded-xl p-5">
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center border-b border-white/10 pb-3">
                      <div>
                        <span className="text-text-primary font-medium">Стандартный элемент</span>
                        <p className="text-text-secondary/60 text-xs mt-0.5">Дверь, крыло, бампер</p>
                      </div>
                      <span className="text-accent font-semibold">2 500 ₽</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <span className="text-text-primary font-medium">Крупный элемент</span>
                        <p className="text-text-secondary/60 text-xs mt-0.5">Капот, крыша — считаются как 2 элемента</p>
                      </div>
                      <span className="text-accent font-semibold">5 000 ₽</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Акция */}
        <PromoBlock
          description="Закажите полировку с керамикой и получите"
          highlight="бронирование мест под ручками в подарок"
          saving="Экономия до 3 000 ₽"
          onClick={() => {
            if (typeof ym !== 'undefined') {
              ym(555983697, 'reachGoal', 'promo_complex');
            }
            openModal({ serviceType: 'ceramic', serviceName: 'Керамику' });
          }}
        />

        {/* FAQ */}
        <section className="py-20 bg-bg-secondary">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Вопросы и ответы</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто спрашивают</h2>
            </motion.div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-bg-element rounded-xl p-5 md:p-6">
                  <h3 className="font-semibold mb-2 text-accent text-sm md:text-base">{faq.question}</h3>
                  <p className="text-text-secondary text-xs md:text-sm">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            {/* Кнопка «Оценить по фото» */}
            <div className="text-center mt-8 pt-4 border-t border-white/10">
              <button onClick={() => setShowPhotoModal(true)} className="inline-flex items-center gap-2 px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-lg transition-all text-sm">
                <i className="fas fa-camera"></i>
                Не уверены, нужна ли полировка? Отправьте фото на оценку
              </button>
              <p className="text-text-secondary/50 text-xs mt-2">Пришлите фото царапины — скажем, поможет ли полировка</p>
            </div>
          </div>
        </section>

        {/* Блок записи */}
        <section className="py-20">
          <div className="container-custom text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы записаться?</h2>
              <p className="text-text-secondary text-sm mb-8 max-w-2xl mx-auto">Оставьте заявку, и мы перезвоним в течение 15 минут, чтобы подобрать удобное время</p>
              <button onClick={openBookingModal} className="px-6 md:px-8 py-2 md:py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all hover:scale-105">Записаться онлайн</button>
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* Модальное окно оценки по фото */}
      <PhotoEstimateModal isOpen={showPhotoModal} onClose={() => setShowPhotoModal(false)} />
    </>
  );
}