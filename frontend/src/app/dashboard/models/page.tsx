'use client';

import React from 'react';


import { motion } from 'framer-motion';
import { LineChart } from '@/components/charts/LineChart';
import { Brain, Target, TrendingUp, Cpu } from 'lucide-react';
import { StatCard } from '@/components/widgets/StatCard';

export default function ModelsPage() {
    // Mock performance history for charting
    const mockPerfHistory = [
        { name: 'Epoch 10', value: 0.85 },
        { name: 'Epoch 20', value: 0.72 },
        { name: 'Epoch 30', value: 0.65 },
        { name: 'Epoch 40', value: 0.58 },
        { name: 'Epoch 50', value: 0.52 },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 h-full"
        >
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Model Performance</h1>
                        <p className="text-muted-foreground text-sm mt-1">Evaluate backend AI metrics, training history, and accuracy.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <select className="px-4 py-2 bg-card border border-border rounded-md text-sm text-foreground focus:outline-none">
                        <option>Spatial-LSTM v4.2 (Production)</option>
                        <option>Transformer v1.0 (Experimental)</option>
                        <option>Prophet Base (Baseline)</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="Mean Absolute Error (MAE)" 
                    value="1.24" 
                    icon={Target} 
                    trend={{ value: 5.2, isPositive: true }} 
                    description="Lower is better. Global avg over 30 days."
                />
                <StatCard 
                    title="RMSE" 
                    value="1.86" 
                    icon={Target} 
                    trend={{ value: 2.1, isPositive: true }} 
                />
                <StatCard 
                    title="R² Score" 
                    value="0.94" 
                    icon={TrendingUp} 
                    statusColor="text-emerald-500"
                    description="Higher is better. Max 1.0."
                />
                <StatCard 
                    title="Inference Latency" 
                    value="124ms" 
                    icon={Cpu} 
                    statusColor="text-emerald-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                <LineChart data={mockPerfHistory} title="Validation Loss (MSE) Over Training Epochs" color="#10b981" height={400} />
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4 text-foreground">Model Metadata</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between pb-2 border-b border-border">
                            <span className="text-muted-foreground">Framework</span>
                            <span className="font-medium text-foreground">PyTorch 2.0</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-border">
                            <span className="text-muted-foreground">Parameters</span>
                            <span className="font-medium text-foreground">24.5 M</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-border">
                            <span className="text-muted-foreground">Last Trained</span>
                            <span className="font-medium text-foreground">2026-06-25 14:30 UTC</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-border">
                            <span className="text-muted-foreground">Training Dataset</span>
                            <span className="font-medium text-foreground">IMD_GRID_V2 (1950-2025)</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
