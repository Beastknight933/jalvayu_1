'use client';

import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
    name: string;
    value: number;
}

interface AreaChartProps {
    data: DataPoint[];
    color?: string;
    height?: number;
    title?: string;
}

export function AreaChart({ data, color = '#3b82f6', height = 300, title }: AreaChartProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full">
            {title && <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>}
            <div style={{ height: height, width: '100%' }}>
                <ResponsiveContainer>
                    <RechartsAreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`color-${color}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={color} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            stroke="#64748b" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                        />
                        <YAxis 
                            stroke="#64748b" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                            itemStyle={{ color: '#f8fafc' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={color} 
                            fillOpacity={1} 
                            fill={`url(#color-${color})`} 
                        />
                    </RechartsAreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
