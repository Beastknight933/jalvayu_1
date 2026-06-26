import { create } from 'zustand';

export interface DashboardStats {
    activeSimulations: number;
    processedDatasets: number;
    systemHealth: 'healthy' | 'degraded' | 'unhealthy';
    lastPredictionTime: string | null;
    processingQueue: number;
}

export interface ActivityNotification {
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: string;
    read: boolean;
}

interface DashboardState {
    stats: DashboardStats;
    activities: ActivityNotification[];
    
    // Actions
    updateStats: (stats: Partial<DashboardStats>) => void;
    addActivity: (activity: Omit<ActivityNotification, 'id' | 'read' | 'timestamp'>) => void;
    markActivityRead: (id: string) => void;
    clearActivities: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    stats: {
        activeSimulations: 0,
        processedDatasets: 0,
        systemHealth: 'healthy',
        lastPredictionTime: null,
        processingQueue: 0
    },
    activities: [],

    updateStats: (newStats) =>
        set((state) => ({ stats: { ...state.stats, ...newStats } })),

    addActivity: (activity) =>
        set((state) => ({
            activities: [
                {
                    ...activity,
                    id: Math.random().toString(36).substring(7),
                    timestamp: new Date().toISOString(),
                    read: false
                },
                ...state.activities
            ].slice(0, 50) // Keep last 50 activities
        })),

    markActivityRead: (id) =>
        set((state) => ({
            activities: state.activities.map(a => 
                a.id === id ? { ...a, read: true } : a
            )
        })),

    clearActivities: () => set({ activities: [] }),
}));
