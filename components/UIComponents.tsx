import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 transition-all duration-300 tracking-widest text-sm font-medium uppercase";
  const variants = {
    primary: "bg-accent text-white hover:bg-greenApple",
    outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
    ghost: "text-secondary hover:text-accent hover:bg-greenLight"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-16 text-center">
    <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-primary">{title}</h2>
    {subtitle && (
      <div className="flex items-center justify-center gap-4">
        <span className="h-px w-12 bg-accent"></span>
        <p className="text-accent uppercase tracking-widest text-sm">{subtitle}</p>
        <span className="h-px w-12 bg-accent"></span>
      </div>
    )}
  </div>
);

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode; className?: string }> = ({ children, className = '', ...props }) => (
  <div className={`bg-white p-8 border-2 border-greenLight shadow-sm hover:shadow-md hover:border-accent transition-all duration-500 ${className}`} {...props}>
    {children}
  </div>
);
