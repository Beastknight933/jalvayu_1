'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { twinApi } from '@/api/twin';
import { motion } from 'framer-motion';
import { Server, Settings, Database, Activity } from 'lucide-react';
import { StatCard } from '@/components/widgets/StatCard';
import { Badge } from '@/components/widgets/Badge';

export default function TwinConfigPage() {
    const { data: status, isLoading } = useQuery({
        queryKey: ['twin-status'],
        queryFn: twinApi.getStatus,
        refetchInterval: 15000,
    });

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 max-w-5xl"
        >
            <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Server className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Digital Twin Status</h1>
                    <p className="text-muted-foreground text-sm mt-1">Core engine configuration and operational metadata.</p>
                </div>
            </div>

            {isLoading ? (
                <div className="h-32 flex items-center justify-center bg-card border border-border rounded-xl">
                    <p className="text-muted-foreground">Retrieving engine status...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard 
                            title="Engine State" 
                            value={status?.engine_state || 'Unknown'} 
                            icon={Activity} 
                            statusColor={status?.engine_state === 'active' ? 'text-emerald-500' : 'text-amber-500'} 
                        />
                        <StatCard 
                            title="Active Workers" 
                            value={status?.active_workers || 0} 
                            icon={Server} 
                        />
                        <StatCard 
                            title="Memory Usage" 
                            value={`${status?.memory_usage_mb || 0} MB`} 
                            icon={Settings} 
                        />
                        <StatCard 
                            title="Loaded Dataset" 
                            value={status?.loaded_dataset || 'None'} 
                            icon={Database} 
                        />
                    </div>

                    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-border">
                            <h3 className="font-semibold text-lg text-foreground">Engine Configuration</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Spatial Resolution</label>
                                <input 
                                    type="text" 
                                    disabled 
                                    value={status?.config.resolution || '0.25 degrees'} 
                                    className="w-full bg-secondary border border-border rounded-md px-4 py-2 text-foreground cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Default Model</label>
                                <input 
                                    type="text" 
                                    disabled 
                                    value={status?.config.default_model || 'spatial-lstm'} 
                                    className="w-full bg-secondary border border-border rounded-md px-4 py-2 text-foreground cursor-not-allowed"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium text-muted-foreground">Result Caching</label>
                                <Badge variant={status?.config.cache_enabled ? 'success' : 'warning'}>
                                    {status?.config.cache_enabled ? 'Enabled' : 'Disabled'}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
}
