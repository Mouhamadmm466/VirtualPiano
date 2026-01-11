# 🎹 Virtual Piano

<div align="center">

![Virtual Piano Banner](https://img.shields.io/badge/Virtual-Piano-00f0ff?style=for-the-badge&logo=music&logoColor=white)

**Play piano with your hands in the air using AI-powered hand tracking**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[Live Demo](https://your-deployment-url.vercel.app) · [Report Bug](https://github.com/Mouhamadmm466/VirtualPiano/issues) · [Request Feature](https://github.com/Mouhamadmm466/VirtualPiano/issues)

</div>




Experience the magic of playing piano without touching anything! Simply show your hand to your webcam and tap your fingers in the air to create music.

---

## ✨ Features

### 🎯 Core Functionality
- **🖐️ Real-time Hand Tracking** - Powered by MediaPipe Hands for accurate finger detection
- **🎵 Gesture-based Playing** - Tap fingers in the air to play piano notes
- **🎼 Polyphonic Audio** - Play multiple notes simultaneously (chords)
- **⚡ Low Latency** - <50ms audio response time for natural playing experience
- **📊 Performance Monitoring** - Built-in FPS counter to track performance

### 🎨 User Experience
- **🌌 Futuristic UI** - Neon-themed interface with glass morphism effects
- **👁️ Visual Feedback** - Hand skeleton overlay with glowing finger tips
- **📱 Responsive Design** - Works on desktop and mobile devices
- **🔒 Privacy-First** - All processing happens in your browser, no data sent to servers

### 🎹 Finger Mapping
| Finger | Note |
|--------|------|
| 👍 Thumb | C4 |
| ☝️ Index | D4 |
| 🖕 Middle | E4 |
| 💍 Ring | F4 |
| 🤙 Pinky | G4 |

---

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling

### Computer Vision
- **MediaPipe Hands** - Google's ML solution for hand tracking
- **21 hand landmarks** per hand for precise detection
- **30+ FPS** tracking on modern hardware

### Audio
- **Tone.js** - Web Audio API framework
- **Polyphonic synthesis** - Multiple notes at once
- **Velocity-sensitive** - Soft and hard press detection

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- A webcam
- Modern browser (Chrome, Edge, Safari)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/virtual-piano.git
   cd virtual-piano
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   Navigate to http://localhost:5173/
   ```

---

## 🎮 How to Use

1. **Click "Start Playing"** button
2. **Allow camera access** when prompted
3. **Show your hand** to the webcam
4. **Tap fingers downward** in the air to play notes
5. **Experiment** with different finger combinations to create chords!

### Tips for Best Experience
- ✅ Ensure good lighting
- ✅ Keep your full hand visible in the frame
- ✅ Use a plain background (avoid skin-colored backgrounds)
- ✅ Use wired headphones for lowest latency
- ✅ Close other browser tabs for best performance

---

## 🏗️ Project Structure

```
virtual-piano/
├── src/
│   ├── components/          # React components
│   │   ├── PianoCanvas.tsx  # Hand skeleton visualization
│   │   ├── HUD.tsx          # Futuristic overlay UI
│   │   └── ControlPanel.tsx # Start/Stop controls
│   ├── services/            # Core logic
│   │   ├── HandTrackingService.ts  # MediaPipe integration
│   │   ├── GestureEngine.ts        # Tap detection algorithm
│   │   └── AudioEngine.ts          # Tone.js audio synthesis
│   ├── hooks/               # Custom React hooks
│   │   └── useHandTracking.ts
│   ├── types/               # TypeScript definitions
│   ├── lib/                 # Utility functions
│   ├── App.tsx              # Main application
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML entry point
└── package.json             # Dependencies
```

---

## 🧠 How It Works

### Architecture Overview

```
Webcam → MediaPipe Hands → Gesture Engine → Audio Engine → Sound Output
                ↓
         Canvas Renderer → Visual Feedback
```

### Gesture Detection Algorithm

The app uses a **velocity-based tap detection** system:

1. **Track finger positions** over time (Y-axis)
2. **Calculate velocity**: `v = ΔY / Δt`
3. **Detect downward motion**: `v > 0.015` (threshold)
4. **Check activation plane**: Finger crosses `y > 0.5`
5. **Trigger note**: Play corresponding note with velocity
6. **Cooldown**: 150ms delay to prevent double-triggers

---

## 🌐 Deployment

### Deploy to Vercel

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy with Vercel CLI**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

### Environment Variables
No environment variables needed! The app runs entirely client-side.

---

## 🎯 Performance

### Benchmarks
- **Bundle Size**: 138.39 kB (gzipped)
- **Initial Load**: <2 seconds
- **FPS**: 30-60 on desktop, 20-30 on mobile
- **Audio Latency**: <50ms perceived

### Browser Compatibility
- ✅ Chrome 90+ (Recommended)
- ✅ Edge 90+
- ✅ Safari 14+
- ⚠️ Firefox 88+ (reduced performance)

---

## 🛠️ Customization

### Change Note Mapping

Edit `src/types/index.ts`:

```typescript
export const DEFAULT_NOTE_MAPPING: NoteMapping = {
  thumb: 'C4',
  index: 'D4',
  middle: 'E4',
  ring: 'F4',
  pinky: 'G4',
};
```

### Adjust Gesture Sensitivity

Edit `src/services/GestureEngine.ts`:

```typescript
private readonly VELOCITY_THRESHOLD = 0.015; // Increase for harder taps
private readonly ACTIVATION_PLANE = 0.5;     // Adjust tap zone height
private readonly COOLDOWN_MS = 150;          // Re-trigger delay
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [MediaPipe](https://google.github.io/mediapipe/) - Hand tracking technology
- [Tone.js](https://tonejs.github.io/) - Web Audio framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Vite](https://vitejs.dev/) - Build tool

---

## 📧 Contact

**Mouhamad** - GitHub: [@Mouhamadmm466](https://github.com/Mouhamadmm466)

Project Link: [https://github.com/Mouhamadmm466/VirtualPiano](https://github.com/Mouhamadmm466/VirtualPiano)

---

<div align="center">

**Built with ❤️ using Computer Vision + Web Audio**

⭐ Star this repo if you found it helpful!

</div>
