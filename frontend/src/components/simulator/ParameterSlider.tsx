'use client';

import React from 'react';

interface ParameterSliderProps {
    label: string;
    description?: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    onChange: (value: number) => void;
    colorClass?: string;
}

export function ParameterSlider({ 
    label, 
    description,
    value, 
    min, 
    max, 
    step, 
    unit, 
    onChange,
    colorClass = 'accent-primary'
}: ParameterSliderProps) {
    return (
        <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
                <div>
                    <label className="font-semibold text-sm text-foreground">{label}</label>
                    {description && <p className="text-xs text-muted-foreground">{description}</p>}
                </div>
                <div className="bg-secondary px-3 py-1 rounded-md text-sm font-mono font-medium text-foreground">
                    {value > 0 ? '+' : ''}{value} {unit}
                </div>
            </div>
            
            <input 
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                aria-label={label}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-valuetext={`${value} ${unit}`}
                className={`w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer mt-2 ${colorClass}`}
            />
            
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{min > 0 ? '+' : ''}{min} {unit}</span>
                <span>{max > 0 ? '+' : ''}{max} {unit}</span>
            </div>
        </div>
    );
}
