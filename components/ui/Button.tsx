'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'default' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
}) => {
  const baseClasses = 'font-medium rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2';

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-accent hover:bg-accent-hover text-bg-primary hover:scale-105 hover:shadow-lg hover:shadow-accent/25',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-bg-primary',
    ghost: 'text-text-secondary hover:text-accent'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.button>
  );
};

export default Button;