// components/ui/Icon.tsx
'use client';

import {
  FaTint, FaShieldAlt, FaSun, FaFlask,
  FaBrush, FaGem, FaCheckCircle, FaArrowRight,
  FaCamera, FaCar, FaPhoneAlt, FaClock, FaMedal, FaHandshake,
  FaQuestion, FaReplyAll, FaInfoCircle, FaGift, FaTag,
  FaBox, FaList, FaHandPointer, FaSyncAlt, FaTrash, FaEye,
  FaHeart, FaRegHeart, FaUser, FaComment, FaImage, FaPaperPlane,
  FaSpinner, FaExclamationTriangle, FaExclamationCircle,
  FaChevronLeft, FaChevronRight, FaChevronDown, FaTimes,
  FaBars, FaPen, FaStar, FaQrcode, FaMapMarkerAlt, FaCheck,
  FaQuoteLeft, FaQuoteRight, FaPlay, FaPause, FaSearch,
  FaPlus, FaMinus, FaYandex, FaYandexInternational, FaGlobe, FaEnvelope,
  FaWhatsapp, FaViber, FaSkype, FaTools
} from 'react-icons/fa';
import {
  SiTelegram,
  SiInstagram,
  SiVk
} from 'react-icons/si';
// Для Яндекса используем FaYandex из react-icons/fa, он уже есть выше

// Карта иконок
export const icons = {
  // Основные иконки
  'fa-tint': FaTint,
  'fa-shield-alt': FaShieldAlt,
  'fa-sun': FaSun,
  'fa-flask': FaFlask,
  'fa-brush': FaBrush,
  'fa-gem': FaGem,
  'fa-check-circle': FaCheckCircle,
  'fa-arrow-right': FaArrowRight,
  'fa-camera': FaCamera,
  'fa-car': FaCar,
  'fa-phone-alt': FaPhoneAlt,
  'fa-clock': FaClock,
  'fa-medal': FaMedal,
  'fa-handshake': FaHandshake,
  'fa-question': FaQuestion,
  'fa-reply-all': FaReplyAll,
  'fa-info-circle': FaInfoCircle,
  'fa-gift': FaGift,
  'fa-tag': FaTag,
  'fa-box': FaBox,
  'fa-list': FaList,
  'fa-hand-pointer': FaHandPointer,
  'fa-sync-alt': FaSyncAlt,
  'fa-trash': FaTrash,
  'fa-eye': FaEye,
  'fa-heart': FaHeart,
  'fa-user': FaUser,
  'fa-comment': FaComment,
  'fa-image': FaImage,
  'fa-paper-plane': FaPaperPlane,
  'fa-spinner': FaSpinner,
  'fa-exclamation-triangle': FaExclamationTriangle,
  'fa-exclamation-circle': FaExclamationCircle,
  'fa-chevron-left': FaChevronLeft,
  'fa-chevron-right': FaChevronRight,
  'fa-chevron-down': FaChevronDown,
  'fa-times': FaTimes,
  'fa-bars': FaBars,
  'fa-pen': FaPen,
  'fa-star': FaStar,
  'fa-qrcode': FaQrcode,
  'fa-map-marker-alt': FaMapMarkerAlt,
  'fa-check': FaCheck,
  'fa-quote-left': FaQuoteLeft,
  'fa-quote-right': FaQuoteRight,
  'fa-play': FaPlay,
  'fa-pause': FaPause,
  'fa-search': FaSearch,
  'fa-plus': FaPlus,
  'fa-minus': FaMinus,
  'fa-yandex': FaYandex,
  'fa-yandex-international': FaYandexInternational,
  'fa-globe': FaGlobe,
  'fa-envelope': FaEnvelope,
  'fa-whatsapp': FaWhatsapp,
  'fa-viber': FaViber,
  'fa-skype': FaSkype,
  'fa-tools': FaTools,
  'far fa-heart': FaRegHeart,

  // Соцсети (бренды)
  'fab fa-telegram': SiTelegram,
  'fab fa-instagram': SiInstagram,
  'fab fa-vk': SiVk,
  // Для Яндекса используем обычную иконку
  'fab fa-yandex': FaYandex,
};

export const Icon: React.FC<{ name: string; className?: string; onClick?: () => void }> = ({
  name,
  className = '',
  onClick
}) => {
  const IconComponent = icons[name as keyof typeof icons];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return <IconComponent className={className} onClick={onClick} />;
};

export default Icon;