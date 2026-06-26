'use client';

import React from 'react';


import { motion } from 'framer-motion';
import { FilterBar } from '@/components/widgets/FilterBar';
import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { HeatmapChart } from '@/components/charts/HeatmapChart';

export default function AnalyticsPage() {
    const mockTrendData = [
        { name: 'Jan', value: 12 }, { name: 'Feb', value: 15 }, 
        { name: 'Mar', value: 25 }, { name: 'Apr', value: 45 },
        { name: 'May', value: 80 }, { name: 'Jun', value: 250 },
        { name: 'Jul', value: 320 }, { name: 'Aug', value: 290 },
        { name: 'Sep', value: 180 }, { name: 'Oct', value: 60 },
        { name: 'Nov', value: 20 }, { name: 'Dec', value: 10 }
    ];

    const mockAnomalyData = [
        { name: 'North', value: -12 },
        { name: 'South', value: 45 },
        { name: 'East', value: 8 },
        { name: 'West', value: -22 },
        { name: 'Central', value: 5 },
    ];

    const mockHeatmapData = [
        { x: '2020', y: 'Summer', value: 0.8 },
        { x: '2021', y: 'Summer', value: 0.9 },
        { x: '2022', y: 'Summer', value: 0.95 },
        { x: '2020', y: 'Monsoon', value: 0.4 },
        { x: '2021', y: 'Monsoon', value: 0.6 },
        { x: '2022', y: 'Monsoon', value: 0.7 },
        { x: '2020', y: 'Winter', value: 0.2 },
        { x: '2021', y: 'Winter', value: 0.1 },
        { x: '2022', y: 'Winter', value: 0.15 },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 h-full"
        >
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-4 border-b border-border">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Climate Analytics</h1>
                    <p className="text-muted-foreground text-sm mt-1">Deep-dive into long-term trends, rolling averages, and anomalies.</p>
                </div>
            </div>

            <FilterBar />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AreaChart data={mockTrendData} title="Annual Rainfall Trend (Rolling Average)" color="#0ea5e9" height={300} />
                <BarChart data={mockAnomalyData} title="Regional Temperature Anomalies (°C)" dynamicColor={true} height={300} />
            </div>

            <div className="grid grid-cols-1 gap-6 flex-1">
                <HeatmapChart 
                    data={mockHeatmapData} 
                    xLabels={['2020', '2021', '2022']} 
                    yLabels={['Summer', 'Monsoon', 'Winter']} 
                    title="Seasonal Extremes Intensity" 
                    colorScale={(val) => `rgba(239, 68, 68, ${val})`} // Red scale
                />
            </div>
        </motion.div>
    );
}
