import { useHandTracking } from './hooks/useHandTracking';
import { PianoCanvas } from './components/PianoCanvas';
import { HUD } from './components/HUD';
import { ControlPanel } from './components/ControlPanel';
import { cn } from './lib/utils';

function App() {
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
        <div className="relative w-full h-full bg-black overflow-hidden">
            {/* Premium Background for Landing */}
            <div className={cn(
                "absolute inset-0 transition-all duration-1000 ease-in-out",
                isTracking ? "opacity-0 scale-110 blur-xl" : "opacity-100 scale-100 blur-0"
            )}>
                <img
                    src="/landing-bg.png"
                    alt="Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
            </div>

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

            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-neon-blue opacity-10 blur-[100px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple opacity-10 blur-[100px] rounded-full animate-pulse-slow" />
            </div>
        </div>
    );
}

export default App;
