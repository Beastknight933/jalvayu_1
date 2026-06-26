'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { simulationsApi } from '@/api/simulations';
import { motion } from 'framer-motion';
import { PlaySquare, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/widgets/Badge';

export default function SimulationsPage() {
    const { data: simulations, isLoading } = useQuery({
        queryKey: ['simulations'],
        queryFn: simulationsApi.getAll,
    });

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 h-full"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Simulation Queue & History</h1>
                    <p className="text-muted-foreground text-sm mt-1">Manage and monitor your Digital Twin simulations.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input 
                            type="text" 
                            placeholder="Search scenarios..." 
                            className="pl-9 pr-4 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
                        />
                    </div>
                    {/* The link might need next/link, my import above is next/next, I should use next/link */}
                    <Link href="/dashboard/simulations/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                        New Scenario
                    </Link>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-medium">Scenario Name</th>
                                <th className="px-6 py-4 font-medium">Model</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Created</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                        Loading simulations...
                                    </td>
                                </tr>
                            ) : simulations?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                        No simulations found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                (simulations || []).map((sim) => (
                                    <tr key={sim.id} className="hover:bg-accent/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-foreground flex items-center gap-2">
                                            <PlaySquare className="w-4 h-4 text-primary" />
                                            <Link href={`/dashboard/simulations/${sim.id}`} className="hover:underline">
                                                {sim.scenario_name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">{sim.params.model_name}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={
                                                sim.status === 'completed' ? 'success' : 
                                                sim.status === 'failed' ? 'error' : 
                                                sim.status === 'running' ? 'info' : 'warning'
                                            }>
                                                {sim.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {new Date(sim.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/dashboard/simulations/${sim.id}`} className="text-primary hover:text-primary/80 transition-colors text-xs font-medium">
                                                View Workspace
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
