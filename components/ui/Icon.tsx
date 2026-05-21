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
  FaBars, FaPen, FaStar, FaQrcode, FaMapMarkerAlt, FaCheck, FaNewspaper,
  FaQuoteLeft, FaQuoteRight, FaPlay, FaPause, FaSearch,
  FaPlus, FaMinus, FaYandex, FaYandexInternational, FaGlobe, FaEnvelope,
  FaWhatsapp, FaViber, FaSkype, FaTools, FaMagic,
  FaTelegram
} from 'react-icons/fa';
import {
  SiTelegram,
  SiInstagram,
  SiVk
} from 'react-icons/si';

// Карта иконок
export const icons: Record<string, any> = {
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
  'fa-bars': FaBars,  // ← Убедитесь, что эта строка есть
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
  'fa-magic': FaMagic,
  'fa-newspaper': FaNewspaper,
  'fa-telegram': FaTelegram,

  // Соцсети (бренды)
  'fab fa-telegram': SiTelegram,
  'fab fa-instagram': SiInstagram,
  'fab fa-vk': SiVk,
  'fab fa-yandex': FaYandex,
};

export const Icon: React.FC<{ name: string; className?: string; onClick?: () => void }> = ({
  name,
  className = '',
  onClick
}) => {
  const IconComponent = icons[name];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return <span className={className}>☰</span>; // Запасной вариант
  }
  return <IconComponent className={className} onClick={onClick} />;
};

export default Icon;