'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useModalContext } from '@/contexts/ModalContext';

export interface CarZone {
  id: string;
  name: string;
  priceFrom: number;
  priceTo?: number;
  category: 'front' | 'rear' | 'sides' | 'roof';
  description: string;
  note?: string;
  popular?: boolean;
}

interface Package {
  id: string;
  name: string;
  description: string;
  zones: string[];
  price: number;
  discount: number;
  popular?: boolean;
  icon: string;
}

// --- ЗОНЫ ---
export const CAR_ZONES: CarZone[] = [
  { id: 'hood', name: 'Капот целиком', priceFrom: 15000, category: 'front', description: 'Полная защита всей поверхности капота', popular: true },
  { id: 'hood_stripe', name: 'Полоса на капот', priceFrom: 8000, category: 'front', description: 'Защита передней кромки капота (30-40 см)' },
  { id: 'bumper_front', name: 'Передний бампер', priceFrom: 17000, category: 'front', description: 'Полная защита переднего бампера', popular: true },
  { id: 'fenders_front', name: 'Передние крылья', priceFrom: 18000, category: 'front', description: 'Полная защита обоих передних крыльев' },
  { id: 'fenders_front_partial', name: 'Крылья (частично)', priceFrom: 8000, category: 'front', description: 'Защита передней ударной части крыльев (около 30 см)' },
  { id: 'headlights', name: 'Фары', priceFrom: 5000, category: 'front', description: 'Защита головной оптики', popular: true },
  { id: 'fog_lights', name: 'ПТФ', priceFrom: 3000, category: 'front', description: 'Защита противотуманных фар' },
  { id: 'grille', name: 'Решетка радиатора', priceFrom: 3000, category: 'front', description: 'Защита хромированных/окрашенных элементов' },
  { id: 'pillars', name: 'Стойки лобового стекла', priceFrom: 6000, category: 'front', description: 'Защита A-стоек', popular: true },
  { id: 'mirrors', name: 'Зеркала', priceFrom: 4000, category: 'front', description: 'Защита корпусов зеркал', popular: true },

  { id: 'roof_stripe_front', name: 'Полоса над лобовым стеклом', priceFrom: 4000, category: 'roof', description: 'Защита передней кромки крыши (30-40 см). Самая популярная защита крыши' },
  { id: 'roof', name: 'Крыша целиком', priceFrom: 16000, category: 'roof', description: 'Полная защита крыши' },

  { id: 'trunk', name: 'Багажник', priceFrom: 5000, category: 'rear', description: 'Полная защита крышки багажника' },
  { id: 'bumper_rear', name: 'Задний бампер', priceFrom: 15000, category: 'rear', description: 'Полная защита заднего бампера', popular: true },
  { id: 'taillights', name: 'Задние фонари', priceFrom: 5000, category: 'rear', description: 'Защита задней оптики' },
  { id: 'fenders_rear', name: 'Задние крылья', priceFrom: 18000, category: 'rear', description: 'Защита задних крыльев' },

  { id: 'doors', name: 'Двери', priceFrom: 36000, category: 'sides', description: 'Полная защита всех дверей' },
  { id: 'handles', name: 'Ручки дверей', priceFrom: 3000, category: 'sides', description: 'Защита пространства под ручками' },
  { id: 'rockers', name: 'Пороги', priceFrom: 6000, priceTo: 15000, category: 'sides', description: 'Защита порогов', note: 'Цена зависит от сложности' },
];

// --- ПАКЕТЫ ---
const PACKAGES: Package[] = [
  {
    id: 'base',
    name: 'Базовый',
    description: 'Защита самых уязвимых мест — оптимальный старт',
    icon: 'fas fa-shield',
    zones: ['hood_stripe', 'bumper_front', 'headlights', 'mirrors'],
    price: 26000,
    discount: 5,
  },
  {
    id: 'optimal',
    name: 'Оптимальный',
    description: 'Полный капот без видимых границ + оптика + зеркала',
    icon: 'fas fa-car',
    popular: true,
    zones: ['hood', 'bumper_front', 'headlights', 'fog_lights', 'mirrors'],
    price: 39000,
    discount: 8,
  },
  {
    id: 'extended',
    name: 'Расширенный',
    description: 'Оптимальный + крылья + стойки + полоса на крышу',
    icon: 'fas fa-gem',
    zones: ['hood', 'bumper_front', 'fenders_front', 'headlights', 'fog_lights', 'mirrors', 'pillars', 'roof_stripe_front'],
    price: 62000,
    discount: 10,
  },
];

// --- КОМПОНЕНТ СХЕМЫ ---
const CarSchemeImage: React.FC = () => (
  <div className="relative">
    <img
      src="/images/car-scheme-all.jpg"
      alt="Схема зон бронирования"
      className="w-full h-auto rounded-lg shadow-lg"
      onError={(e) => {
        e.currentTarget.src = 'https://via.placeholder.com/800x400/1A1A1A/91CB7D?text=Схема+бронирования';
      }}
    />
    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded">
      <i className="fas fa-info-circle mr-1"></i>Нажмите на зону ниже
    </div>
  </div>
);

// --- КАРТОЧКА ПАКЕТА ---
const PackageCard: React.FC<{ pkg: Package; isSelected: boolean; onSelect: () => void }> = ({ pkg, isSelected, onSelect }) => {
  const discountedPrice = pkg.discount > 0 ? Math.round(pkg.price * (1 - pkg.discount / 100)) : pkg.price;
  const savedAmount = pkg.price - discountedPrice;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left p-3 rounded-lg transition-all duration-200 cursor-pointer ${isSelected ? 'bg-accent/20 ring-2 ring-accent' : 'bg-bg-element hover:bg-accent/10'
        }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-accent text-bg-primary' : 'bg-accent/20 text-accent'
          }`}>
          <i className={`${pkg.icon} text-sm`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">{pkg.name}</span>
              {pkg.popular && (
                <span className="text-[10px] bg-accent/30 text-accent px-1.5 py-0.5 rounded-full">Популярный</span>
              )}
            </div>
            <div className="text-right">
              {pkg.discount > 0 ? (
                <>
                  <span className="text-text-secondary line-through text-xs mr-1">{pkg.price.toLocaleString()} ₽</span>
                  <span className="text-accent font-bold text-sm">{discountedPrice.toLocaleString()} ₽</span>
                  <span className="text-green-500 text-[10px] ml-1">-{pkg.discount}%</span>
                </>
              ) : (
                <span className="text-accent font-bold text-sm">{pkg.price.toLocaleString()} ₽</span>
              )}
            </div>
          </div>
          <p className="text-text-secondary text-xs">{pkg.description}</p>
          {pkg.discount > 0 && (
            <p className="text-green-500/70 text-[9px] mt-0.5">Экономия {savedAmount.toLocaleString()} ₽</p>
          )}
        </div>
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-accent bg-accent' : 'border-text-secondary/50'
          }`}>
          {isSelected && <i className="fas fa-check text-bg-primary text-[8px]"></i>}
        </div>
      </div>
    </button>
  );
};

// --- КАРТОЧКА ЗОНЫ ---
const ZoneCard: React.FC<{ zone: CarZone; isSelected: boolean; onToggle: () => void }> = ({ zone, isSelected, onToggle }) => (
  <button
    type="button"
    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
    className={`w-full text-left p-3 rounded-lg transition-all duration-200 cursor-pointer ${isSelected
      ? 'bg-accent/20 border-2 border-accent'
      : 'bg-bg-element border-2 border-transparent hover:bg-accent/10'
      }`}
  >
    <div className="flex flex-wrap items-start gap-2">
      <div className="flex-shrink-0 mt-0.5">
        <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${isSelected ? 'bg-accent text-bg-primary' : 'border-2 border-text-secondary/50'
          }`}>
          {isSelected && <i className="fas fa-check text-[8px]"></i>}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className="font-medium text-sm text-text-primary break-words pr-2">
            {zone.name}
          </span>
          <div className="flex-shrink-0">
            <span className="text-accent font-semibold text-sm whitespace-nowrap">
              от {zone.priceFrom.toLocaleString()} ₽
            </span>
            {zone.priceTo && (
              <span className="text-text-secondary text-[10px] ml-0.5 whitespace-nowrap">
                до {zone.priceTo.toLocaleString()} ₽
              </span>
            )}
          </div>
        </div>

        <p className="text-text-secondary text-[11px] mt-1 break-words leading-relaxed">
          {zone.description}
        </p>

        {zone.note && (
          <p className="text-text-secondary/60 text-[10px] mt-1 italic break-words">
            {zone.note}
          </p>
        )}
      </div>
    </div>
  </button>
);

// --- ПАНЕЛЬ ВЫБРАННОГО ---
const SelectedPanel: React.FC<{
  selectedZones: Set<string>;
  selectedPackage: string | null;
  totalPrice: number;
  originalPrice?: number;
  discountPercent?: number;
  onReset: () => void;
  onRemoveZone: (zoneId: string) => void;
  onOpenModal: () => void;
}> = ({ selectedZones, selectedPackage, totalPrice, originalPrice, discountPercent, onReset, onRemoveZone, onOpenModal }) => {
  const selectedZonesList = Array.from(selectedZones)
    .map(zoneId => CAR_ZONES.find(z => z.id === zoneId))
    .filter((z): z is CarZone => !!z);
  const selectedPackageData = selectedPackage ? PACKAGES.find(p => p.id === selectedPackage) : null;

  return (
    <div className="bg-bg-element rounded-xl p-4 sticky top-24">
      <h4 className="font-semibold text-base mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
        <i className="fas fa-check-circle text-accent text-sm"></i>Ваш выбор
      </h4>

      <div className="mb-3 p-2 bg-accent/5 rounded-lg border border-accent/10">
        <div className="flex items-center gap-2 text-accent text-[10px] font-medium mb-1">
          <i className="fas fa-gift text-[10px]"></i><span>Система скидок</span>
        </div>
        <div className="text-text-secondary text-[9px] space-y-0.5">
          <p>• 3-4 зоны → скидка <span className="text-accent">5%</span></p>
          <p>• 5-9 зон → скидка <span className="text-accent">8%</span></p>
          <p>• 10+ зон → скидка <span className="text-accent">12%</span></p>
          <p>• Готовые пакеты → скидка <span className="text-accent">5-10%</span> уже включена</p>
        </div>
      </div>

      {(selectedZonesList.length === 0 && !selectedPackageData) ? (
        <div className="text-center py-4">
          <i className="fas fa-hand-pointer text-2xl text-text-secondary/30 mb-2"></i>
          <p className="text-text-secondary text-xs">Выберите зоны или пакет</p>
        </div>
      ) : (
        <>
          {selectedPackageData && (
            <div className="mb-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-accent font-semibold text-sm">{selectedPackageData.name}</span>
                <button type="button" onClick={onReset} className="text-text-secondary hover:text-accent">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <p className="text-text-secondary text-[11px] mb-2">{selectedPackageData.description}</p>
              <div className="text-accent font-bold text-base mb-1">{totalPrice.toLocaleString()} ₽</div>
              {selectedPackageData.discount > 0 && (
                <div className="text-green-500 text-[10px]">Скидка {selectedPackageData.discount}% за комплекс</div>
              )}
            </div>
          )}

          <div className="space-y-1 mb-3 max-h-48 overflow-y-auto custom-scrollbar">
            {selectedZonesList.map((zone) => (
              <div key={zone.id} className="flex justify-between items-center text-xs py-1 border-b border-white/5">
                <span className="text-text-primary flex-1 truncate">{zone.name}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-accent text-xs font-medium whitespace-nowrap">
                    {zone.priceFrom.toLocaleString()} ₽
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveZone(zone.id)}
                    className="text-text-secondary/50 hover:text-accent"
                  >
                    <i className="fas fa-times text-[10px]"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10">
            {!selectedPackageData && originalPrice !== undefined && originalPrice > 0 && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-secondary text-xs">Сумма без скидки:</span>
                  <span className="text-sm font-semibold text-text-primary">{originalPrice.toLocaleString()} ₽</span>
                </div>
                {discountPercent && discountPercent > 0 && (
                  <div className="flex justify-between items-center mb-2 text-green-500 text-xs">
                    <span>Скидка {discountPercent}%:</span>
                    <span>-{Math.round(originalPrice * discountPercent / 100).toLocaleString()} ₽</span>
                  </div>
                )}
              </>
            )}
            <div className="flex justify-between items-center mb-3 pt-1">
              <span className="text-text-secondary text-sm font-medium">Итого:</span>
              <span className="text-xl font-bold text-accent">{totalPrice.toLocaleString()} ₽</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onReset}
                className="flex-1 py-2 text-xs border border-text-secondary/30 rounded-lg hover:border-accent transition-colors"
              >
                Сбросить
              </button>
              <button
                type="button"
                onClick={onOpenModal}
                disabled={selectedZonesList.length === 0 && !selectedPackageData}
                className={`flex-1 py-2 text-xs rounded-lg transition-all font-medium ${(selectedZonesList.length === 0 && !selectedPackageData)
                  ? 'bg-text-secondary/30 text-white/50 cursor-not-allowed'
                  : 'bg-accent hover:bg-accent-hover text-bg-primary'
                  }`}
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// --- ОСНОВНОЙ КОМПОНЕНТ ---
interface CarProtectionCalculatorProps {
  onSelectionChange?: (selectedZones: string[], totalPrice: number) => void;
}

const CarProtectionCalculator: React.FC<CarProtectionCalculatorProps> = ({ onSelectionChange }) => {
  const { openModal } = useModalContext();
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'zones' | 'packages'>('packages');

  const selectPackage = useCallback((packageId: string) => {
    const pkg = PACKAGES.find(p => p.id === packageId);
    if (pkg) {
      setSelectedPackage(packageId);
      setSelectedZones(new Set(pkg.zones));
    }
  }, []);

  const toggleZone = useCallback((zoneId: string) => {
    setSelectedPackage(null);
    setSelectedZones(prev => {
      const newSet = new Set(prev);
      if (newSet.has(zoneId)) {
        newSet.delete(zoneId);
      } else {
        newSet.add(zoneId);
      }
      return newSet;
    });
  }, []);

  const removeZone = useCallback((zoneId: string) => {
    setSelectedPackage(null);
    setSelectedZones(prev => {
      const newSet = new Set(prev);
      newSet.delete(zoneId);
      return newSet;
    });
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedZones(new Set());
    setSelectedPackage(null);
  }, []);

  const calculatePrice = useCallback(() => {
    if (selectedPackage) {
      const pkg = PACKAGES.find(p => p.id === selectedPackage);
      if (pkg) {
        return {
          total: pkg.discount > 0 ? Math.round(pkg.price * (1 - pkg.discount / 100)) : pkg.price,
          original: pkg.price,
          discountPercent: pkg.discount,
        };
      }
    }

    const cnt = selectedZones.size;
    let disc = 0;
    if (cnt >= 10) disc = 12;
    else if (cnt >= 5) disc = 8;
    else if (cnt >= 3) disc = 5;

    const orig = Array.from(selectedZones).reduce((sum, id) => {
      const zone = CAR_ZONES.find(z => z.id === id);
      return sum + (zone?.priceFrom || 0);
    }, 0);

    return {
      total: Math.round(orig * (1 - disc / 100)),
      original: orig,
      discountPercent: disc,
    };
  }, [selectedPackage, selectedZones]);

  const { total: totalPrice, original: originalPrice, discountPercent } = calculatePrice();

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(Array.from(selectedZones), totalPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedZones, totalPrice]);

  const handleOpenModal = useCallback(() => {
    const zones = Array.from(selectedZones)
      .map(id => CAR_ZONES.find(z => z.id === id))
      .filter((z): z is CarZone => !!z)
      .map(z => z.name);

    openModal({
      serviceType: 'ppf',
      serviceName: 'Бронирование пленкой',
      selectedZones: zones,
      totalPrice: totalPrice,
    });
  }, [selectedZones, totalPrice, openModal]);

  const handleActiveTabChange = useCallback((tab: 'zones' | 'packages') => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="space-y-5">
      <div className="bg-bg-element rounded-xl p-3">
        <CarSchemeImage />
      </div>

      <div className="flex gap-2 bg-bg-element rounded-lg p-1 w-fit mx-auto">
        <button
          type="button"
          onClick={() => handleActiveTabChange('packages')}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'packages'
            ? 'bg-accent text-bg-primary shadow-lg'
            : 'text-text-secondary hover:bg-accent/20'
            }`}
        >
          <i className="fas fa-box mr-1 text-xs"></i>Готовые пакеты
        </button>
        <button
          type="button"
          onClick={() => handleActiveTabChange('zones')}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'zones'
            ? 'bg-accent text-bg-primary shadow-lg'
            : 'text-text-secondary hover:bg-accent/20'
            }`}
        >
          <i className="fas fa-list mr-1 text-xs"></i>Собрать самому
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          {activeTab === 'packages' ? (
            <div className="bg-bg-element rounded-xl p-3">
              <div className="space-y-2">
                {PACKAGES.map(pkg => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    isSelected={selectedPackage === pkg.id}
                    onSelect={() => selectPackage(pkg.id)}
                  />
                ))}
              </div>
              <p className="text-text-secondary/60 text-[10px] text-center mt-3">
                * Скидка за комплекс уже включена в цену пакета
              </p>
            </div>
          ) : (
            <div className="bg-bg-element rounded-xl p-3">
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                {[
                  { id: 'front', name: 'Передняя часть', icon: 'fas fa-car-side', zones: CAR_ZONES.filter(z => z.category === 'front') },
                  { id: 'roof', name: 'Крыша', icon: 'fas fa-caravan', zones: CAR_ZONES.filter(z => z.category === 'roof') },
                  { id: 'rear', name: 'Задняя часть', icon: 'fas fa-car', zones: CAR_ZONES.filter(z => z.category === 'rear') },
                  { id: 'sides', name: 'Боковая часть', icon: 'fas fa-grip-lines', zones: CAR_ZONES.filter(z => z.category === 'sides') },
                ].map(cat => (
                  <div key={cat.id}>
                    <div className="text-accent text-xs font-semibold mb-1.5 flex items-center gap-1">
                      <i className={`${cat.icon} text-[10px]`}></i>{cat.name}
                    </div>
                    {cat.zones.map(zone => (
                      <ZoneCard
                        key={zone.id}
                        zone={zone}
                        isSelected={selectedZones.has(zone.id)}
                        onToggle={() => toggleZone(zone.id)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <SelectedPanel
            selectedZones={selectedZones}
            selectedPackage={selectedPackage}
            totalPrice={totalPrice}
            originalPrice={originalPrice}
            discountPercent={discountPercent}
            onReset={resetSelection}
            onRemoveZone={removeZone}
            onOpenModal={handleOpenModal}
          />
        </div>
      </div>

      <div className="bg-accent/5 rounded-xl p-3 space-y-1.5">
        <p className="text-text-secondary text-xs flex gap-1.5">
          <i className="fas fa-info-circle text-accent text-[10px] mt-0.5"></i>
          <span>Цены ориентировочные. Точная стоимость после осмотра.</span>
        </p>
        <p className="text-text-secondary text-xs flex gap-1.5">
          <i className="fas fa-gem text-accent text-[10px] mt-0.5"></i>
          <span>Премиальные пленки с гарантией.</span>
        </p>
      </div>
    </div>
  );
};

export default CarProtectionCalculator;