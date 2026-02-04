import type { FC, HTMLAttributes } from 'react';
import { cn } from './Button';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'royal';
}

export const Badge: FC<BadgeProps> = ({ className, variant = 'primary', children, ...props }) => {
    return (
        <span
            className={cn(
                'inline-flex items-center px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300',
                {
                    'bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(var(--color-primary),0.1)]': variant === 'primary',
                    'bg-white/5 text-muted border-white/10': variant === 'secondary',
                    'bg-emerald-500/10 text-emerald-500 border-emerald-500/20': variant === 'success',
                    'bg-amber-500/10 text-amber-500 border-amber-500/20': variant === 'warning',
                    'bg-red-500/10 text-red-500 border-red-500/20': variant === 'danger',
                    'bg-transparent border-white/5 text-muted/60': variant === 'outline',
                    'bg-accent/10 text-accent border-accent/20 shadow-[0_0_10px_rgba(251,191,36,0.1)]': variant === 'royal',
                },
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};
