import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { PianoExperience } from './components/PianoExperience';

function App() {
    const [view, setView] = useState<'landing' | 'experience'>('landing');

    return (
        <main className="w-full min-h-screen bg-obsidian">
            {view === 'landing' ? (
                <LandingPage onStart={() => setView('experience')} />
            ) : (
                <PianoExperience onBack={() => setView('landing')} />
            )}
        </main>
    );
}

export default App;
