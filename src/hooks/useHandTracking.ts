import { useEffect, useRef, useState } from 'react';
import { Results } from '@mediapipe/hands';
import { HandTrackingService } from '../services/HandTrackingService';
import { GestureEngine } from '../services/GestureEngine';
import { audioEngine } from '../services/AudioEngine';

/**
 * Custom hook to manage hand tracking and gesture detection
 */
export function useHandTracking() {
    const [isTracking, setIsTracking] = useState(false);
    const [fps, setFps] = useState(0);
    const [activeNotes, setActiveNotes] = useState<string[]>([]);
    const [lastResults, setLastResults] = useState<Results | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const handTrackingRef = useRef<HandTrackingService | null>(null);
    const gestureEngineRef = useRef<GestureEngine>(new GestureEngine());
    const fpsCounterRef = useRef({ frames: 0, lastTime: Date.now() });

    /**
     * Start hand tracking
     */
    const startTracking = async () => {
        if (!videoRef.current || isTracking) return;

        try {
            // Initialize audio engine
            await audioEngine.initialize();

            // Initialize hand tracking
            handTrackingRef.current = new HandTrackingService();
            await handTrackingRef.current.initialize(
                videoRef.current,
                handleResults
            );

            setIsTracking(true);
        } catch (error) {
            console.error('Failed to start tracking:', error);
        }
    };

    /**
     * Stop hand tracking
     */
    const stopTracking = () => {
        if (handTrackingRef.current) {
            handTrackingRef.current.stop();
            handTrackingRef.current = null;
        }
        gestureEngineRef.current.reset();
        audioEngine.stopAll();
        setIsTracking(false);
    };

    /**
     * Handle MediaPipe results
     */
    const handleResults = (results: Results) => {
        setLastResults(results);

        // Update FPS counter
        const now = Date.now();
        fpsCounterRef.current.frames++;
        if (now - fpsCounterRef.current.lastTime >= 1000) {
            setFps(fpsCounterRef.current.frames);
            fpsCounterRef.current.frames = 0;
            fpsCounterRef.current.lastTime = now;
        }

        // Process gestures if hands detected
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            // Process first hand only for now
            const landmarks = results.multiHandLandmarks[0];
            const events = gestureEngineRef.current.processLandmarks(landmarks);

            // Trigger audio for detected gestures
            events.forEach((event) => {
                audioEngine.playNote(event.note, '8n', event.velocity);
            });

            // Update active notes display
            setActiveNotes(audioEngine.getActiveNotes());
        }
    };

    /**
     * Cleanup on unmount
     */
    useEffect(() => {
        return () => {
            stopTracking();
        };
    }, []);

    return {
        videoRef,
        isTracking,
        fps,
        activeNotes,
        lastResults,
        startTracking,
        stopTracking,
    };
}
