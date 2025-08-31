import { InputHTMLAttributes, ReactNode } from 'react';

interface SaludInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

export function SaludInput({ 
  label, 
  icon, 
  error, 
  className = '', 
  ...props 
}: SaludInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[--salud-dark] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[--salud-gray]">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 bg-[--salud-light-gray] border-2 border-transparent 
            rounded-xl focus:border-[--salud-blue] focus:outline-none 
            transition-colors duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}