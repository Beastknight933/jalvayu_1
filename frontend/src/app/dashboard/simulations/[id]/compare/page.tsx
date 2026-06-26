'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { simulationsApi } from '@/api/simulations';
import { motion } from 'framer-motion';
import { GitCompare } from 'lucide-react';
import Link from 'next/link';
import { MultiSeriesChart } from '@/components/charts/MultiSeriesChart';

export default function SimulationComparePage() {
    const params = useParams();
    const id = params.id as string;

    const { data: sim, isLoading } = useQuery({
        queryKey: ['simulation', id],
        queryFn: () => simulationsApi.getById(id),
    });

    if (isLoading || !sim) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Loading comparison workspace...</p>
            </div>
        );
    }

    const mockComparisonData = [
        { name: 'Day 1', 'Baseline': 12, 'Scenario': 14 },
        { name: 'Day 2', 'Baseline': 15, 'Scenario': 18 },
        { name: 'Day 3', 'Baseline': 22, 'Scenario': 26 },
        { name: 'Day 4', 'Baseline': 30, 'Scenario': 35 },
        { name: 'Day 5', 'Baseline': 18, 'Scenario': 22 },
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
                        <GitCompare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <Link href={`/dashboard/simulations/${sim.id}`} className="text-muted-foreground text-sm hover:text-foreground">
                                {sim.scenario_name}
                            </Link>
                            <span className="text-muted-foreground text-sm">/</span>
                            <h1 className="text-xl font-bold text-foreground">Compare</h1>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">Scenario vs Baseline Analysis</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col">
                    <h3 className="font-semibold text-foreground mb-4">Baseline: {sim.params.dataset_version}</h3>
                    <div className="flex-1 bg-secondary/30 rounded-lg flex items-center justify-center border border-border border-dashed">
                        <p className="text-sm text-muted-foreground">Map rendering baseline climate state</p>
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col">
                    <h3 className="font-semibold text-foreground mb-4">Scenario: {sim.scenario_name}</h3>
                    <div className="flex-1 bg-secondary/30 rounded-lg flex items-center justify-center border border-border border-dashed">
                        <p className="text-sm text-muted-foreground">Map rendering predicted scenario state</p>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex-1 min-h-[400px]">
                <MultiSeriesChart 
                    data={mockComparisonData} 
                    series={[
                        { key: 'Baseline', name: 'Baseline (Historical)', color: '#94a3b8' },
                        { key: 'Scenario', name: 'Scenario (Predicted)', color: '#ef4444' }
                    ]} 
                    title="Rainfall Trajectory Divergence" 
                    height={350} 
                />
            </div>
        </motion.div>
    );
}
