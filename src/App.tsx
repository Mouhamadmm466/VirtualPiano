import { useHandTracking } from './hooks/useHandTracking';
import { PianoCanvas } from './components/PianoCanvas';
import { HUD } from './components/HUD';
import { ControlPanel } from './components/ControlPanel';

function App() {
    const {
        videoRef,
        isTracking,
        fps,
        activeNotes,
        lastResults,
        startTracking,
        stopTracking,
    } = useHandTracking();

    return (
        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
            {/* Video element (hidden, used for MediaPipe) */}
            <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }} // Mirror for natural interaction
                autoPlay
                playsInline
                muted
            />

            {/* Canvas overlay for hand skeleton */}
            <PianoCanvas results={lastResults} activeNotes={activeNotes} />

            {/* HUD overlay */}
            <HUD fps={fps} activeNotes={activeNotes} isTracking={isTracking} />

            {/* Control panel */}
            <ControlPanel
                isTracking={isTracking}
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
