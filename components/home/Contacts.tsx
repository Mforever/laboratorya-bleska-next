'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useYandexGoal } from '@/hooks/useYandexGoal';
import { Icon } from '@/components/ui/Icon';

const ContactsHome: React.FC = () => {
  const { sendGoal } = useYandexGoal();

  const handlePhoneClick = () => {
    sendGoal('phone_click');
  };

  const handleTelegramClick = () => {
    sendGoal('tg_click');
  };

  const contactCards = [
    {
      id: 'address',
      icon: 'fa-map-marker-alt',
      title: 'Адрес',
      lines: ['Омск, Чкаловский м/р', 'ул. Индустриальная, 5Б'],
      workingHours: 'Ежедневно: 10:00–20:00',
      workingByAppointment: true,
      buttonText: 'Открыть на карте',
      buttonLink: 'https://yandex.ru/maps/org/laboratoriya_bleska/224582731097/',
      buttonAction: undefined
    },
    {
      id: 'phone',
      icon: 'fa-phone-alt',
      title: 'Телефон',
      lines: ['+7 (962) 055-58-58'],
      buttonText: 'Позвонить',
      buttonLink: 'tel:+79620555858',
      buttonAction: handlePhoneClick
    },
    {
      id: 'telegram',
      icon: 'fab fa-telegram',
      title: 'Telegram',
      lines: ['@rudenko_ds'],
      buttonText: 'Написать',
      buttonLink: 'https://t.me/rudenko_ds',
      buttonAction: handleTelegramClick
    }
  ];

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-2">
            Свяжитесь с нами
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Контакты</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-element rounded-xl p-6 hover:scale-105 transition-all duration-300 group h-full flex flex-col"
            >
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon name={card.icon} className="text-accent text-xl" />
                </div>
                <h3 className="font-bold text-lg mb-3">{card.title}</h3>
                <div className="mb-3">
                  {card.lines.map((line, i) => (
                    <p key={i} className="text-text-secondary text-sm">{line}</p>
                  ))}
                </div>
                {card.workingHours && (
                  <div className="mb-2">
                    <p className="text-text-secondary/70 text-xs">{card.workingHours}</p>
                    {card.workingByAppointment && (
                      <p className="text-accent text-xs mt-1">по предварительной записи</p>
                    )}
                  </div>
                )}
                <div className="mt-auto pt-2 w-full">
                  <a
                    href={card.buttonLink}
                    onClick={card.buttonAction}
                    className="block w-full py-2.5 px-3 bg-accent/10 hover:bg-accent hover:text-bg-primary text-accent text-sm font-medium rounded-lg transition-all duration-300 text-center"
                    target={card.buttonLink.startsWith('http') ? '_blank' : undefined}
                    rel={card.buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {card.buttonText}
                    <Icon name="fa-arrow-right" className="text-xs ml-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactsHome;