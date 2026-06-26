'use client';

import React from 'react';
import { useMapStore } from '@/stores/useMapStore';
import { Layers, Eye, EyeOff } from 'lucide-react';

export function MapControls() {
    const { layers, toggleLayer, setLayerOpacity } = useMapStore();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg shadow-lg overflow-hidden flex flex-col">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center justify-center transition-colors"
                title="Toggle Layers"
            >
                <Layers className="w-5 h-5" />
            </button>
            
            {isOpen && (
                <div className="p-4 w-64 flex flex-col gap-4 border-t border-border">
                    <h4 className="font-medium text-sm text-foreground">Active Layers</h4>
                    <div className="space-y-3">
                        {layers.map(layer => (
                            <div key={layer.id} className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-muted-foreground">{layer.name}</span>
                                    <button 
                                        onClick={() => toggleLayer(layer.id)}
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {layer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                </div>
                                {layer.visible && (
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="1" 
                                        step="0.05"
                                        value={layer.opacity}
                                        onChange={(e) => setLayerOpacity(layer.id, parseFloat(e.target.value))}
                                        className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
