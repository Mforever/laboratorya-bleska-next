// components/ui/PromoBlock.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PromoBlockProps {
  description: string;
  highlight?: string;
  saving?: string;
  buttonText?: string;
  onClick: () => void;
}

const PromoBlock: React.FC<PromoBlockProps> = ({
  description,
  highlight,
  saving,
  buttonText = 'Записаться',
  onClick,
}) => {
  return (
    <div className="container-custom px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-xl border border-accent/20">
          <div className="p-4 md:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-text-primary text-sm md:text-base">
                    {description}
                  </span>
                  {highlight && (
                    <span className="text-accent font-bold text-sm md:text-base">
                      {highlight}
                    </span>
                  )}
                </div>
                {saving && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <i className="fas fa-gift text-accent/70 text-xs"></i>
                    <span className="text-accent/80 text-xs font-medium">
                      {saving}
                    </span>
                  </div>
                )}
              </div>
              <motion.button
                onClick={onClick}
                className="px-5 py-2 bg-accent hover:bg-accent-hover text-bg-primary font-medium rounded-lg transition-all shadow-md whitespace-nowrap text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {buttonText}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBlock;