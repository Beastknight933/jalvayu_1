'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
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

interface LineChartProps {
    data: DataPoint[];
    color?: string;
    height?: number;
    title?: string;
}

export function LineChart({ data, color = '#f97316', height = 300, title }: LineChartProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full">
            {title && <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>}
            <div style={{ height: height, width: '100%' }}>
                <ResponsiveContainer>
                    <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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
                        <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={color} 
                            strokeWidth={3} 
                            dot={false} 
                            activeDot={{ r: 6, fill: color }} 
                        />
                    </RechartsLineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
