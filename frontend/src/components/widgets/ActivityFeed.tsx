'use client';

import React from 'react';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

export function ActivityFeed() {
    const { activities } = useDashboardStore();

    const getIcon = (type: string) => {
        switch(type) {
            case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
            case 'warning': return <AlertCircle className="w-4 h-4 text-amber-500" />;
            case 'error': return <XCircle className="w-4 h-4 text-destructive" />;
            default: return <Info className="w-4 h-4 text-blue-500" />;
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col h-full">
            <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Recent Activity</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activities.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No recent activity</p>
                ) : (
                    activities.map(activity => (
                        <div key={activity.id} className="flex gap-3">
                            <div className="mt-0.5">{getIcon(activity.type)}</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground leading-snug">{activity.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
