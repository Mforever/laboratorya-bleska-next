'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  const handleServiceClick = (path: string) => {
    router.push(path);
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[600px]">
      {/* Фоновое изображение с оптимизацией */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background.jpg"
          alt="Детейлинг студия фон"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/70 via-bg-primary/60 to-bg-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 via-transparent to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Снова <span className="text-accent">как новый</span>
            </h1>
            <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Вернем блеск нового авто. Полировка, керамика, бронирование в Омске
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="large" onClick={() => handleServiceClick('/polish')}>Полировка</Button>
              <Button variant="outline" size="large" onClick={() => handleServiceClick('/ceramic')}>Керамика</Button>
              <Button variant="outline" size="large" onClick={() => handleServiceClick('/ppf')}>Бронирование</Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left"><div className="text-2xl font-bold text-accent">10+</div><div className="text-sm text-text-secondary/80">лет опыта</div></div>
              <div className="text-center lg:text-left"><div className="text-2xl font-bold text-accent">5</div><div className="text-sm text-text-secondary/80">мастеров</div></div>
              <div className="text-center lg:text-left"><div className="text-2xl font-bold text-accent">300+</div><div className="text-sm text-text-secondary/80">клиентов</div></div>
            </div>
          </motion.div>
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;