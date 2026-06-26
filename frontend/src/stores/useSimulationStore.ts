import { create } from 'zustand';
import { SimulationJob } from '@/api/simulations';

interface SimulationState {
    activeSimulations: Record<string, SimulationJob>;
    liveLogs: Record<string, string[]>;
    
    // Actions
    updateSimulation: (sim: SimulationJob) => void;
    appendLog: (simId: string, log: string) => void;
    clearSimulation: (simId: string) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
    activeSimulations: {},
    liveLogs: {},

    updateSimulation: (sim) => set((state) => ({
        activeSimulations: {
            ...state.activeSimulations,
            [sim.id]: sim
        }
    })),

    appendLog: (simId, log) => set((state) => ({
        liveLogs: {
            ...state.liveLogs,
            [simId]: [...(state.liveLogs[simId] || []), log].slice(-100) // Keep last 100 logs
        }
    })),

    clearSimulation: (simId) => set((state) => {
        const restSims = { ...state.activeSimulations };
        delete restSims[simId];
        const restLogs = { ...state.liveLogs };
        delete restLogs[simId];
        return {
            activeSimulations: restSims,
            liveLogs: restLogs
        };
    })
}));
