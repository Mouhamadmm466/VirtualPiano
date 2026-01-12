import { cn } from '../lib/utils';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-nav">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center shadow-lg shadow-neon-blue/20">
                        <span className="text-white font-black text-xl font-orbitron">V</span>
                    </div>
                    <span className="text-xl font-bold font-orbitron tracking-tighter">
                        VIRTUAL<span className="text-neon-blue">PIANO</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">EXPERIENCE</a>
                    <a href="#" className="hover:text-white transition-colors">TECHNOLOGY</a>
                    <a href="#" className="hover:text-white transition-colors">ABOUT</a>
                </div>

                <button className="px-6 py-2 rounded-full border border-white/10 hover:border-white/30 transition-all text-sm font-bold tracking-widest">
                    CONNECT
                </button>
            </div>
        </nav>
    );
}
