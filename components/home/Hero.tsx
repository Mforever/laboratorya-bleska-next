'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '../ui/Button';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[600px]">
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/hero-background.webp" type="image/webp" />
          <Image
            src="/images/hero-background.jpg"
            alt="Детейлинг студия фон"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={75}
            className="object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/70 via-bg-primary/60 to-bg-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 via-transparent to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Снова <span className="text-accent">как новый</span>
            </h1>
            <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Вернем блеск нового авто. Полировка, керамика, бронирование в Омске
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="large" onClick={() => router.push('/polish')}>Полировка</Button>
              <Button variant="outline" size="large" onClick={() => router.push('/ceramic')}>Керамика</Button>
              <Button variant="outline" size="large" onClick={() => router.push('/ppf')}>Бронирование</Button>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-md mx-auto lg:mx-0">
              <div><div className="text-2xl font-bold text-accent">10+</div><div className="text-sm text-text-secondary/80">лет опыта</div></div>
              <div><div className="text-2xl font-bold text-accent">5</div><div className="text-sm text-text-secondary/80">мастеров</div></div>
              <div><div className="text-2xl font-bold text-accent">300+</div><div className="text-sm text-text-secondary/80">клиентов</div></div>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}