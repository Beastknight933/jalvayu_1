import { create } from 'zustand';

interface ReplayState {
    isPlaying: boolean;
    currentDate: string; // ISO Date string (YYYY-MM-DD)
    playbackSpeed: number; // multiplier e.g., 1x, 2x, 5x
    startDate: string;
    endDate: string;
    
    // Actions
    setIsPlaying: (playing: boolean) => void;
    setCurrentDate: (date: string) => void;
    setPlaybackSpeed: (speed: number) => void;
    setTimeRange: (start: string, end: string) => void;
    stepForward: (days?: number) => void;
    stepBackward: (days?: number) => void;
}

export const useReplayStore = create<ReplayState>((set, get) => ({
    isPlaying: false,
    currentDate: new Date().toISOString().split('T')[0],
    playbackSpeed: 1,
    // Default to last 30 days
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],

    setIsPlaying: (playing) => set({ isPlaying: playing }),
    
    setCurrentDate: (date) => set({ currentDate: date }),
    
    setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
    
    setTimeRange: (start, end) => set({ startDate: start, endDate: end }),
    
    stepForward: (days = 1) => {
        const { currentDate, endDate } = get();
        const next = new Date(currentDate);
        next.setDate(next.getDate() + days);
        const end = new Date(endDate);
        if (next <= end) {
            set({ currentDate: next.toISOString().split('T')[0] });
        } else {
            // Stop playing if we reach the end
            set({ isPlaying: false });
        }
    },
    
    stepBackward: (days = 1) => {
        const { currentDate, startDate } = get();
        const prev = new Date(currentDate);
        prev.setDate(prev.getDate() - days);
        const start = new Date(startDate);
        if (prev >= start) {
            set({ currentDate: prev.toISOString().split('T')[0] });
        }
    }
}));
