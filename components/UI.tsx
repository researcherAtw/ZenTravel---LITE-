
import React from 'react';
import { HighlightColor } from '../types';

// Zen Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-zen-card rounded-2xl border border-stone-100 shadow-zen mb-4 p-4 transition-all duration-200 ${onClick ? 'cursor-pointer active:translate-y-1 active:shadow-zen-sm' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// Zen Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = "", ...props }) => {
  const baseStyle = "font-mono font-bold rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-zen-primary text-white shadow-zen hover:bg-opacity-90 active:shadow-zen-sm",
    secondary: "bg-zen-secondary text-zen-text shadow-zen hover:bg-opacity-90 active:shadow-zen-sm",
    danger: "bg-zen-danger text-white shadow-zen active:shadow-zen-sm",
    ghost: "bg-transparent text-zen-text hover:bg-stone-100"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// Category Badge with built-in Icon support
export const CategoryBadge: React.FC<{ type: string; color?: HighlightColor; icon?: string }> = ({ type, color, icon }) => {
  const defaultStyles: Record<string, string> = {
    transport: "bg-red-50 text-red-700 border-red-100",
    購物: "bg-orange-50 text-orange-700 border-orange-100",
    下午茶: "bg-blue-50 text-blue-700 border-blue-100",
    晚餐: "bg-green-50 text-green-700 border-green-100",
    早餐: "bg-green-50 text-green-700 border-green-100",
    早午餐: "bg-green-50 text-green-700 border-green-100",
    景點: "bg-purple-50 text-purple-700 border-purple-100",
    設施: "bg-purple-50 text-purple-700 border-purple-100",
    "Check In": "bg-stone-100 text-stone-700 border-stone-200",
    "Check Out": "bg-stone-100 text-stone-700 border-stone-200",
  };

  const colorStyles: Record<HighlightColor, string> = {
    red: "bg-red-50 text-red-700 border-red-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    green: "bg-green-50 text-green-700 border-green-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    gray: "bg-stone-100 text-stone-700 border-stone-200"
  };

  const styleClass = color ? colorStyles[color] : (defaultStyles[type] || "bg-stone-50 text-stone-700 border-stone-100");

  return (
    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tight border flex items-center gap-1.5 ${styleClass}`}>
      {icon && <i className={`fa-solid ${icon} text-[9px]`}></i>}
      {type}
    </span>
  );
};
