'use client';

import React, { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

interface SimulationProgressProps {
    status: 'queued' | 'running' | 'completed' | 'failed';
    progress: number; // 0 to 100
    logs: string[];
}

export const SimulationProgress = memo(function SimulationProgress({ status, progress, logs }: SimulationProgressProps) {
    const logsEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logs
    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    const getStatusColor = () => {
        switch (status) {
            case 'completed': return 'bg-emerald-500';
            case 'failed': return 'bg-destructive';
            case 'running': return 'bg-blue-500';
            default: return 'bg-amber-500';
        }
    };

    return (
        <div className="flex flex-col gap-4 bg-card border border-border rounded-xl p-4 shadow-sm h-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider">Execution Status</h3>
                <span className="text-xs font-medium px-2 py-1 bg-secondary rounded text-muted-foreground capitalize">
                    {status}
                </span>
            </div>
            
            <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                <motion.div 
                    className={`h-2.5 rounded-full ${getStatusColor()}`} 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
            
            <div className="flex justify-between text-xs font-medium text-muted-foreground mt-1 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
            </div>
            
            <div className="flex-1 bg-black/90 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-y-auto max-h-[200px] border border-border">
                {logs.length === 0 ? (
                    <span className="text-muted-foreground">Waiting for simulation to start...</span>
                ) : (
                    logs.map((log, idx) => (
                        <div key={idx} className="mb-1 leading-relaxed opacity-90">{log}</div>
                    ))
                )}
                <div ref={logsEndRef} />
            </div>
        </div>
    );
});
