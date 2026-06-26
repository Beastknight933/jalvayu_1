'use client';

import React, { useEffect } from 'react';
import { usePredictionStore } from '@/stores/usePredictionStore';
import { motion } from 'framer-motion';
import { FilterBar } from '@/components/widgets/FilterBar';
import { InsightCard } from '@/components/widgets/InsightCard';
import { LineChart } from '@/components/charts/LineChart';
import { CloudRain, ThermometerSun, BrainCircuit, Activity } from 'lucide-react';
import { Badge } from '@/components/widgets/Badge';
import { wsService } from '@/api/websocket';

export default function PredictionsPage() {
    const { activeForecastHorizon, setForecastHorizon } = usePredictionStore();
    
    // Mock data for the chart if backend fails
    const mockChartData = Array.from({ length: activeForecastHorizon }).map((_, i) => ({
        name: `Day ${i+1}`,
        value: 20 + Math.sin(i) * 5,
        lower: 18 + Math.sin(i) * 5,
        upper: 22 + Math.sin(i) * 5
    }));



    useEffect(() => {
        wsService.subscribe('prediction_complete', () => {});
        return () => wsService.unsubscribe('prediction_complete', () => {});
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 h-full"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">AI Prediction Center</h1>
                    <p className="text-muted-foreground text-sm mt-1">Real-time climate forecasting and predictive insights.</p>
                </div>
                <div className="flex items-center gap-2">
                    {[1, 3, 7, 15, 30].map(days => (
                        <button
                            key={days}
                            onClick={() => setForecastHorizon(days as unknown as 1 | 3 | 7 | 15 | 30)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeForecastHorizon === days 
                                    ? 'bg-primary text-primary-foreground shadow-sm' 
                                    : 'bg-card text-muted-foreground border border-border hover:bg-secondary'
                            }`}
                        >
                            {days} Day{days > 1 && 's'}
                        </button>
                    ))}
                </div>
            </div>

            <FilterBar />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <InsightCard 
                    title="Latest Rainfall" 
                    icon={CloudRain} 
                    primaryText="15.2 mm" 
                    secondaryText="+4.1 mm (vs Avg)" 
                    tertiaryText="Confidence: 94%" 
                    highlightColor="text-blue-500" 
                />
                <InsightCard 
                    title="Max Temperature" 
                    icon={ThermometerSun} 
                    primaryText="34.5 °C" 
                    secondaryText="-1.2 °C (vs Avg)" 
                    tertiaryText="Confidence: 89%" 
                    highlightColor="text-amber-500" 
                />
                <InsightCard 
                    title="Prediction Model" 
                    icon={BrainCircuit} 
                    primaryText="Spatial-LSTM v4.2" 
                    tertiaryText="Last trained: 2 hrs ago" 
                    highlightColor="text-purple-500" 
                />
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm text-muted-foreground">Engine Status</h4>
                        <Activity className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                        <Badge variant="success" className="mb-2">Processing Active</Badge>
                        <p className="text-xs text-muted-foreground">Inference Time: 124ms / grid</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                <LineChart data={mockChartData} title={`Rainfall Forecast (${activeForecastHorizon} Days)`} color="#3b82f6" height={350} />
                <LineChart data={mockChartData.map(d => ({...d, value: d.value + 20}))} title={`Max Temp Forecast (${activeForecastHorizon} Days)`} color="#f59e0b" height={350} />
            </div>
        </motion.div>
    );
}
