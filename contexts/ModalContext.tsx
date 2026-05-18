// contexts/ModalContext.tsx
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useModal, ModalOptions } from '@/hooks/useModal';
import ModalForm from '@/components/ui/ModalForm';

interface ModalContextType {
  openModal: (options?: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { isOpen, modalOptions, openModal, closeModal } = useModal();

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ModalForm
        isOpen={isOpen}
        onClose={closeModal}
        serviceType={modalOptions.serviceType}
        serviceName={modalOptions.serviceName}
        selectedZones={modalOptions.selectedZones}
        totalPrice={modalOptions.totalPrice}
      />
    </ModalContext.Provider>
  );
};