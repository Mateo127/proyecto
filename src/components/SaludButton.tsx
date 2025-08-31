import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';

interface SaludButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
}

export function SaludButton({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  className = '',
  ...props 
}: SaludButtonProps) {
  const baseClasses = 'rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[--salud-blue] text-white hover:bg-blue-700 active:scale-95',
    secondary: 'bg-[--salud-green] text-white hover:bg-green-600 active:scale-95',
    outline: 'border-2 border-[--salud-blue] text-[--salud-blue] hover:bg-[--salud-blue] hover:text-white active:scale-95'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}