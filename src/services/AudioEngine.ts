import * as Tone from 'tone';

/**
 * AudioEngine - Manages Web Audio API via Tone.js
 * Provides low-latency polyphonic piano synthesis
 */
class AudioEngine {
    private synth: Tone.PolySynth;
    private isInitialized = false;
    private activeNotes = new Set<string>();

    constructor() {
        // Create a polyphonic synthesizer with piano-like settings
        this.synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: 'triangle',
            },
            envelope: {
                attack: 0.005,
                decay: 0.1,
                sustain: 0.3,
                release: 1,
            },
        }).toDestination();

        // Add reverb for richness
        const reverb = new Tone.Reverb({
            decay: 2,
            wet: 0.2,
        }).toDestination();

        this.synth.connect(reverb);
    }

    /**
     * Initialize audio context (must be called after user interaction)
     */
    async initialize(): Promise<void> {
        if (this.isInitialized) return;

        await Tone.start();
        this.isInitialized = true;
        console.log('Audio engine initialized');
    }

    /**
     * Trigger a note with velocity
     */
    triggerNote(note: string, velocity: number = 0.8): void {
        if (!this.isInitialized) {
            console.warn('Audio engine not initialized');
            return;
        }

        // Normalize velocity to 0-1 range
        const normalizedVelocity = Math.max(0.1, Math.min(1, velocity));

        // Trigger attack
        this.synth.triggerAttack(note, undefined, normalizedVelocity);
        this.activeNotes.add(note);
    }

    /**
     * Release a note
     */
    releaseNote(note: string): void {
        if (!this.isInitialized) return;

        this.synth.triggerRelease(note);
        this.activeNotes.delete(note);
    }

    /**
     * Play a note for a specific duration
     */
    playNote(note: string, duration: string = '8n', velocity: number = 0.8): void {
        if (!this.isInitialized) {
            console.warn('Audio engine not initialized');
            return;
        }

        const normalizedVelocity = Math.max(0.1, Math.min(1, velocity));
        this.synth.triggerAttackRelease(note, duration, undefined, normalizedVelocity);
    }

    /**
     * Stop all active notes
     */
    stopAll(): void {
        this.synth.releaseAll();
        this.activeNotes.clear();
    }

    /**
     * Get currently active notes
     */
    getActiveNotes(): string[] {
        return Array.from(this.activeNotes);
    }

    /**
     * Check if audio is initialized
     */
    get initialized(): boolean {
        return this.isInitialized;
    }
}

// Export singleton instance
export const audioEngine = new AudioEngine();
