import { useHandTracking } from '../hooks/useHandTracking';
import { PianoCanvas } from './PianoCanvas';
import { HUD } from './HUD';
import { ControlPanel } from './ControlPanel';
import { cn } from '../lib/utils';

interface PianoExperienceProps {
    onBack: () => void;
}

export function PianoExperience({ onBack }: PianoExperienceProps) {
    const {
        videoRef,
        isTracking,
        isLoading,
        error,
        fps,
        activeNotes,
        lastResults,
        startTracking,
        stopTracking,
    } = useHandTracking();

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
            {/* Back Button */}
            <button
                onClick={() => {
                    stopTracking();
                    onBack();
                }}
                className="absolute top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white/10 transition-all group"
            >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-bold tracking-widest font-orbitron">EXIT</span>
            </button>

            {/* Video element (hidden, used for MediaPipe) */}
            <video
                ref={videoRef}
                className={cn(
                    "absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000",
                    isTracking ? "opacity-100" : "opacity-0"
                )}
                style={{ transform: 'scaleX(-1)' }} // Mirror for natural interaction
                autoPlay
                playsInline
                muted
            />

            {/* Canvas overlay for hand skeleton */}
            <PianoCanvas results={lastResults} activeNotes={activeNotes} />

            {/* HUD overlay - only show when tracking */}
            <div className={cn(
                "transition-opacity duration-500",
                isTracking ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
                <HUD fps={fps} activeNotes={activeNotes} isTracking={isTracking} />
            </div>

            {/* Control panel */}
            <ControlPanel
                isTracking={isTracking}
                isLoading={isLoading}
                error={error}
                onStart={startTracking}
                onStop={stopTracking}
            />

            {/* Background effects when not tracking */}
            {!isTracking && (
                <div className="absolute inset-0 pointer-events-none mesh-gradient opacity-50" />
            )}

            {/* Ambient Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neon-blue opacity-5 blur-[150px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-purple opacity-5 blur-[150px] rounded-full animate-pulse-slow" />
            </div>
        </div>
    );
}
