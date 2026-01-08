import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

/**
 * HandTrackingService - Manages MediaPipe Hands for real-time tracking
 */
export class HandTrackingService {
    private hands: Hands | null = null;
    private camera: Camera | null = null;
    private onResultsCallback: ((results: Results) => void) | null = null;

    /**
     * Initialize MediaPipe Hands
     */
    async initialize(
        videoElement: HTMLVideoElement,
        onResults: (results: Results) => void
    ): Promise<void> {
        this.onResultsCallback = onResults;

        // Initialize Hands
        this.hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            },
        });

        this.hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.5,
        });

        this.hands.onResults((results: Results) => {
            if (this.onResultsCallback) {
                this.onResultsCallback(results);
            }
        });

        // Initialize camera
        this.camera = new Camera(videoElement, {
            onFrame: async () => {
                if (this.hands) {
                    await this.hands.send({ image: videoElement });
                }
            },
            width: 1280,
            height: 720,
        });

        await this.camera.start();
        console.log('Hand tracking initialized');
    }

    /**
     * Stop tracking
     */
    stop(): void {
        if (this.camera) {
            this.camera.stop();
        }
        if (this.hands) {
            this.hands.close();
        }
    }

    /**
     * Update tracking options
     */
    updateOptions(options: {
        maxNumHands?: number;
        modelComplexity?: 0 | 1;
        minDetectionConfidence?: number;
        minTrackingConfidence?: number;
    }): void {
        if (this.hands) {
            this.hands.setOptions(options);
        }
    }
}
