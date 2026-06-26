'use client';

import React from 'react';
import { Filter, Calendar, MapPin, Database } from 'lucide-react';

export function FilterBar() {
    return (
        <div className="flex flex-wrap items-center gap-3 p-1">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground shadow-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <select className="bg-transparent border-none focus:outline-none cursor-pointer">
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                    <option>Last 1 Year</option>
                    <option>Custom Range...</option>
                </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground shadow-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <select className="bg-transparent border-none focus:outline-none cursor-pointer">
                    <option>All Regions (India)</option>
                    <option>North India</option>
                    <option>South India</option>
                    <option>East India</option>
                    <option>West India</option>
                </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground shadow-sm">
                <Database className="w-4 h-4 text-muted-foreground" />
                <select className="bg-transparent border-none focus:outline-none cursor-pointer">
                    <option>All Variables</option>
                    <option>Rainfall</option>
                    <option>Max Temp</option>
                    <option>Min Temp</option>
                </select>
            </div>
            
            <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 border border-border rounded-lg text-sm font-medium text-foreground transition-colors ml-auto shadow-sm">
                <Filter className="w-4 h-4" />
                More Filters
            </button>
        </div>
    );
}
