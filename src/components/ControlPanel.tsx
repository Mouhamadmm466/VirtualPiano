import { cn } from '../lib/utils';

interface ControlPanelProps {
    isTracking: boolean;
    isLoading: boolean;
    error: string | null;
    onStart: () => void;
    onStop: () => void;
}

/**
 * Control panel for starting/stopping the piano
 */
export function ControlPanel({ isTracking, isLoading, error, onStart, onStop }: ControlPanelProps) {
    const handleDemo = () => {
        // Direct user to a demo video or show a demo mode
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // Placeholder for demo
    };

    return (
        <div className={cn(
            "absolute inset-0 flex items-center justify-center pointer-events-none z-50 transition-all duration-700",
            isTracking ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto"
        )}>
            {!isTracking && (
                <div className="text-center max-w-2xl px-6">
                    <div className="mb-2 inline-block px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-xs font-bold tracking-[0.2em] uppercase animate-pulse">
                        Next-Gen Musical Instrument
                    </div>
                    <h1 className="text-7xl md:text-8xl font-black font-['Orbitron'] text-glow text-white mb-6 tracking-tighter">
                        VIRTUAL<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">PIANO</span>
                    </h1>
                    <p className="text-gray-400 mb-10 text-lg md:text-xl font-light leading-relaxed">
                        Experience the future of music. Play high-fidelity piano notes using advanced hand-tracking technology. No hardware required—just your hands and your imagination.
                    </p>

                    {error && (
                        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm backdrop-blur-md animate-shake">
                            <p className="font-bold mb-1 flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                Initialization Error
                            </p>
                            <p className="opacity-80">{error}</p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={onStart}
                            disabled={isLoading}
                            className={cn(
                                "group relative px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 min-w-[240px] overflow-hidden",
                                "bg-white text-black hover:text-white",
                                "active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                                "font-['Orbitron'] flex items-center justify-center gap-3"
                            )}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 flex items-center gap-3">
                                {isLoading ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full animate-spin group-hover:border-white/20 group-hover:border-t-white" />
                                        INITIALIZING...
                                    </>
                                ) : (
                                    <>🎹 START PLAYING</>
                                )}
                            </span>
                        </button>

                        <button
                            onClick={handleDemo}
                            className={cn(
                                "px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 min-w-[200px]",
                                "bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40",
                                "active:scale-95 font-['Orbitron']"
                            )}
                        >
                            📺 WATCH DEMO
                        </button>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="text-xs font-bold tracking-widest uppercase">Powered by MediaPipe</div>
                        <div className="text-xs font-bold tracking-widest uppercase">Tone.js Audio</div>
                        <div className="text-xs font-bold tracking-widest uppercase">Vite React</div>
                    </div>
                </div>
            )}

            {isTracking && (
                <div className="absolute bottom-10 right-10 pointer-events-auto">
                    <button
                        onClick={onStop}
                        className={cn(
                            "group px-6 py-3 rounded-xl font-bold transition-all duration-300",
                            "bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white",
                            "hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]",
                            "active:scale-95 font-['Orbitron'] text-sm tracking-widest"
                        )}
                    >
                        STOP SESSION
                    </button>
                </div>
            )}
        </div>
    );
}
