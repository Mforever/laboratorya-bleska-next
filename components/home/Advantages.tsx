'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

const ADVANTAGES = [
  {
    icon: 'fa-shield-alt',
    title: 'Профессиональное оборудование',
    description: 'Работаем на оборудовании RUPES и 3M'
  },
  {
    icon: 'fa-clock',
    title: 'Соблюдаем сроки',
    description: 'Сдаем авто вовремя, без задержек'
  },
  {
    icon: 'fa-medal',
    title: '5 лет на рынке',
    description: 'Опыт работы с премиальными авто'
  },
  {
    icon: 'fa-handshake',
    title: 'Гарантия качества',
    description: 'Даем гарантию на все виды работ'
  }
];

const Advantages: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Почему выбирают нас
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {ADVANTAGES.map((advantage, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-bg-element rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 flex flex-col h-full group"
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Icon
                  name={advantage.icon as any}
                  className="text-2xl text-bg-primary"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 break-words">{advantage.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed break-words hyphens-auto">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Advantages;