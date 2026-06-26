'use client';

import React, { useEffect } from 'react';
import { useReplayStore } from '@/stores/useReplayStore';
import { motion } from 'framer-motion';
import { Timeline } from '@/components/widgets/Timeline';
import dynamic from 'next/dynamic';
const IndiaMap = dynamic(() => import('@/components/map/IndiaMap').then(mod => mod.IndiaMap), { ssr: false, loading: () => <div className="flex-1 bg-secondary animate-pulse rounded-xl" /> });
import { MapProvider } from '@/components/map/MapProvider';
import { History, Maximize2 } from 'lucide-react';
import { useMapStore } from '@/stores/useMapStore';

export default function ReplayPage() {
    const { currentDate } = useReplayStore();
    const { } = useMapStore();

    // Effect to update map layers when date changes
    // This assumes the backend handles time-sliced queries (e.g., `?time=${currentDate}`)
    useEffect(() => {
        // In a real implementation, we would update the source URL of the ClimateLayer here
        // to point to the backend tile server with the time query param.
        // E.g., setLayerUrl('rainfall', `/api/tiles/rainfall/{z}/{x}/{y}?date=${currentDate}`)
    }, [currentDate]);

    return (
        <MapProvider>
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4 h-full relative"
            >
                <div className="flex items-center justify-between z-10 bg-card/80 backdrop-blur border border-border p-3 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <History className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-foreground leading-none">Historical Replay</h1>
                            <p className="text-muted-foreground text-xs mt-1">Time-travel through climate records</p>
                        </div>
                    </div>
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Main GIS Map Area */}
                <div className="flex-1 rounded-xl overflow-hidden border border-border relative">
                    <IndiaMap />
                    
                    {/* Timestamp Overlay inside Map */}
                    <div className="absolute top-6 left-6 z-10 pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-xl shadow-2xl">
                            <span className="text-4xl font-black tracking-tighter tabular-nums">{currentDate}</span>
                            <div className="text-xs text-white/70 font-medium uppercase tracking-widest mt-1">Replay State</div>
                        </div>
                    </div>
                </div>

                {/* Timeline Controls */}
                <div className="w-full shrink-0">
                    <Timeline />
                </div>
            </motion.div>
        </MapProvider>
    );
}
