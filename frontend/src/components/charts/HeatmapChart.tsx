'use client';

import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HeatmapDataPoint {
    x: string;
    y: string;
    value: number;
}

interface HeatmapChartProps {
    data: HeatmapDataPoint[];
    xLabels: string[];
    yLabels: string[];
    title?: string;
    colorScale?: (value: number) => string;
}

export function HeatmapChart({ 
    data, 
    xLabels, 
    yLabels, 
    title,
    // Default blue color scale
    colorScale = (val: number) => `rgba(59, 130, 246, ${Math.min(Math.max(val, 0.1), 1)})` 
}: HeatmapChartProps) {
    
    const getValue = (x: string, y: string) => {
        return data.find(d => d.x === x && d.y === y)?.value || 0;
    };

    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full overflow-x-auto">
            {title && <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>}
            <div className="min-w-fit">
                <div className="flex">
                    {/* Y-Axis Labels */}
                    <div className="flex flex-col justify-between pr-4 mt-6">
                        {yLabels.map(y => (
                            <div key={y} className="text-xs text-muted-foreground h-8 flex items-center justify-end">
                                {y}
                            </div>
                        ))}
                    </div>
                    
                    {/* Grid */}
                    <div className="flex-1">
                        {/* X-Axis Labels */}
                        <div className="flex mb-2">
                            {xLabels.map(x => (
                                <div key={x} className="flex-1 text-xs text-muted-foreground text-center min-w-[32px]">
                                    {x}
                                </div>
                            ))}
                        </div>
                        
                        {/* Cells */}
                        <div className="flex flex-col gap-1">
                            {yLabels.map(y => (
                                <div key={y} className="flex gap-1">
                                    {xLabels.map(x => {
                                        const val = getValue(x, y);
                                        return (
                                            <TooltipProvider key={`${x}-${y}`} delay={100}>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <div 
                                                            className="flex-1 h-7 rounded-sm transition-all hover:scale-110 cursor-pointer min-w-[32px]"
                                                            style={{ backgroundColor: colorScale(val) }}
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-slate-900 border-slate-800 text-slate-100">
                                                        <p className="text-xs font-semibold">{x}, {y}</p>
                                                        <p className="text-xs">Value: {(val * 100).toFixed(1)}%</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
