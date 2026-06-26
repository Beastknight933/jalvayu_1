'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { simulationsApi, SimulationJob } from '@/api/simulations';
import { useSimulationStore } from '@/stores/useSimulationStore';
import { wsService } from '@/api/websocket';
import { motion } from 'framer-motion';
import { SimulationProgress } from '@/components/simulator/SimulationProgress';
import { MapProvider } from '@/components/map/MapProvider';
import dynamic from 'next/dynamic';
const IndiaMap = dynamic(() => import('@/components/map/IndiaMap').then(mod => mod.IndiaMap), { ssr: false, loading: () => <div className="flex-1 bg-secondary animate-pulse rounded-xl" /> });
import { PlaySquare } from 'lucide-react';
import Link from 'next/link';

export default function SimulationWorkspacePage() {
    const params = useParams();
    const id = params.id as string;

    const { activeSimulations, liveLogs, updateSimulation, appendLog } = useSimulationStore();
    
    // Fetch initial state
    const { data: initialSim, isLoading } = useQuery({
        queryKey: ['simulation', id],
        queryFn: () => simulationsApi.getById(id),
    });

    useEffect(() => {
        if (initialSim && !activeSimulations[id]) {
            updateSimulation(initialSim);
        }
    }, [initialSim, id, activeSimulations, updateSimulation]);

    useEffect(() => {
        // Subscribe to live WebSocket updates for this specific simulation
        const handleProgress = (data: unknown) => {
            const payload = data as SimulationJob & { log?: string };
            if (payload.id === id) {
                updateSimulation(payload);
                if (payload.log) {
                    appendLog(id, payload.log);
                }
            }
        };

        wsService.subscribe('simulation_progress', handleProgress);
        return () => wsService.unsubscribe('simulation_progress', handleProgress);
    }, [id, updateSimulation, appendLog]);

    const sim = activeSimulations[id] || initialSim;
    const logs = liveLogs[id] || [];

    if (isLoading || !sim) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Loading workspace...</p>
            </div>
        );
    }

    return (
        <MapProvider>
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-6 h-full"
            >
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <PlaySquare className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <Link href="/dashboard/simulations" className="text-muted-foreground text-sm hover:text-foreground">Simulations</Link>
                                <span className="text-muted-foreground text-sm">/</span>
                                <h1 className="text-xl font-bold text-foreground">{sim.scenario_name}</h1>
                            </div>
                            <p className="text-muted-foreground text-sm mt-1">Live Simulation Workspace</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[500px]">
                    {/* Map Area (2/3 width) */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="flex-1 bg-card border border-border rounded-xl shadow-sm overflow-hidden relative">
                            {/* In a real scenario, the map would render difference layers based on sim.results */}
                            <IndiaMap />
                        </div>
                    </div>

                    {/* Controls & Progress Area (1/3 width) */}
                    <div className="flex flex-col gap-6">
                        {/* Status Panel */}
                        <div className="h-64">
                            <SimulationProgress 
                                status={sim.status} 
                                progress={sim.progress} 
                                logs={logs} 
                            />
                        </div>
                        
                        {/* Parameters Panel */}
                        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex-1">
                            <h3 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">Initial Conditions</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Region</span>
                                    <span className="font-medium text-foreground capitalize">{sim.params.region}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Duration</span>
                                    <span className="font-medium text-foreground">{sim.params.duration_days} Days</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Model</span>
                                    <span className="font-medium text-foreground">{sim.params.model_name}</span>
                                </div>
                                <div className="pt-3 mt-3 border-t border-border">
                                    <h4 className="text-xs text-muted-foreground mb-2">Perturbations</h4>
                                    {Object.entries(sim.params.variables || {}).map(([key, value]) => (
                                        <div key={key} className="flex justify-between text-sm mb-1">
                                            <span className="text-muted-foreground capitalize">{key}</span>
                                            <span className="font-medium text-foreground font-mono">
                                                {Number(value) > 0 ? '+' : ''}{Number(value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </MapProvider>
    );
}
