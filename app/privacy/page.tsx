// app/privacy/page.tsx
'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg-primary pt-32 pb-20"
    >
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Политика конфиденциальности</h1>
          <p className="text-text-secondary">Дата последнего обновления: 1 января 2026 г.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <section className="bg-bg-element rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-accent">1. Общие положения</h2>
            <p className="mb-4">
              Настоящая политика обработки персональных данных составлена в соответствии с требованиями
              Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки
              персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые
              ИП Руденко Д.С. (далее – Оператор).
            </p>
            <p>
              1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение
              прав и свобод человека и гражданина при обработке его персональных данных.
            </p>
          </section>

          <section className="bg-bg-element rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-accent">2. Основные понятия</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Персональные данные — любая информация, относящаяся к прямо или косвенно определенному физическому лицу;</li>
              <li>Оператор — ИП Руденко Д.С., самостоятельно организующий обработку персональных данных;</li>
              <li>Обработка персональных данных — любое действие с персональными данными.</li>
            </ul>
          </section>

          <section className="bg-bg-element rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-accent">3. Контакты</h2>
            <p className="mb-2"><strong>Индивидуальный предприниматель:</strong> Руденко Дмитрий Сергеевич</p>
            <p className="mb-2"><strong>Телефон:</strong> <a href="tel:+79620555858" className="text-accent hover:underline">+7 (962) 055-58-58</a></p>
            <p><strong>Email:</strong> <a href="mailto:mforever040@gmail.com" className="text-accent hover:underline">mforever040@gmail.com</a></p>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
}