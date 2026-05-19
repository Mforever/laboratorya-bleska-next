'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalContext } from '@/contexts/ModalContext';
import { Icon } from '@/components/ui/Icon';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const { openModal } = useModalContext();

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'Сколько времени занимает детейлинг?',
      answer: 'Полировка: 1-2 дня, керамика: 2-3 дня, бронирование: 3-5 дней. Точные сроки после осмотра авто.'
    },
    {
      id: 2,
      question: 'Нужна ли предварительная запись?',
      answer: 'Да, мы работаем только по записи. Это гарантирует качество и внимание к каждому авто.'
    },
    {
      id: 3,
      question: 'Как часто можно делать полировку?',
      answer: '1-2 раза в год. Заводского лака хватает на 5-7 качественных полировок.'
    },
    {
      id: 4,
      question: 'Сколько держится керамика?',
      answer: 'От 1 года до 5 лет в зависимости от состава. Используем премиум-материалы.'
    },
    {
      id: 5,
      question: 'Защищает ли керамика от сколов?',
      answer: 'От мелких царапин — да. От крупных камней лучше использовать пленку.'
    },
    {
      id: 6,
      question: 'Сколько служит защитная пленка?',
      answer: '5-7 лет. Не желтеет, не трескается, легко моется.'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const openModalHandler = () => {
    openModal({ serviceType: 'general', serviceName: 'консультацию' });
  };

  return (
    <section className="py-20 bg-bg-primary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-3">
            Ответы на вопросы
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Часто спрашивают</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.id * 0.05 }}
                className="bg-bg-element/50 rounded-xl overflow-hidden border border-white/5 hover:border-accent/20 transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Icon name="fa-question" className="text-accent text-xs" />
                    </div>
                    <span className="font-medium text-text-primary text-base md:text-lg">
                      {item.question}
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center transition-all duration-300 ${openId === item.id ? 'rotate-180 bg-accent/20' : ''}`}>
                    <Icon name="fa-chevron-down" className="text-accent text-xs" />
                  </div>
                </button>

                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2 text-text-secondary text-sm border-t border-white/5">
                        <div className="flex gap-3">
                          <div className="w-6 h-6 flex-shrink-0">
                            <i className="fas fa-reply-all text-accent/50 text-xs"></i>
                          </div>
                          <p className="leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={openModalHandler}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm group"
            >
              <span>Остались вопросы? Задайте их нам</span>
              <i className="fas fa-arrow-right text-xs group-hover:translate-x-0.5 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;