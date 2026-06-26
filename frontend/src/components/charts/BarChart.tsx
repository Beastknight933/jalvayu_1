'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface DataPoint {
    name: string;
    value: number;
}

interface BarChartProps {
    data: DataPoint[];
    color?: string;
    height?: number;
    title?: string;
    dynamicColor?: boolean; // If true, negative values will be colored differently
}

export function BarChart({ data, color = '#8b5cf6', height = 300, title, dynamicColor = false }: BarChartProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full">
            {title && <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>}
            <div style={{ height: height, width: '100%' }}>
                <ResponsiveContainer>
                    <RechartsBarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                            itemStyle={{ color: '#f8fafc' }}
                            cursor={{ fill: '#334155', opacity: 0.2 }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={dynamicColor ? (entry.value < 0 ? '#ef4444' : '#10b981') : color} 
                                />
                            ))}
                        </Bar>
                    </RechartsBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
