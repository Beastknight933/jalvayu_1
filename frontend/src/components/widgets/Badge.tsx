import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    const variants = {
        success: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
        warning: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
        error: 'bg-destructive/15 text-destructive border-destructive/30',
        info: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
        default: 'bg-secondary text-secondary-foreground border-border',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
