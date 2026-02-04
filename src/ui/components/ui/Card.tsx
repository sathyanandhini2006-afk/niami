import type { FC, HTMLAttributes } from 'react';
import { cn } from './Button';

export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <div className={cn('glass-card p-8', className)} {...props}>
            {children}
        </div>
    );
};
