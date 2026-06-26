'use client';

import React, { useEffect, useRef, memo } from 'react';
import { useReplayStore } from '@/stores/useReplayStore';
import { Play, Pause, SkipBack, SkipForward, FastForward, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const Timeline = memo(function Timeline() {
    const { 
        isPlaying, 
        currentDate, 
        playbackSpeed, 
        startDate, 
        endDate,
        setIsPlaying, 
        setCurrentDate, 
        setPlaybackSpeed, 
        stepForward, 
        stepBackward 
    } = useReplayStore();

    const playInterval = useRef<NodeJS.Timeout | null>(null);

    // Calculate progress percentage
    const startMs = new Date(startDate).getTime();
    const endMs = new Date(endDate).getTime();
    const currentMs = new Date(currentDate).getTime();
    const progressPercent = Math.max(0, Math.min(100, ((currentMs - startMs) / (endMs - startMs)) * 100));

    // Handle playback loop
    useEffect(() => {
        if (isPlaying) {
            playInterval.current = setInterval(() => {
                stepForward(1);
            }, 1000 / playbackSpeed);
        } else {
            if (playInterval.current) clearInterval(playInterval.current);
        }

        return () => {
            if (playInterval.current) clearInterval(playInterval.current);
        };
    }, [isPlaying, playbackSpeed, stepForward]);

    const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        const newTimeMs = startMs + ((endMs - startMs) * (val / 100));
        const newDateStr = new Date(newTimeMs).toISOString().split('T')[0];
        setCurrentDate(newDateStr);
    };

    const togglePlay = () => {
        if (!isPlaying && currentMs >= endMs) {
            // Restart if at the end
            setCurrentDate(startDate);
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="bg-card/90 backdrop-blur-md border border-border rounded-xl shadow-lg p-4 flex flex-col gap-3">
            {/* Top Bar: Controls & Date Display */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => stepBackward(1)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
                        title="Previous Day"
                    >
                        <SkipBack className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={togglePlay}
                        className="p-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-colors shadow-sm"
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" fill="currentColor" />}
                    </button>
                    <button 
                        onClick={() => stepForward(1)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
                        title="Next Day"
                    >
                        <SkipForward className="w-4 h-4" />
                    </button>
                    
                    <div className="h-6 w-px bg-border mx-2" />
                    
                    <button 
                        onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 2 : playbackSpeed === 2 ? 5 : 1)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                    >
                        <FastForward className="w-3.5 h-3.5" />
                        {playbackSpeed}x
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-md border border-border">
                        <Info className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-sm font-semibold tracking-wider font-mono text-foreground">{currentDate}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Timeline Scrubber */}
            <div className="relative pt-2 pb-1 group cursor-pointer">
                <input 
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progressPercent}
                    onChange={handleScrub}
                    aria-label="Timeline Scrubber"
                    aria-valuenow={progressPercent}
                    className="w-full absolute inset-0 z-10 opacity-0 cursor-pointer"
                />
                
                {/* Track Background */}
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    {/* Progress Fill */}
                    <motion.div 
                        className="h-full bg-primary"
                        style={{ width: `${progressPercent}%` }}
                        layout
                    />
                </div>
                
                {/* Tick marks (rough approximation for 30 days) */}
                <div className="absolute top-5 inset-x-0 flex justify-between px-1 pointer-events-none">
                    <span className="text-[10px] text-muted-foreground">{startDate}</span>
                    <span className="text-[10px] text-muted-foreground">{endDate}</span>
                </div>
            </div>
        </div>
    );
});
