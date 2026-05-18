// hooks/useTelegram.ts
'use client';

import { useCallback } from 'react';

interface SendMessageParams {
  name: string;
  phone: string;
  car?: string;
  service?: string;
  message?: string;
  selectedZones?: string;
  totalPrice?: number;
}

const BOT_TOKEN = '7137488956:AAFiy0agx9ACesS-WC_nfUIYk_1Lzr-rwDY';
const CHAT_ID = '333843739';

export const useTelegram = () => {
  const sendMessage = useCallback(async (params: SendMessageParams): Promise<boolean> => {
    const { name, phone, car, service, message, selectedZones, totalPrice } = params;

    let text = `🔔 *Новая заявка с сайта!* 🔔\n\n`;
    text += `👤 *Имя:* ${name || 'Не указано'}\n`;
    text += `📞 *Телефон:* ${phone}\n`;
    if (car) text += `🚗 *Автомобиль:* ${car}\n`;
    if (service) text += `🛠️ *Услуга:* ${service}\n`;
    if (selectedZones) text += `📍 *Зоны:* ${selectedZones}\n`;
    if (totalPrice) text += `💰 *Сумма:* ${totalPrice.toLocaleString()} ₽\n`;
    if (message) text += `💬 *Сообщение:* ${message}\n`;

    text += `\n📅 *Дата:* ${new Date().toLocaleString('ru-RU')}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();
      return data.ok === true;
    } catch (error) {
      console.error('Telegram send error:', error);
      return false;
    }
  }, []);

  return { sendMessage };
};