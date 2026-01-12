import { Navbar } from './Navbar';

interface LandingPageProps {
    onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-obsidian text-white overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero_background.png"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-obsidian/20 via-transparent to-obsidian" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter animate-reveal opacity-0" style={{ animationDelay: '0.2s' }}>
                        THE FUTURE OF <br />
                        <span className="text-gradient">PERFORMANCE</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-reveal opacity-0" style={{ animationDelay: '0.4s' }}>
                        Experience the fusion of artificial intelligence and classical music.
                        Play a professional-grade piano using only your hands in the air.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-reveal opacity-0" style={{ animationDelay: '0.6s' }}>
                        <button
                            onClick={onStart}
                            className="btn-primary group"
                        >
                            START EXPERIENCE
                            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button className="btn-secondary">
                            WATCH DEMO
                        </button>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 px-6 relative z-10 mesh-gradient">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">CUTTING-EDGE TECHNOLOGY</h2>
                        <div className="h-1 w-20 bg-neon-blue mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Feature 1 */}
                        <div className="glass-card rounded-3xl p-10 group hover:border-neon-blue/30 transition-all duration-500">
                            <div className="mb-8 overflow-hidden rounded-2xl aspect-video relative">
                                <img
                                    src="/feature_ai_tracking.png"
                                    alt="AI Tracking"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-orbitron text-neon-blue">NEURAL HAND TRACKING</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Powered by MediaPipe's advanced neural networks, our system tracks 21 individual
                                hand landmarks in real-time with sub-millimeter precision.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="glass-card rounded-3xl p-10 group hover:border-neon-purple/30 transition-all duration-500">
                            <div className="mb-8 overflow-hidden rounded-2xl aspect-video relative">
                                <img
                                    src="/feature_audio_engine.png"
                                    alt="Audio Engine"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-orbitron text-neon-purple">HI-FI AUDIO ENGINE</h3>
                            <p className="text-gray-400 leading-relaxed">
                                A custom-built polyphonic synthesizer using Tone.js provides low-latency,
                                studio-quality piano sounds with dynamic velocity and rich reverb.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 bg-obsidian">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                            <span className="text-white font-black text-sm font-orbitron">V</span>
                        </div>
                        <span className="text-lg font-bold font-orbitron tracking-tighter">
                            VIRTUAL<span className="text-neon-blue">PIANO</span>
                        </span>
                    </div>
                    <div className="text-gray-500 text-sm tracking-widest">
                        © 2026 VIRTUAL PIANO LABS. ALL RIGHTS RESERVED.
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">TWITTER</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">GITHUB</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">DISCORD</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
