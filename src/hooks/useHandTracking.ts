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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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
        if (!videoRef.current || isTracking || isLoading) return;

        setIsLoading(true);
        setError(null);
        console.log('Starting hand tracking initialization...');

        const initTimeout = setTimeout(() => {
            if (isLoading) {
                setError('Initialization timed out. Please check your camera permissions and refresh.');
                stopTracking();
            }
        }, 15000); // 15 second timeout

        try {
            // 1. Initialize audio engine
            console.log('Initializing audio engine...');
            await audioEngine.initialize();
            console.log('Audio engine initialized successfully');

            // 2. Request camera access manually to ensure it's active
            console.log('Requesting camera access...');
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                }
            });

            videoRef.current.srcObject = stream;

            // Wait for video to be ready
            await new Promise<void>((resolve) => {
                if (!videoRef.current) return;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play();
                    resolve();
                };
            });
            console.log('Camera stream active and video playing');

            // 3. Initialize hand tracking
            console.log('Initializing hand tracking service...');
            handTrackingRef.current = new HandTrackingService();
            await handTrackingRef.current.initialize(
                videoRef.current,
                handleResults
            );
            console.log('Hand tracking service initialized successfully');

            clearTimeout(initTimeout);
            setIsTracking(true);
        } catch (err) {
            console.error('Failed to start tracking:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(`Failed to start: ${errorMessage}. Please ensure camera access is granted.`);
            stopTracking();
        } finally {
            setIsLoading(false);
            clearTimeout(initTimeout);
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
        isLoading,
        error,
        fps,
        activeNotes,
        lastResults,
        startTracking,
        stopTracking,
    };
}
