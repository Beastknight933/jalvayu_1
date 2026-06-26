'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { healthApi } from '@/api/health';
import { motion } from 'framer-motion';
import { Server, Database, Activity, Cpu } from 'lucide-react';
import { StatCard } from '@/components/widgets/StatCard';

export default function HealthPage() {
    const { data: health, isLoading } = useQuery({
        queryKey: ['system-health'],
        queryFn: healthApi.getSystemHealth,
        refetchInterval: 10000, // Poll every 10 seconds as fallback to WebSockets
    });

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
        >
            <div>
                <h1 className="text-2xl font-bold text-foreground">System Health</h1>
                <p className="text-muted-foreground text-sm mt-1">Monitor the operational status of the Digital Twin infrastructure.</p>
            </div>

            {isLoading ? (
                <div className="flex h-32 items-center justify-center border border-border rounded-xl bg-card">
                    <p className="text-muted-foreground">Checking infrastructure health...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                        title="API Gateway" 
                        value={health?.api === 'healthy' ? 'Online' : 'Offline'} 
                        icon={Activity} 
                        statusColor={health?.api === 'healthy' ? 'text-emerald-500' : 'text-destructive'} 
                    />
                    <StatCard 
                        title="PostgreSQL / PostGIS" 
                        value={health?.database === 'healthy' ? 'Online' : 'Offline'} 
                        icon={Database} 
                        statusColor={health?.database === 'healthy' ? 'text-emerald-500' : 'text-destructive'} 
                    />
                    <StatCard 
                        title="Redis Cache & Queue" 
                        value={health?.redis === 'healthy' ? 'Online' : 'Offline'} 
                        icon={Server} 
                        statusColor={health?.redis === 'healthy' ? 'text-emerald-500' : 'text-destructive'} 
                    />
                    <StatCard 
                        title="Celery Workers" 
                        value={health?.celery === 'healthy' ? 'Online' : 'Offline'} 
                        icon={Cpu} 
                        statusColor={health?.celery === 'healthy' ? 'text-emerald-500' : 'text-destructive'} 
                    />
                </div>
            )}
            
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 mt-4">
                <h3 className="font-semibold text-lg mb-4">Detailed Metrics</h3>
                <p className="text-sm text-muted-foreground">Metrics visualization placeholder. Granular Prometheus metrics will be rendered here.</p>
            </div>
        </motion.div>
    );
}
