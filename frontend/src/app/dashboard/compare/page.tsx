'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MultiSeriesChart } from '@/components/charts/MultiSeriesChart';
import { BarChart } from '@/components/charts/BarChart';
import { FilterBar } from '@/components/widgets/FilterBar';
import { GitCompare } from 'lucide-react';

export default function ComparePage() {
    const mockMultiData = [
        { name: 'Day 1', 'Model A (LSTM)': 12, 'Model B (Transformer)': 14 },
        { name: 'Day 2', 'Model A (LSTM)': 15, 'Model B (Transformer)': 13 },
        { name: 'Day 3', 'Model A (LSTM)': 22, 'Model B (Transformer)': 24 },
        { name: 'Day 4', 'Model A (LSTM)': 30, 'Model B (Transformer)': 31 },
        { name: 'Day 5', 'Model A (LSTM)': 18, 'Model B (Transformer)': 19 },
    ];

    const mockDiffData = mockMultiData.map(d => ({
        name: d.name,
        value: Number(d['Model A (LSTM)']) - Number(d['Model B (Transformer)'])
    }));

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 h-full"
        >
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <GitCompare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Comparison Mode</h1>
                        <p className="text-muted-foreground text-sm mt-1">Side-by-side analysis of models, regions, and timelines.</p>
                    </div>
                </div>
            </div>

            <FilterBar />

            {/* Split View for Maps or Data Cards (Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[200px] flex flex-col justify-center items-center text-muted-foreground">
                    <h3 className="font-semibold text-foreground mb-2">Entity A (e.g. Model A)</h3>
                    <p className="text-sm">Select an entity to compare</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[200px] flex flex-col justify-center items-center text-muted-foreground">
                    <h3 className="font-semibold text-foreground mb-2">Entity B (e.g. Model B)</h3>
                    <p className="text-sm">Select an entity to compare</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                <div className="lg:col-span-2">
                    <MultiSeriesChart 
                        data={mockMultiData} 
                        series={[
                            { key: 'Model A (LSTM)', name: 'Model A', color: '#3b82f6' },
                            { key: 'Model B (Transformer)', name: 'Model B', color: '#10b981' }
                        ]} 
                        title="Prediction Trajectory Comparison" 
                        height={400} 
                    />
                </div>
                <div>
                    <BarChart 
                        data={mockDiffData} 
                        title="Absolute Difference (A - B)" 
                        dynamicColor={true} 
                        height={400} 
                    />
                </div>
            </div>
        </motion.div>
    );
}
