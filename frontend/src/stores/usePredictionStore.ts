import { create } from 'zustand';


interface PredictionState {
    activeForecastHorizon: 1 | 3 | 7 | 15 | 30;
    selectedPredictionId: string | null;
    comparisonMode: boolean;
    comparisonIds: [string | null, string | null];
    
    // Actions
    setForecastHorizon: (days: 1 | 3 | 7 | 15 | 30) => void;
    selectPrediction: (id: string | null) => void;
    setComparisonMode: (active: boolean) => void;
    setComparisonId: (index: 0 | 1, id: string | null) => void;
}

export const usePredictionStore = create<PredictionState>((set) => ({
    activeForecastHorizon: 7,
    selectedPredictionId: null,
    comparisonMode: false,
    comparisonIds: [null, null],

    setForecastHorizon: (days) => set({ activeForecastHorizon: days }),
    
    selectPrediction: (id) => set({ selectedPredictionId: id }),
    
    setComparisonMode: (active) => set({ comparisonMode: active }),
    
    setComparisonId: (index, id) => set((state) => {
        const newIds = [...state.comparisonIds] as [string | null, string | null];
        newIds[index] = id;
        return { comparisonIds: newIds };
    })
}));
