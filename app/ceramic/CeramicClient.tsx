'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useModalContext } from '@/contexts/ModalContext';
import Button from '@/components/ui/Button';
import PromoBlock from '@/components/ui/PromoBlock';
import { Icon } from '@/components/ui/Icon';

declare const ym: any;

export default function CeramicClient() {
  const router = useRouter();
  const { openModal } = useModalContext();

  const openBookingModal = (type?: 'base' | 'premium') => {
    openModal({
      serviceType: 'ceramic',
      serviceName: type === 'base' ? 'Керамика базовое покрытие' : type === 'premium' ? 'Керамика с обслуживанием' : 'Керамическое покрытие'
    });
  };

  const goToPPFCalculator = () => {
    sessionStorage.setItem('scrollToCalculator', 'true');
    router.push('/ppf');
  };

  const benefits = [
    { icon: 'fa-tint', title: 'Гидрофобный эффект', description: 'Вода скатывается шариками, авто дольше остается чистым' },
    { icon: 'fa-shield-alt', title: 'Защита от царапин', description: 'Твердость покрытия 9H защищает от мелких механических воздействий' },
    { icon: 'fa-sun', title: 'Защита от УФ', description: 'Предотвращает выгорание краски и старение ЛКП' },
    { icon: 'fa-flask', title: 'Химическая стойкость', description: 'Устойчивость к реагентам, битуму и птичьему помету' }
  ];

  const steps = [
    { number: '01', title: 'Подготовка', description: 'Мойка, обезжиривание, оклейка пластика и хрома' },
    { number: '02', title: 'Полировка', description: 'Удаление дефектов ЛКП для идеальной основы' },
    { number: '03', title: 'Обезжиривание', description: 'Специальным препаратом для лучшей адгезии' },
    { number: '04', title: 'Нанесение керамики', description: '2-3 слоя с промежуточной сушкой' },
    { number: '05', title: 'Кристаллизация', description: 'Покрытие сохнет 10-12 часов, после чего автомобиль готов к выдаче' }
  ];

  const technicalSpecs = [
    { param: 'Срок службы (макс.)', fc8: 'до 2 лет', fc15: 'до 50 моек' },
    { param: 'Химическая стойкость (pH)', fc8: '3-11', fc15: '3-11' },
    { param: 'Рекомендуемое кол-во слоёв', fc8: '2 слоя', fc15: '1 слоя' },
    { param: 'Подходит для пленки PPF', fc8: 'нет', fc15: 'да' }
  ];

  const faqs = [
    {
      question: 'Сколько реально держится керамика?',
      answer: 'Максимальный срок — до 2 лет для базового покрытия и до 5 лет для покрытия с ежегодным обслуживанием. Это максимальные сроки при идеальных условиях. Реалистично: 12-18 месяцев для базового, 3-4 года с обслуживанием. На срок влияют: уличное хранение (сокращает на 30-40%), агрессивная химия зимой, качество мойки.'
    },
    {
      question: 'В чём разница между FC8 и FC15?',
      answer: 'FC8 — профессиональное нанокерамическое покрытие для создания твёрдой гидрофобной основы с долговечностью до 2 лет. FC15 — это специализированный обслуживающий состав. Он не заменяет FC8, а дополняет его. FC15 совместим с защитными плёнками (PPF) и используется для ежегодного обновления покрытия — восстановления гидрофобных свойств и продления срока службы до 5 лет.'
    },
    {
      question: 'Что входит в ежегодное обслуживание?',
      answer: 'Осмотр и диагностика покрытия, мягкая мойка, безабразивная полировка (чистка) для удаления остатков старого состава, нанесение свежего слоя FC15 для восстановления гидрофобных свойств.'
    },
    {
      question: 'Почему цена зависит от размера авто?',
      answer: 'На внедорожник уходит больше материалов и времени на подготовку кузова, чем на легковой автомобиль. Это влияет на итоговую стоимость.'
    },
    {
      question: 'Как понять, что керамика перестала работать?',
      answer: 'Вода перестала собираться в шарики (гидрофобный эффект пропал), блеск стал тусклым, грязь начинает прилипать. Это значит, что защитный слой истощился и требует обновления.'
    },
    {
      question: 'Стоит ли защищать фары и капот дополнительно?',
      answer: (
        <>
          Да! Керамика защищает от ультрафиолета и реагентов, но от камней и сколов она не спасёт. Для максимальной защиты уязвимых зон рекомендуем бронирование плёнкой. Подробнее в статье{' '}
          <a href="/advice/headlights-yellowing-repair" className="text-accent hover:underline">Защита фар: почему это дешевле, чем замена</a>.
        </>
      )
    },
    {
      question: 'Как ухаживать за авто после керамики?',
      answer: (
        <>
          Первые 7 дней — нельзя мочить авто (период кристаллизации). После — только бесконтактная мойка или{' '}
          <a href="/advice/wrong-washing" className="text-accent hover:underline">ручная мойка по принципу двух вёдер</a>{' '}
          с мягкой микрофиброй. Также рекомендуем профессиональную 2-3 фазную мойку. Никогда не используйте щётки и абразивные средства. Подробнее о правильном уходе читайте в статье{' '}
          <a href="/advice/self-care-after-detailing" className="text-accent hover:underline">Как ухаживать за авто после детейлинга</a>.
        </>
      )
    }
  ];

  const fc8Image = '/images/hendlex-fc8.jpg';
  const fc15Image = '/images/hendlex-fc15.jpg';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-bg-primary overflow-x-hidden">
      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src="/images/ceramic-hero.jpg" alt="Керамическое покрытие" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/95 to-bg-primary/90" />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Услуга</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Керамическое покрытие</h1>
                <p className="text-text-secondary text-lg mb-8 max-w-2xl">Защита кузова от ультрафиолета, реагентов и мелких царапин. Гидрофобный эффект и глубокий блеск на годы.</p>
                <div className="flex flex-wrap gap-4">
                  <Button size="large" onClick={() => openBookingModal()}>Рассчитать стоимость</Button>
                  <Button variant="outline" size="large" onClick={() => router.push('/gallery')}>Смотреть работы</Button>
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-[400px] bg-black">
                <iframe src="https://vkvideo.ru/video_ext.php?oid=-99576867&id=456239037&hash=fcdd6247d4c3aa76&hd=4&autoplay=1&loop=1&mute=1" className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameBorder="0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Icon name="fa-tint" className="text-accent text-sm" /><span className="text-white text-xs">Гидрофобный эффект 115°</span></div>
                    <div className="flex items-center gap-2"><Icon name="fa-shield-alt" className="text-accent text-sm" /><span className="text-white text-xs">Защита до 5 лет</span></div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Что даёт керамика</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-bg-element rounded-xl p-5 md:p-6 text-center hover:scale-105 transition-all duration-300 flex flex-col h-full">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                  <Icon name={benefit.icon} className="text-accent text-xl" />
                </div>
                <h3 className="font-semibold mb-2 text-base md:text-lg break-words">{benefit.title}</h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed break-words hyphens-auto">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Фото составов */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Материалы</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Что мы используем</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Профессиональные составы Hendlex для надёжной защиты</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-bg-element rounded-xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all">
              <img src={fc8Image} alt="Hendlex FC8" className="w-full h-64 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-accent">Hendlex FC8</h3>
                <p className="text-text-secondary text-sm mb-3">Профессиональная нанокерамика для базового покрытия</p>
                <p className="text-text-secondary/60 text-xs">Профессиональная нанокерамика, которая создаёт «базу» — твердую, гидрофобную матрицу с максимальным блеском.</p>
              </div>
            </div>
            <div className="bg-bg-element rounded-xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all">
              <img src={fc15Image} alt="Hendlex FC15" className="w-full h-64 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-accent">Hendlex FC15</h3>
                <p className="text-text-secondary text-sm mb-3">Обслуживающий состав для ежегодного обновления покрытия</p>
                <p className="text-text-secondary/60 text-xs">FC15 — это специализированный обслуживающий состав, который совместим с защитными плёнками (PPF) и наносится поверх базы. Во время ежегодного обслуживания FC15 восстанавливает грязеотталкивающие свойства покрытия, фактически «омолаживая» его и продлевая общий срок службы до 5 лет.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Технические характеристики */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Технические данные</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Характеристики составов</h2>
          </motion.div>
          <div className="bg-bg-element rounded-xl overflow-hidden border border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-accent/30 bg-accent/5">
                    <th className="text-left py-3 px-4 text-text-primary">Параметр</th>
                    <th className="text-left py-3 px-4 text-accent">Hendlex FC8</th>
                    <th className="text-left py-3 px-4 text-accent/80">Hendlex FC15</th>
                  </tr>
                </thead>
                <tbody>
                  {technicalSpecs.map((spec, idx) => (
                    <tr key={idx} className="border-b border-white/10">
                      <td className="py-3 px-4 text-text-secondary text-sm">{spec.param}</td>
                      <td className="py-3 px-4 text-text-primary text-sm font-medium">{spec.fc8}</td>
                      <td className="py-3 px-4 text-text-primary text-sm">{spec.fc15}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Видео - пример работы */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 md:mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Пример работы</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Керамическое покрытие в действии</h2>
            <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto">Посмотрите, как выглядит автомобиль после нанесения керамики</p>
          </motion.div>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl mx-auto">
            <iframe src="https://vkvideo.ru/video_ext.php?oid=-99576867&id=456239032&hash=8ae3ee7e1b5e4e5c&hd=4&autoplay=1&loop=1&mute=1" className="absolute top-0 left-0 w-full h-full" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameBorder="0" />
          </div>
        </div>
      </section>

      {/* Два варианта покрытия */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Два варианта защиты</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Выберите подходящий</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Базовое покрытие до 2 лет или премиум-защита с ежегодным обслуживанием до 5 лет</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-bg-element rounded-2xl p-6 md:p-8 border border-white/10 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-text-primary">Базовое покрытие</h3>
                <span className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full">Hendlex FC8</span>
              </div>
              <p className="text-text-secondary text-sm mb-4">Однократное нанесение профессиональной нанокерамики</p>
              <div className="text-3xl font-bold text-accent mb-6">от 22 000 ₽</div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm"><Icon name="fa-check-circle" className="text-accent w-5" /><span>Срок службы: <span className="font-semibold">до 2 лет</span></span></div>
                <div className="flex items-center gap-2 text-sm"><Icon name="fa-check-circle" className="text-accent w-5" /><span>Гидрофобность: <span className="font-semibold">115°</span></span></div>
                <div className="flex items-center gap-2 text-sm"><Icon name="fa-check-circle" className="text-accent w-5" /><span>Защита от УФ и реагентов</span></div>
                <div className="flex items-center gap-2 text-sm"><Icon name="fa-check-circle" className="text-accent w-5" /><span>Насыщение цвета и глубокий блеск</span></div>
                <div className="flex items-center gap-2 text-sm"><Icon name="fa-check-circle" className="text-accent w-5" /><span>Обслуживание: <span className="font-semibold">не требуется</span></span></div>
              </div>
              <div className="bg-accent/5 rounded-lg p-3 mb-6 border border-accent/10">
                <p className="text-text-secondary text-xs"><span className="text-accent font-semibold">Честно о сроках:</span> Максимальный срок — до 2 лет. Реалистично: 12-18 месяцев при средних условиях эксплуатации.</p>
              </div>
              <button onClick={() => openBookingModal('base')} className="w-full py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all duration-300 hover:scale-105">Записаться</button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-bg-element rounded-2xl p-6 md:p-8 border border-white/10 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-text-primary">Премиум-защита</h3>
                <span className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full">FC8 + FC15</span>
              </div>
              <p className="text-text-secondary text-sm mb-4">Базовое покрытие + ежегодное обслуживание</p>
              <div className="text-3xl font-bold text-accent mb-6">от 32 000 ₽</div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm"><Icon name="fa-check-circle" className="text-accent w-5" /><span>Срок службы: <span className="font-semibold">до 5 лет</span></span></div>
                <div className="flex items-center gap-2 text-sm"><Icon name="fa-check-circle" className="text-accent w-5" /><span>Ежегодное обслуживание: <span className="font-semibold">включено</span></span></div>
                <div className="flex items-center gap-2 text-sm"><Icon name="fa-check-circle" className="text-accent w-5" /><span>Обновление гидрофобности каждый год</span></div>
                <div className="flex items-center gap-2 text-sm"><Icon name="fa-check-circle" className="text-accent w-5" /><span>Дефектовка и диагностика покрытия</span></div>
                <div className="flex items-center gap-2 text-sm"><Icon name="fa-check-circle" className="text-accent w-5" /><span>Гарантия гидрофобных свойств</span></div>
              </div>
              <div className="bg-accent/5 rounded-lg p-3 mb-6 border border-accent/10">
                <p className="text-text-secondary text-xs"><span className="text-accent font-semibold">Честно о сроках:</span> Максимальный срок — до 5 лет при ежегодном обслуживании. Реалистично: 3-4 года активной защиты.</p>
              </div>
              <button onClick={() => openBookingModal('premium')} className="w-full py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all duration-300 hover:scale-105">Записаться</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Таблица цен */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Цены</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Стоимость керамического покрытия</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Цена зависит от класса автомобиля и выбранного варианта защиты.</p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-accent/30">
                  <th className="text-left py-3 px-4 text-text-primary">Класс авто</th>
                  <th className="text-center py-3 px-4 text-text-primary">Базовое покрытие<br /><span className="text-xs text-text-secondary">Hendlex FC8</span></th>
                  <th className="text-center py-3 px-4 text-text-primary">Премиум-защита<br /><span className="text-xs text-text-secondary">FC8 + обслуживание FC15</span></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { class: 'Легковой (седан / хетчбэк)', base: '22 000 ₽', premium: '32 000 ₽', examples: 'Solaris, Rio, Polo, Rapid' },
                  { class: 'Бизнес-седан / Кроссовер', base: '28 000 ₽', premium: '38 000 ₽', examples: 'BMW 5, X3, E-класс, Camry, RAV4' },
                  { class: 'Внедорожник / Минивэн', base: '35 000 ₽', premium: '45 000 ₽', examples: 'Land Cruiser, BMW X5, X7, GLS, RX-350, Alphard' }
                ].map((item, idx) => (
                  <tr key={idx} className="border-b border-white/10 group hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4"><div className="text-text-primary">{item.class}</div><div className="text-text-secondary/50 text-xs mt-0.5">{item.examples}</div></td>
                    <td className="text-center py-3 px-4 text-accent font-semibold">{item.base}</td>
                    <td className="text-center py-3 px-4 text-accent font-semibold">{item.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <p className="text-text-secondary text-xs">* Ежегодное обслуживание для премиум-защиты: 8 000 ₽</p>
            <p className="text-text-secondary/50 text-xs mt-1">** Цены указаны с учётом подготовки кузова (полировка, обезжиривание, нанесение состава)</p>
          </div>
        </div>
      </section>

      {/* Как работает обслуживание */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-accent/5 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">Как работает обслуживание</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-bg-element rounded-xl p-5 md:p-6 text-center border border-white/10">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2"><span className="text-accent font-bold">1</span></div>
                <p className="font-semibold text-sm">Осмотр и диагностика</p>
                <p className="text-text-secondary text-xs mt-1">Оцениваем состояние покрытия</p>
              </div>
              <div className="bg-bg-element rounded-xl p-5 md:p-6 text-center border border-white/10">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2"><span className="text-accent font-bold">2</span></div>
                <p className="font-semibold text-sm">Подготовка и дефектовка</p>
                <p className="text-text-secondary text-xs mt-1">Мойка, чистка кузова</p>
              </div>
              <div className="bg-bg-element rounded-xl p-5 md:p-6 text-center border border-white/10">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2"><span className="text-accent font-bold">3</span></div>
                <p className="font-semibold text-sm">Нанесение состава</p>
                <p className="text-text-secondary text-xs mt-1">Восстановление гидрофобности</p>
              </div>
            </div>
            <p className="text-text-secondary text-xs text-center mt-4">Ежегодное обслуживание занимает 4-5 часа и продлевает жизнь покрытию до 5 лет</p>
          </motion.div>
        </div>
      </section>

      {/* Блок про защиту уязвимых зон */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-accent/5 rounded-2xl p-6 md:p-8 text-center">
            <Icon name="fa-shield-alt" className="text-accent text-3xl mb-4" />
            <h3 className="text-xl md:text-2xl font-bold mb-3">Керамика не защищает от сколов и камней</h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto text-sm">Керамическое покрытие отлично работает против ультрафиолета, реагентов и мелких царапин. Но от камней и сколов на трассе защитят только бронирование пленкой (PPF).</p>
            <div className="grid sm:grid-cols-2 gap-4 text-left mb-6">
              <div className="bg-bg-element rounded-xl p-5 md:p-6 text-center border border-white/10"><Icon name="fa-tint" className="text-accent mr-2" /> Керамика: отлично, но от камней — нет</div>
              <div className="bg-accent/20 rounded-xl p-4 border border-accent"><Icon name="fa-shield-alt" className="text-accent mr-2" /> Бронирование пленкой (PPF): максимальная защита</div>
            </div>
            <motion.button onClick={goToPPFCalculator} className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group mx-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span>Рассчитать бронирование</span>
              <motion.i className="fas fa-arrow-right text-sm" whileHover={{ x: 5 }} transition={{ duration: 0.2 }} />
            </motion.button>
            <p className="text-text-secondary/60 text-xs mt-3">Особенно рекомендуем забронировать фары, капот и передний бампер — самые уязвимые зоны</p>
          </motion.div>
        </div>
      </section>

      {/* Этапы нанесения */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Процесс</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Как мы работаем</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-bg-element rounded-xl p-4 md:p-6 text-center relative">
                <div className="text-2xl md:text-3xl font-bold text-accent/20 mb-2">{step.number}</div>
                <h3 className="font-semibold mb-2 text-sm">{step.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Акция */}
      <section className="py-12">
        <div className="container-custom">
          <PromoBlock
            description="Закажите керамическое покрытие и получите"
            highlight="бронирование мест под ручками в подарок"
            saving="Экономия до 3 000 ₽"
            onClick={() => {
              if (typeof ym !== 'undefined') ym(555983697, 'reachGoal', 'promo_complex');
              openModal({ serviceType: 'ceramic', serviceName: 'Керамическое покрытие' });
            }}
          />
        </div>
      </section>

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
                <div className="text-text-secondary text-xs md:text-sm leading-relaxed">{faq.answer}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Блок записи */}
      <section className="py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы защитить авто?</h2>
            <p className="text-text-secondary text-sm mb-8 max-w-2xl mx-auto">Оставьте заявку, и мы поможем подобрать оптимальное покрытие для вашего автомобиля</p>
            <button onClick={() => openBookingModal()} className="px-6 md:px-8 py-2 md:py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all hover:scale-105">Записаться онлайн</button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}