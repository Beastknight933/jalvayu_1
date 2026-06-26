'use client';

import React, { useEffect } from 'react';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { wsService } from '@/api/websocket';
import { StatCard } from '@/components/widgets/StatCard';
import { ActivityFeed } from '@/components/widgets/ActivityFeed';
import { LineChart } from '@/components/charts/LineChart';
import dynamic from 'next/dynamic';
const IndiaMap = dynamic(() => import('@/components/map/IndiaMap').then(mod => mod.IndiaMap), { ssr: false, loading: () => <div className="flex-1 bg-secondary animate-pulse rounded-xl" /> });
import { MapProvider } from '@/components/map/MapProvider';
import { Activity, Database, Server, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock trend data for visualization purposes until backend API supplies historical points
const mockTrendData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 700 },
  { name: 'Sat', value: 650 },
  { name: 'Sun', value: 800 },
];

export default function DashboardPage() {
    const { stats, updateStats, addActivity } = useDashboardStore();

    useEffect(() => {
        // Initialize WebSocket connection for real-time dashboard updates
        wsService.connect();

        // Subscribe to relevant events
        wsService.subscribe('stats_update', (data) => updateStats(data));
        wsService.subscribe('activity_notification', (data) => addActivity(data));

        return () => {
            wsService.disconnect();
        };
    }, [updateStats, addActivity]);

    return (
        <MapProvider>
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6 h-full"
            >
                {/* Header Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                        title="Active Simulations" 
                        value={stats.activeSimulations || 3} 
                        icon={Activity} 
                        trend={{ value: 12, isPositive: true }} 
                    />
                    <StatCard 
                        title="Processed Datasets" 
                        value={stats.processedDatasets || '1,402'} 
                        icon={Database} 
                        trend={{ value: 4, isPositive: true }} 
                    />
                    <StatCard 
                        title="Processing Queue" 
                        value={stats.processingQueue || 15} 
                        icon={Cpu} 
                        statusColor="text-amber-500" 
                    />
                    <StatCard 
                        title="System Health" 
                        value={stats.systemHealth === 'healthy' ? 'Optimal' : 'Degraded'} 
                        icon={Server} 
                        statusColor={stats.systemHealth === 'healthy' ? 'text-emerald-500' : 'text-destructive'} 
                    />
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[500px]">
                    {/* GIS Centerpiece (Takes 2/3 width) */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="flex-1 bg-card border border-border rounded-xl shadow-sm overflow-hidden relative">
                            {/* <div className="absolute top-4 left-4 z-10">
                                <h3 className="font-semibold text-lg text-foreground px-3 py-1 bg-background/80 backdrop-blur rounded-md">Climate Variables Map</h3>
                            </div> */}
                            <IndiaMap />
                        </div>
                    </div>

                    {/* Right Sidebar (Takes 1/3 width) */}
                    <div className="flex flex-col gap-6">
                        <div className="h-64">
                            <LineChart data={mockTrendData} title="Simulation Requests (7 Days)" color="#f97316" height={220} />
                        </div>
                        <div className="flex-1 min-h-0">
                            <ActivityFeed />
                        </div>
                    </div>
                </div>
            </motion.div>
        </MapProvider>
    );
}
