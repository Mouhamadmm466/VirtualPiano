import { NormalizedLandmark } from '@mediapipe/hands';
import { FingerName, HandLandmarks, GestureEvent, NoteMapping, DEFAULT_NOTE_MAPPING } from '../types';

/**
 * GestureEngine - Detects finger tap gestures and maps to piano notes
 */
export class GestureEngine {
    private previousPositions: Map<FingerName, { y: number; timestamp: number }> = new Map();
    private activeFingers: Set<FingerName> = new Set();
    private noteMapping: NoteMapping = DEFAULT_NOTE_MAPPING;

    // Gesture detection thresholds
    private readonly VELOCITY_THRESHOLD = 0.015; // Minimum downward velocity to trigger
    private readonly ACTIVATION_PLANE = 0.5; // Y-position threshold (0-1, where 0 is top)
    private readonly COOLDOWN_MS = 150; // Minimum time between triggers for same finger

    private lastTriggerTime: Map<FingerName, number> = new Map();

    /**
     * Process hand landmarks and detect tap gestures
     */
    processLandmarks(landmarks: NormalizedLandmark[]): GestureEvent[] {
        const events: GestureEvent[] = [];
        const currentTime = Date.now();

        // Extract finger tip landmarks
        const fingerTips = this.extractFingerTips(landmarks);

        // Check each finger for tap gesture
        for (const [finger, current] of Object.entries(fingerTips)) {
            const fingerName = finger as FingerName;
            const previous = this.previousPositions.get(fingerName);

            if (previous) {
                const deltaY = current.y - previous.y;
                const deltaTime = (currentTime - previous.timestamp) / 1000; // Convert to seconds
                const velocity = deltaY / deltaTime;

                // Check if finger is moving down fast enough and crossed activation plane
                const isMovingDown = velocity > this.VELOCITY_THRESHOLD;
                const crossedPlane = current.y > this.ACTIVATION_PLANE && previous.y <= this.ACTIVATION_PLANE;

                // Check cooldown
                const lastTrigger = this.lastTriggerTime.get(fingerName) || 0;
                const cooledDown = currentTime - lastTrigger > this.COOLDOWN_MS;

                if (isMovingDown && crossedPlane && cooledDown && !this.activeFingers.has(fingerName)) {
                    // Trigger detected!
                    const note = this.noteMapping[fingerName];
                    const normalizedVelocity = Math.min(1, velocity / 0.05); // Normalize to 0-1

                    events.push({
                        finger: fingerName,
                        note,
                        velocity: normalizedVelocity,
                        timestamp: currentTime,
                    });

                    this.activeFingers.add(fingerName);
                    this.lastTriggerTime.set(fingerName, currentTime);
                }

                // Release detection (finger moved back up)
                if (current.y < this.ACTIVATION_PLANE && this.activeFingers.has(fingerName)) {
                    this.activeFingers.delete(fingerName);
                }
            }

            // Update previous position
            this.previousPositions.set(fingerName, {
                y: current.y,
                timestamp: currentTime,
            });
        }

        return events;
    }

    /**
     * Extract finger tip landmarks from hand landmarks
     * MediaPipe hand landmarks indices:
     * - Thumb tip: 4
     * - Index tip: 8
     * - Middle tip: 12
     * - Ring tip: 16
     * - Pinky tip: 20
     */
    private extractFingerTips(landmarks: NormalizedLandmark[]): HandLandmarks {
        return {
            thumb: landmarks[4],
            index: landmarks[8],
            middle: landmarks[12],
            ring: landmarks[16],
            pinky: landmarks[20],
        };
    }

    /**
     * Update note mapping
     */
    setNoteMapping(mapping: NoteMapping): void {
        this.noteMapping = mapping;
    }

    /**
     * Get currently active fingers
     */
    getActiveFingers(): FingerName[] {
        return Array.from(this.activeFingers);
    }

    /**
     * Reset gesture state
     */
    reset(): void {
        this.previousPositions.clear();
        this.activeFingers.clear();
        this.lastTriggerTime.clear();
    }
}
