'use client';

import { motion } from 'framer-motion';
import { useYandexGoal } from '@/hooks/useYandexGoal';

export default function ContactsPage() {
  const { sendGoal } = useYandexGoal();

  const handlePhoneClick = () => sendGoal('phone_click');
  const handleTelegramClick = () => sendGoal('tg_click');

  const contactCards = [
    { id: 'address', icon: 'fas fa-map-marker-alt', title: 'Адрес', lines: ['Омск, Чкаловский м/р', 'ул. Индустриальная, 5Б'], workingHours: 'Ежедневно: 10:00–20:00', workingByAppointment: true, buttonText: 'Открыть на карте', buttonLink: 'https://yandex.ru/maps/org/laboratoriya_bleska/224582731097/', buttonAction: undefined },
    { id: 'phone', icon: 'fas fa-phone-alt', title: 'Телефон', lines: ['+7 (962) 055-58-58'], buttonText: 'Позвонить', buttonLink: 'tel:+79620555858', buttonAction: handlePhoneClick },
    { id: 'telegram', icon: 'fab fa-telegram', title: 'Telegram', lines: ['@rudenko_ds'], buttonText: 'Написать', buttonLink: 'https://t.me/rudenko_ds', buttonAction: handleTelegramClick }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-bg-primary pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">Свяжитесь с нами</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
          <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactCards.map((card, index) => (
            <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="bg-bg-element rounded-xl p-6 hover:scale-105 transition-all duration-300 group h-full flex flex-col">
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <i className={`${card.icon} text-accent text-xl`}></i>
                </div>
                <h3 className="font-bold text-lg mb-3">{card.title}</h3>
                <div className="mb-3">{card.lines.map((line, i) => (<p key={i} className="text-text-secondary text-sm">{line}</p>))}</div>
                {card.workingHours && (<div className="mb-2"><p className="text-text-secondary/70 text-xs">{card.workingHours}</p>{card.workingByAppointment && (<p className="text-accent text-xs mt-1">по предварительной записи</p>)}</div>)}
                <div className="mt-auto pt-2 w-full">
                  <a href={card.buttonLink} onClick={card.buttonAction} className="block w-full py-2.5 px-3 bg-accent/10 hover:bg-accent hover:text-bg-primary text-accent text-sm font-medium rounded-lg transition-all duration-300 text-center" target={card.buttonLink.startsWith('http') ? '_blank' : undefined} rel={card.buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {card.buttonText}<i className="fas fa-arrow-right text-xs ml-2"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-bg-element rounded-xl p-2">
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
            <iframe src="https://yandex.ru/map-widget/v1/?z=17&ol=biz&oid=224582731097" width="100%" height="100%" frameBorder="0" allowFullScreen title="Лаборатория блеска на карте" className="w-full h-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}