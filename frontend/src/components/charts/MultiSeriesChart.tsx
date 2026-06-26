'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface MultiSeriesDataPoint {
    name: string;
    [key: string]: string | number;
}

interface SeriesConfig {
    key: string;
    name: string;
    color: string;
}

interface MultiSeriesChartProps {
    data: MultiSeriesDataPoint[];
    series: SeriesConfig[];
    height?: number;
    title?: string;
}

export function MultiSeriesChart({ data, series, height = 300, title }: MultiSeriesChartProps) {
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
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                            itemStyle={{ color: '#f8fafc' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                        {series.map((s) => (
                            <Line 
                                key={s.key}
                                type="monotone" 
                                dataKey={s.key} 
                                name={s.name}
                                stroke={s.color} 
                                strokeWidth={2} 
                                dot={false} 
                                activeDot={{ r: 4, fill: s.color }} 
                            />
                        ))}
                    </RechartsLineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
