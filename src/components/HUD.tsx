import { cn } from '../lib/utils';

interface HUDProps {
    fps: number;
    activeNotes: string[];
    isTracking: boolean;
}

/**
 * Futuristic HUD overlay showing FPS and active notes
 */
export function HUD({ fps, activeNotes, isTracking }: HUDProps) {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-6">
            {/* Top bar */}
            <div className="flex justify-between items-start">
                {/* FPS Counter */}
                <div className="glass-effect rounded-lg px-4 py-2">
                    <div className="text-xs text-gray-400 uppercase tracking-wider">FPS</div>
                    <div className={cn(
                        "text-2xl font-bold font-['Orbitron'] text-glow",
                        fps >= 30 ? "text-neon-green" : fps >= 20 ? "text-yellow-400" : "text-red-500"
                    )}>
                        {fps}
                    </div>
                </div>

                {/* Status */}
                <div className="glass-effect rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "w-2 h-2 rounded-full",
                            isTracking ? "bg-neon-green animate-pulse" : "bg-gray-500"
                        )} />
                        <span className="text-sm font-medium">
                            {isTracking ? 'TRACKING' : 'STANDBY'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Active Notes Display */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="glass-effect rounded-2xl px-8 py-4 min-w-[300px]">
                    <div className="text-xs text-gray-400 uppercase tracking-wider text-center mb-2">
                        Active Notes
                    </div>
                    <div className="flex justify-center items-center gap-3 min-h-[40px]">
                        {activeNotes.length > 0 ? (
                            activeNotes.map((note, index) => (
                                <div
                                    key={`${note}-${index}`}
                                    className="bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg px-4 py-2 animate-glow"
                                >
                                    <span className="text-xl font-bold font-['Orbitron'] text-white">
                                        {note}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <span className="text-gray-500 text-sm">No notes playing</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Finger Guide */}
            <div className="absolute bottom-6 right-6 glass-effect rounded-lg px-4 py-3">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Finger Mapping
                </div>
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between gap-4">
                        <span className="text-gray-300">👍 Thumb</span>
                        <span className="text-neon-blue font-['Orbitron']">C4</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-gray-300">☝️ Index</span>
                        <span className="text-neon-purple font-['Orbitron']">D4</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-gray-300">🖕 Middle</span>
                        <span className="text-neon-pink font-['Orbitron']">E4</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-gray-300">💍 Ring</span>
                        <span className="text-neon-green font-['Orbitron']">F4</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-gray-300">🤙 Pinky</span>
                        <span className="text-yellow-400 font-['Orbitron']">G4</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
