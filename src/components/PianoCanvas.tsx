import { useEffect, useRef } from 'react';
import { Results } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';

interface PianoCanvasProps {
    results: Results | null;
    activeNotes: string[];
}

/**
 * Canvas component for drawing hand skeleton and visual feedback
 */
export function PianoCanvas({ results, activeNotes }: PianoCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set internal resolution to match display size
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        window.addEventListener('resize', resize);
        resize();

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!results || !results.multiHandLandmarks) {
            return () => window.removeEventListener('resize', resize);
        }

        // Draw hand landmarks
        for (const landmarks of results.multiHandLandmarks) {
            // Draw connections (skeleton)
            drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
                color: '#00f0ff',
                lineWidth: 2,
            });

            // Draw landmarks (joints)
            drawLandmarks(ctx, landmarks, {
                color: '#b026ff',
                fillColor: '#ff006e',
                radius: 3,
            });

            // Highlight finger tips when active
            const fingerTipIndices = [4, 8, 12, 16, 20]; // Thumb, Index, Middle, Ring, Pinky
            fingerTipIndices.forEach((index) => {
                const landmark = landmarks[index];
                const x = landmark.x * canvas.width;
                const y = landmark.y * canvas.height;

                // Draw glow effect for active fingers
                ctx.beginPath();
                ctx.arc(x, y, 15, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, y, 8, 0, 2 * Math.PI);
                ctx.fillStyle = '#00ff88';
                ctx.fill();
            });
        }

        return () => window.removeEventListener('resize', resize);
    }, [results, activeNotes]);

    return (
        <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ transform: 'scaleX(-1)' }} // Mirror for natural interaction
        />
    );
}
