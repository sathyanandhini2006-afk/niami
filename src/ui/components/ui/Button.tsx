import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'royal';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, leftIcon, rightIcon, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                    {
                        'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20': variant === 'primary',
                        'bg-white text-black hover:bg-white/90 shadow-lg shadow-white/5': variant === 'royal',
                        'bg-white/5 border border-white/5 hover:bg-white/10 text-white': variant === 'secondary',
                        'bg-red-500/10 border border-red-500/10 text-red-500 hover:bg-red-500/20': variant === 'danger',
                        'bg-transparent hover:bg-white/5 text-muted hover:text-white': variant === 'ghost',
                        'px-3 py-1.5 text-xs rounded-lg': size === 'sm',
                        'px-5 py-2.5 text-sm rounded-xl': size === 'md',
                        'px-8 py-3.5 text-base rounded-2xl': size === 'lg',
                    },
                    'gap-2',
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 18} />}
                {!isLoading && leftIcon && <span>{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span>{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
