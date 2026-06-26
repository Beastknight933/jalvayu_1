'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InsightCardProps {
    title: string;
    icon: LucideIcon;
    primaryText: string;
    secondaryText?: string;
    tertiaryText?: string;
    highlightColor?: string; // Tailwind text color class
}

export function InsightCard({ title, icon: Icon, primaryText, secondaryText, tertiaryText, highlightColor = 'text-primary' }: InsightCardProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-secondary ${highlightColor}`}>
                    <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-medium text-sm text-muted-foreground">{title}</h4>
            </div>
            
            <div className="flex flex-col gap-1 mt-1">
                <span className="text-xl font-bold text-foreground leading-tight">{primaryText}</span>
                {secondaryText && <span className={`text-sm font-medium ${highlightColor}`}>{secondaryText}</span>}
                {tertiaryText && <span className="text-xs text-muted-foreground mt-1">{tertiaryText}</span>}
            </div>
        </div>
    );
}
