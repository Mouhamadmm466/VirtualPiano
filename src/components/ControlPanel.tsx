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
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-50">
            {!isTracking && (
                <div className="text-center">
                    <h1 className="text-6xl font-bold font-['Orbitron'] text-glow text-neon-blue mb-4">
                        Virtual Piano
                    </h1>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Play piano notes using your hands. Tap your fingers in the air to create music.
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm max-w-md mx-auto">
                            <p className="font-bold mb-1">Initialization Error</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <button
                        onClick={onStart}
                        disabled={isLoading}
                        className={cn(
                            "px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 min-w-[200px]",
                            "bg-gradient-to-r from-neon-blue to-neon-purple",
                            "hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]",
                            "active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                            "font-['Orbitron'] flex items-center justify-center gap-3 mx-auto"
                        )}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Initializing...
                            </>
                        ) : (
                            <>🎹 Start Playing</>
                        )}
                    </button>
                </div>
            )}

            {isTracking && (
                <button
                    onClick={onStop}
                    className={cn(
                        "px-6 py-3 rounded-lg font-semibold transition-all duration-300",
                        "bg-red-600 hover:bg-red-700",
                        "hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]",
                        "active:scale-95"
                    )}
                >
                    Stop
                </button>
            )}
        </div>
    );
}
