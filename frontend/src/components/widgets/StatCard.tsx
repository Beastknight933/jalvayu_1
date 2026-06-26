import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    description?: string;
    statusColor?: string; // e.g., 'text-emerald-500'
}

export function StatCard({ title, value, icon: Icon, trend, description, statusColor }: StatCardProps) {
    return (
        <motion.div 
            whileHover={{ y: -2 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-muted-foreground text-sm tracking-tight">{title}</h3>
                {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
            </div>
            
            <div className="flex items-baseline gap-2">
                <p className={`text-3xl font-bold ${statusColor || 'text-foreground'}`}>
                    {value}
                </p>
                {trend && (
                    <span className={`text-sm font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-destructive'}`}>
                        {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                    </span>
                )}
            </div>
            
            {description && (
                <p className="text-xs text-muted-foreground mt-2">{description}</p>
            )}
        </motion.div>
    );
}
