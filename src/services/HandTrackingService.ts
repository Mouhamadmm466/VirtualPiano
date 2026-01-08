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
            // Initialize Hands with defensive check for constructor
            const HandsConstructor = (Hands as any).Hands || Hands;
            if (typeof HandsConstructor !== 'function') {
                throw new Error('MediaPipe Hands constructor not found. Check if the library is loaded correctly.');
            }

            const handsInstance = new HandsConstructor({
                locateFile: (file: string) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
                },
            });

            this.hands = handsInstance;

            handsInstance.setOptions({
                maxNumHands: 2,
                modelComplexity: 1,
                minDetectionConfidence: 0.7,
                minTrackingConfidence: 0.5,
            });

            handsInstance.onResults((results: Results) => {
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
