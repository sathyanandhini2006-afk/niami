import { forwardRef } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from './Button';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, id, ...props }, ref) => {
        const inputId = id || props.name;
        return (
            <div className="flex flex-col gap-2 w-full">
                {label && (
                    <label htmlFor={inputId} className="text-[11px] font-bold uppercase tracking-widest text-muted/60 pl-1">
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    ref={ref}
                    className={cn(
                        'w-full bg-[#0a0f1d] border-white/5 focus:border-primary/50 text-white placeholder:text-muted/30 px-4 py-3 rounded-xl transition-all duration-300',
                        { 'border-red-500/50': error },
                        className
                    )}
                    {...props}
                />
                {error && <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 mt-1 pl-1">{error}</span>}
            </div>
        );
    }
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, id, ...props }, ref) => {
        const inputId = id || props.name;
        return (
            <div className="flex flex-col gap-2 w-full">
                {label && (
                    <label htmlFor={inputId} className="text-[11px] font-bold uppercase tracking-widest text-muted/60 pl-1">
                        {label}
                    </label>
                )}
                <textarea
                    id={inputId}
                    ref={ref}
                    className={cn(
                        'w-full bg-[#0a0f1d] border-white/5 focus:border-primary/50 text-white placeholder:text-muted/30 px-4 py-3 rounded-xl transition-all duration-300 min-h-[120px] resize-none',
                        { 'border-red-500/50': error },
                        className
                    )}
                    {...props}
                />
                {error && <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 mt-1 pl-1">{error}</span>}
            </div>
        );
    }
);
Textarea.displayName = 'Textarea';
