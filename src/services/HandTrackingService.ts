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

        try {
            console.log('Initializing MediaPipe Hands...');
            // Initialize Hands
            this.hands = new Hands({
                locateFile: (file) => {
                    const url = `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
                    return url;
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

            // Use a requestAnimationFrame loop instead of the Camera helper for more control
            const processFrame = async () => {
                if (!this.hands || !videoElement.paused && !videoElement.ended) {
                    try {
                        await this.hands?.send({ image: videoElement });
                    } catch (err) {
                        console.error('Error processing frame:', err);
                    }
                }
                if (this.hands) {
                    requestAnimationFrame(processFrame);
                }
            };

            console.log('Starting frame processing loop...');
            requestAnimationFrame(processFrame);
            console.log('Hand tracking initialized successfully');
        } catch (error) {
            console.error('Error in HandTrackingService.initialize:', error);
            throw error;
        }
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
