'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useModalContext } from '@/contexts/ModalContext';
import Button from '@/components/ui/Button';
import CarProtectionCalculator from '@/components/ppf/CarProtectionCalculator';
import { useState, useEffect } from 'react';

declare const ym: any;

export default function PPFClient() {
  const router = useRouter();
  const { openModal } = useModalContext();
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem('scrollToCalculator');
    if (shouldScroll === 'true') {
      sessionStorage.removeItem('scrollToCalculator');
      setTimeout(() => {
        const calculator = document.getElementById('calculator');
        if (calculator) {
          calculator.scrollIntoView({ behavior: 'smooth', block: 'start' });
          calculator.classList.add('ring-2', 'ring-accent', 'ring-offset-2', 'ring-offset-bg-primary');
          setTimeout(() => {
            calculator.classList.remove('ring-2', 'ring-accent', 'ring-offset-2', 'ring-offset-bg-primary');
          }, 1500);
        }
      }, 300);
    }
  }, []);

  const openBookingModal = () => {
    if (typeof ym !== 'undefined') {
      ym(555983697, 'reachGoal', 'form_submit');
    }
    openModal({
      serviceType: 'ppf',
      serviceName: 'Бронирование пленкой',
      selectedZones: selectedZones,
      totalPrice: totalPrice
    });
  };

  const handleSelectionChange = (zones: string[], price: number) => {
    setSelectedZones(zones);
    setTotalPrice(price);
  };

  const scrollToCalculator = () => {
    const calculator = document.getElementById('calculator');
    if (calculator) {
      setIsScrolling(true);
      calculator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      calculator.classList.add('ring-2', 'ring-accent', 'ring-offset-2', 'ring-offset-bg-primary');
      setTimeout(() => {
        calculator.classList.remove('ring-2', 'ring-accent', 'ring-offset-2', 'ring-offset-bg-primary');
        setIsScrolling(false);
      }, 1000);
    }
  };

  const benefits = [
    { icon: 'fas fa-shield-alt', title: 'Защита от сколов', description: 'Пленка принимает удар камней и песка на себя' },
    { icon: 'fas fa-magic', title: 'Самовосстановление', description: 'Мелкие царапины исчезают при нагреве' },
    { icon: 'fas fa-sun', title: 'Защита от УФ', description: 'Предотвращает выгорание краски' },
    { icon: 'fas fa-flask', title: 'Химическая стойкость', description: 'Устойчивость к реагентам и битуму' }
  ];

  const steps = [
    { number: '01', title: 'Подготовка', description: 'Тщательная мойка и обезжиривание' },
    { number: '02', title: 'Раскрой пленки', description: 'Точный раскрой по лекалам авто' },
    { number: '03', title: 'Нанесение', description: 'Оклейка с использованием профессионального оборудования' },
    { number: '04', title: 'Фиксация', description: 'Прогрев и фиксация краев' },
    { number: '05', title: 'Контроль', description: 'Проверка качества и выдача авто' }
  ];

  const filmTypes = [
    { type: 'Базовая', description: 'Прозрачная защита', features: ['Защита от сколов', 'Срок службы 3 года', 'Глянцевый финиш'] },
    { type: 'Премиум', description: 'С эффектом самовосстановления', features: ['Самовосстановление', 'Срок службы 5 лет', 'Гидрофобный слой'] },
    { type: 'Матовая', description: 'Для матовых авто', features: ['Сохраняет матовость', 'Срок службы 5 лет', 'Усиленная защита'] }
  ];

  const faqs = [
    { q: 'Сколько служит защитная пленка?', a: 'Качественная пленка служит 5-7 лет. За это время она не желтеет и не теряет свойств.' },
    { q: 'Не повредит ли пленка краску при снятии?', a: 'Нет, профессиональная пленка снимается без следов, не повреждая заводской ЛКП.' },
    { q: 'Можно ли бронировать частично?', a: 'Да, вы можете выбрать только самые уязвимые зоны: капот, бампер, фары, зеркала.' },
    { q: 'Влияет ли пленка на внешний вид?', a: 'Современные пленки практически незаметны на кузове и не меняют цвет авто.' },
    { q: 'Как ухаживать за пленкой?', a: 'Достаточно обычной бесконтактной мойки. Избегайте абразивных средств.' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-bg-primary overflow-x-hidden">
      {/* Hero секция с видео */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/ppf-hero.jpg" alt="Бронирование пленкой" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/95 to-bg-primary/90" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Услуга</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Бронирование пленкой</h1>
                <p className="text-text-secondary text-lg mb-8 max-w-2xl">Надежная защита кузова от сколов, царапин и реагентов. Сохраним ваш автомобиль в идеальном состоянии.</p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    onClick={scrollToCalculator}
                    className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Рассчитать стоимость</span>
                    <motion.i className="fas fa-arrow-right text-sm" />
                  </motion.button>
                  <Button variant="outline" size="large" onClick={() => router.push('/gallery')}>
                    Смотреть работы
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    src="https://vkvideo.ru/video_ext.php?oid=-99576867&id=456239035&hash=e7efa9a2106eee07&hd=4&autoplay=1&loop=1&mute=1"
                    className="absolute top-0 left-0 w-full h-full"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                    frameBorder="0"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><i className="fas fa-shield-alt text-accent text-sm"></i><span className="text-white text-xs">Защита от сколов</span></div>
                    <div className="flex items-center gap-2"><i className="fas fa-magic text-accent text-sm"></i><span className="text-white text-xs">Самовосстановление</span></div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему стоит бронировать</h2>
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

      {/* Типы пленок */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Материалы</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Виды защитных пленок</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filmTypes.map((film, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-bg-element rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-accent">{film.type}</h3>
                <p className="text-text-secondary text-sm mb-4">{film.description}</p>
                <ul className="space-y-2">
                  {film.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-secondary text-sm">
                      <i className="fas fa-check text-accent text-xs mt-1"></i>
                      <span className="break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Калькулятор */}
      <section id="calculator" className="py-20 bg-bg-secondary scroll-mt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Калькулятор</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Рассчитайте стоимость бронирования</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Выберите зоны на схеме автомобиля, и мы мгновенно рассчитаем цену</p>
          </motion.div>
          <CarProtectionCalculator onSelectionChange={handleSelectionChange} />
        </div>
      </section>

      {/* Блок записи */}
      <section className="py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы защитить авто?</h2>
            <p className="text-text-secondary text-sm mb-8 max-w-2xl mx-auto">
              {selectedZones.length > 0
                ? `Вы выбрали ${selectedZones.length} зон на сумму ${totalPrice.toLocaleString()} ₽`
                : 'Оставьте заявку, и мы поможем подобрать оптимальную защиту для вашего автомобиля'
              }
            </p>
            <button
              onClick={openBookingModal}
              className="px-6 md:px-8 py-2 md:py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all hover:scale-105"
            >
              {selectedZones.length > 0 ? 'Оформить заказ' : 'Записаться онлайн'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Вопросы и ответы</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто спрашивают</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-bg-element rounded-xl p-5 md:p-6">
                <h3 className="font-semibold mb-2 text-accent text-sm md:text-base break-words">{faq.q}</h3>
                <p className="text-text-secondary text-xs md:text-sm leading-relaxed break-words hyphens-auto">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}