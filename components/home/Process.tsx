'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useModalContext } from '@/contexts/ModalContext';

const Process: React.FC = () => {
  const { openModal } = useModalContext();

  const steps = [
    {
      number: '01',
      title: 'Заявка',
      description: 'Оставьте заявку на сайте или позвоните нам, чтобы обсудить вашу задачу',
      icon: 'fas fa-pen'
    },
    {
      number: '02',
      title: 'Осмотр и диагностика',
      description: 'Проведем диагностику, оценим состояние авто и составим план работ',
      icon: 'fas fa-search'
    },
    {
      number: '03',
      title: 'Согласование',
      description: 'Подберем оптимальный вариант, согласуем стоимость и сроки',
      icon: 'fas fa-handshake'
    },
    {
      number: '04',
      title: 'Выполнение работ',
      description: 'Проведем все работы с гарантией качества и вниманием к деталям',
      icon: 'fas fa-tools'
    },
    {
      number: '05',
      title: 'Выдача авто',
      description: 'Вы получите автомобиль с идеальным блеском и защитой',
      icon: 'fas fa-car'
    }
  ];

  const openModalHandler = () => {
    openModal({ serviceType: 'general', serviceName: 'услугу' });
  };

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
            Как мы работаем
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Процесс работы</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base">
            От заявки до выдачи автомобиля — мы контролируем каждый этап
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-bg-element rounded-xl p-5 text-center hover:scale-105 transition-all duration-300 flex flex-col h-full"
            >
              <div className="text-3xl font-bold text-accent/20 mb-3">{step.number}</div>
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${step.icon} text-accent text-xl`}></i>
              </div>
              <h3 className="font-semibold mb-2 text-base md:text-lg">{step.title}</h3>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed mt-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            onClick={openModalHandler}
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg font-medium transition-all hover:scale-105 text-sm"
          >
            Записаться онлайн
          </button>
          <p className="text-text-secondary/60 text-xs mt-3">
            Бесплатная консультация по вашему автомобилю
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;