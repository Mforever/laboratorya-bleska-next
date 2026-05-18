// components/layout/Footer.tsx
'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const [showQr, setShowQr] = useState(false);
  const qrTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);
    if (clickTimer) clearTimeout(clickTimer);
    const timer = setTimeout(() => setClickCount(0), 3000);
    setClickTimer(timer);
    if (clickCount + 1 >= 5) {
      router.push('/x7k9m2');
      setClickCount(0);
    }
  };

  const handleQrMouseEnter = () => {
    if (qrTimerRef.current) clearTimeout(qrTimerRef.current);
    setShowQr(true);
  };

  const handleQrMouseLeave = () => {
    qrTimerRef.current = setTimeout(() => setShowQr(false), 300);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'Telegram', icon: 'fab fa-telegram-plane', url: 'https://t.me/rudenko_ds' },
    { name: 'VK Видео', icon: 'fab fa-vk', url: 'https://vkvideo.ru/@labofgloss' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com/labofgloss' }
  ];

  return (
    <footer className="bg-bg-secondary pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          <div className="space-y-4">
            <Logo variant="light" showText={true} />
            <p className="text-text-secondary text-sm leading-relaxed">
              Детейлинг студия в Омске. Возвращаем автомобилям идеальный блеск и надёжную защиту с 2015 года.
            </p>
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent hover:text-bg-primary text-accent flex items-center justify-center transition-all duration-300"
                  aria-label={social.name}>
                  <i className={`${social.icon} text-sm`}></i>
                </a>
              ))}
              <div className="relative" onMouseEnter={handleQrMouseEnter} onMouseLeave={handleQrMouseLeave}>
                <div className="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent hover:text-bg-primary text-accent flex items-center justify-center transition-all duration-300 cursor-pointer"
                  aria-label="MAX">
                  <i className="fas fa-qrcode text-sm"></i>
                </div>
                {showQr && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-bg-element rounded-xl shadow-xl border border-white/10 z-20 min-w-[140px]">
                    <div className="text-center mb-1">
                      <p className="text-text-secondary text-[10px]">Сканируйте QR-код</p>
                      <p className="text-accent text-xs font-semibold">Менеджер MAX</p>
                    </div>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://max.ru/u/f9LHodD0cOJNszC2FsgE7c6AFG1A-IPG3aEDkOzX_Se7QxrU0pncf-Lw4Q8"
                      alt="QR-код для MAX" className="w-24 h-24 mx-auto" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4 text-sm uppercase tracking-wider">Услуги</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('/polish')} className="text-text-secondary hover:text-accent text-sm transition-colors duration-200">Полировка кузова</button></li>
              <li><button onClick={() => handleNavigation('/ceramic')} className="text-text-secondary hover:text-accent text-sm transition-colors duration-200">Керамическое покрытие</button></li>
              <li><button onClick={() => handleNavigation('/ppf')} className="text-text-secondary hover:text-accent text-sm transition-colors duration-200">Бронирование пленкой</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4 text-sm uppercase tracking-wider">Информация</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('/gallery')} className="text-text-secondary hover:text-accent text-sm transition-colors duration-200">Наши работы</button></li>
              <li><button onClick={() => handleNavigation('/advice')} className="text-text-secondary hover:text-accent text-sm transition-colors duration-200">Советы экспертов</button></li>
              <li><button onClick={() => handleNavigation('/contacts')} className="text-text-secondary hover:text-accent text-sm transition-colors duration-200">Контакты</button></li>
              <li><button onClick={() => handleNavigation('/privacy')} className="text-text-secondary hover:text-accent text-sm transition-colors duration-200">Политика конфиденциальности</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4 text-sm uppercase tracking-wider">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><i className="fas fa-phone-alt text-accent text-xs mt-1 w-4 shrink-0"></i><a href="tel:+79620555858" className="text-text-secondary hover:text-accent text-sm transition-colors break-all">+7 (962) 055-58-58</a></li>
              <li className="flex items-start gap-3"><i className="fab fa-telegram text-accent text-xs mt-1 w-4 shrink-0"></i><a href="https://t.me/rudenko_ds" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent text-sm transition-colors">@rudenko_ds</a></li>
              <li className="flex items-start gap-3"><i className="fas fa-map-marker-alt text-accent text-xs mt-1 w-4 shrink-0"></i><span className="text-text-secondary text-sm leading-relaxed">Омск, Чкаловский м/р, ул. Индустриальная, 5Б</span></li>
              <li className="flex items-start gap-3"><i className="fas fa-clock text-accent text-xs mt-1 w-4 shrink-0"></i><span className="text-text-secondary text-sm">Ежедневно: 10:00 – 20:00</span></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6 text-text-secondary/50 text-xs">
          <p>© {currentYear} Лаборатория блеска. Все права защищены.</p>
          <div className="flex gap-4">
            <button onClick={() => handleNavigation('/privacy')} className="hover:text-accent transition-colors">Политика конфиденциальности</button>
            <span onClick={handleSecretClick} className="select-none cursor-pointer text-text-secondary/10 hover:text-text-secondary/30 text-[10px]">{currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;