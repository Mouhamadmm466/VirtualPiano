export type FingerName = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';

export interface FingerLandmark {
    x: number;
    y: number;
    z: number;
}

export interface HandLandmarks {
    thumb: FingerLandmark;
    index: FingerLandmark;
    middle: FingerLandmark;
    ring: FingerLandmark;
    pinky: FingerLandmark;
}

export interface GestureEvent {
    finger: FingerName;
    note: string;
    velocity: number;
    timestamp: number;
}

export interface NoteMapping {
    [key: string]: string; // finger name -> note
}

export const DEFAULT_NOTE_MAPPING: NoteMapping = {
    thumb: 'C4',
    index: 'D4',
    middle: 'E4',
    ring: 'F4',
    pinky: 'G4',
};
