'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { datasetsApi } from '@/api/datasets';
import { motion } from 'framer-motion';
import { Database, Search, Filter, Download } from 'lucide-react';
import { Badge } from '@/components/widgets/Badge';

export default function DatasetsPage() {
    const { data: datasets, isLoading, isError } = useQuery({
        queryKey: ['datasets'],
        queryFn: datasetsApi.getAll,
    });

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 h-full"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dataset Explorer</h1>
                    <p className="text-muted-foreground text-sm mt-1">Manage and explore ingested climate datasets.</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input 
                            type="text" 
                            placeholder="Search datasets..." 
                            className="pl-9 pr-4 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
                        />
                    </div>
                    <button className="p-2 bg-card border border-border rounded-md hover:bg-accent transition-colors">
                        <Filter className="w-4 h-4 text-foreground" />
                    </button>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-medium">Dataset Name</th>
                                <th className="px-6 py-4 font-medium">Source</th>
                                <th className="px-6 py-4 font-medium">Variable</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Last Updated</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                        Loading datasets...
                                    </td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-destructive">
                                        Failed to load datasets.
                                    </td>
                                </tr>
                            ) : datasets?.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                        No datasets found.
                                    </td>
                                </tr>
                            ) : (
                                (datasets || []).map((dataset) => (
                                    <tr key={dataset.id} className="hover:bg-accent/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-foreground flex items-center gap-2">
                                            <Database className="w-4 h-4 text-muted-foreground" />
                                            {dataset.name}
                                        </td>
                                        <td className="px-6 py-4">{dataset.source}</td>
                                        <td className="px-6 py-4">{dataset.variable}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={dataset.status === 'processed' ? 'success' : 'warning'}>
                                                {dataset.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {new Date(dataset.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary hover:text-primary/80 transition-colors" title="Download Metadata">
                                                <Download className="w-4 h-4" />
                                            </button>
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
