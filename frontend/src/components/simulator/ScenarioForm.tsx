'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ParameterSlider } from './ParameterSlider';
import { useRouter } from 'next/navigation';
import { simulationsApi } from '@/api/simulations';

const scenarioSchema = z.object({
    scenario_name: z.string().min(3, "Name must be at least 3 characters").max(50),
    description: z.string().max(200).optional(),
    region: z.string().min(1, "Region is required"),
    duration_days: z.number().min(1).max(365),
    model_name: z.string().min(1),
    dataset_version: z.string().min(1),
    variables: z.object({
        rainfall: z.number().min(-100).max(100),
        temperature: z.number().min(-10).max(10),
    })
});

type ScenarioFormValues = z.infer<typeof scenarioSchema>;

export function ScenarioForm() {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ScenarioFormValues>({
        resolver: zodResolver(scenarioSchema),
        defaultValues: {
            scenario_name: '',
            description: '',
            region: 'all',
            duration_days: 30,
            model_name: 'spatial-lstm-v4',
            dataset_version: 'imd-grid-v2',
            variables: {
                rainfall: 0,
                temperature: 0,
            }
        }
    });

    const onSubmit = async (data: ScenarioFormValues) => {
        try {
            // Submit to backend
            const job = await simulationsApi.create(data);
            // Redirect to dynamic workspace
            router.push(`/dashboard/simulations/${job.id}`);
        } catch (error) {
            console.error('Failed to create simulation', error);
            // In a real app, toast notification here
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-secondary/30">
                <h2 className="text-xl font-bold text-foreground">Scenario Builder</h2>
                <p className="text-sm text-muted-foreground mt-1">Define initial conditions and climate perturbations for the simulation engine.</p>
            </div>
            
            <div className="p-6 space-y-6">
                {/* Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Scenario Name <span className="text-destructive">*</span></label>
                        <input 
                            {...register('scenario_name')}
                            className="w-full bg-secondary border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="e.g., Extreme Summer 2030"
                        />
                        {errors.scenario_name && <p className="text-xs text-destructive mt-1">{errors.scenario_name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Target Region <span className="text-destructive">*</span></label>
                        <select 
                            {...register('region')}
                            className="w-full bg-secondary border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="all">All India</option>
                            <option value="north">North India</option>
                            <option value="south">South India</option>
                        </select>
                        {errors.region && <p className="text-xs text-destructive mt-1">{errors.region.message}</p>}
                    </div>
                </div>

                {/* Engine Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-border pt-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">ML Model</label>
                        <select 
                            {...register('model_name')}
                            className="w-full bg-secondary border border-border rounded-md px-4 py-2 text-sm"
                        >
                            <option value="spatial-lstm-v4">Spatial-LSTM v4.2</option>
                            <option value="transformer-v1">Climate Transformer v1.0</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Baseline Dataset</label>
                        <select 
                            {...register('dataset_version')}
                            className="w-full bg-secondary border border-border rounded-md px-4 py-2 text-sm"
                        >
                            <option value="imd-grid-v2">IMD Grid V2 (2025)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Duration (Days)</label>
                        <input 
                            type="number"
                            {...register('duration_days', { valueAsNumber: true })}
                            className="w-full bg-secondary border border-border rounded-md px-4 py-2 text-sm"
                        />
                        {errors.duration_days && <p className="text-xs text-destructive mt-1">{errors.duration_days.message}</p>}
                    </div>
                </div>

                {/* Climate Parameters */}
                <div className="border-t border-border pt-6">
                    <h3 className="text-md font-semibold text-foreground mb-4">Climate Perturbations</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Controller
                            name="variables.temperature"
                            control={control}
                            render={({ field }) => (
                                <ParameterSlider 
                                    label="Temperature Anomaly"
                                    description="Adjust baseline maximum temperature."
                                    value={field.value}
                                    min={-5}
                                    max={5}
                                    step={0.5}
                                    unit="°C"
                                    onChange={field.onChange}
                                    colorClass="accent-amber-500"
                                />
                            )}
                        />
                        <Controller
                            name="variables.rainfall"
                            control={control}
                            render={({ field }) => (
                                <ParameterSlider 
                                    label="Rainfall Adjustment"
                                    description="Percentage change from baseline."
                                    value={field.value}
                                    min={-50}
                                    max={100}
                                    step={5}
                                    unit="%"
                                    onChange={field.onChange}
                                    colorClass="accent-blue-500"
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-border bg-secondary/30 flex justify-end gap-3">
                <button type="button" className="px-4 py-2 rounded-md border border-border bg-card text-sm font-medium text-muted-foreground hover:bg-accent transition-colors">
                    Reset Defaults
                </button>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {isSubmitting ? 'Initializing Engine...' : 'Run Simulation'}
                </button>
            </div>
        </form>
    );
}
