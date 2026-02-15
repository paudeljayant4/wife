/* ═══════════════════════════════════════════════════════════
   OUR UNIVERSE - Enhanced Romantic Celestial Experience
   Design: Deep space romance with ethereal interactions
   Version: 2.0 - Improved & Polished
   ═══════════════════════════════════════════════════════════ */

:root {
  /* Color Palette - Cosmic Romance */
  --night-sky: #0a0e27;
  --deep-space: #1a1d35;
  --midnight-blue: #161b33;
  --nebula-purple: #6b4c9a;
  --nebula-light: #8b6bb7;
  --stardust: #d4a5ff;
  --rose-gold: #f4c2c2;
  --rose-pink: #ff6b9d;
  --moonlight: #e8f4ff;
  --constellation: #ffd700;
  --warm-glow: #ffb347;
  
  /* Typography */
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing & Timing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
  
  --transition-smooth: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --transition-elastic: all 1s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  
  /* Effects */
  --glow-soft: 0 0 20px rgba(212, 165, 255, 0.3);
  --glow-medium: 0 0 40px rgba(212, 165, 255, 0.5);
  --glow-strong: 0 0 60px rgba(212, 165, 255, 0.8);
  --shadow-depth: 0 20px 60px rgba(0, 0, 0, 0.5);
}

/* ═══════════════════════════════════════════════════════════
   BASE STYLES & RESET
   ═══════════════════════════════════════════════════════════ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background: var(--night-sky);
  color: var(--moonlight);
  overflow-x: hidden;
  position: relative;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


/* Accessible no-script fallback */
.noscript-warning {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10001;
  padding: 0.9rem 1rem;
  background: rgba(10, 14, 39, 0.95);
  color: var(--moonlight);
  border-bottom: 1px solid rgba(212, 165, 255, 0.35);
  text-align: center;
  font-size: 0.95rem;
}

button:focus-visible,
.glow-btn:focus-visible,
#audio-control:focus-visible,
#envelope:focus-visible {
  outline: 2px solid var(--rose-gold);
  outline-offset: 3px;
  box-shadow: 0 0 0 6px rgba(244, 194, 194, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

main {
  position: relative;
  z-index: 1;
}

/* ═══════════════════════════════════════════════════════════
   LOADING SCREEN
   ═══════════════════════════════════════════════════════════ */

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--night-sky);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.8s ease;
}

.loading-screen.hidden {
  opacity: 0;
  pointer-events: none;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(212, 165, 255, 0.1);
  border-top-color: var(--stardust);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-md);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ═══════════════════════════════════════════════════════════
   STAR CANVAS BACKGROUND
   ═══════════════════════════════════════════════════════════ */

#star-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.9;
}

/* ═══════════════════════════════════════════════════════════
   SHOOTING STARS 
   ═══════════════════════════════════════════════════════════ */

#shooting-stars-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}


/* ═══════════════════════════════════════════════════════════
   AUDIO CONTROL
   ═══════════════════════════════════════════════════════════ */

.audio-control {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: rgba(26, 29, 53, 0.9);
  border: 2px solid var(--stardust);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 1000;
  transition: var(--transition-smooth);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 5px 20px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(212, 165, 255, 0.3);
  animation: pulseGlow 3s ease-in-out infinite;
}

.audio-control:hover {
  transform: scale(1.1);
  box-shadow: 
    0 8px 30px rgba(0, 0, 0, 0.4),
    0 0 50px rgba(212, 165, 255, 0.6);
  border-color: var(--moonlight);
}

.audio-control:active {
  transform: scale(0.95);
}

.audio-icon {
  position: absolute;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.audio-control .paused {
  opacity: 0;
  transform: scale(0.5);
}

.audio-control.paused .playing {
  opacity: 0;
  transform: scale(0.5);
}

.audio-control.paused .paused {
  opacity: 1;
  transform: scale(1);
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 
      0 5px 20px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(212, 165, 255, 0.3);
  }
  50% {
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(212, 165, 255, 0.5);
  }
}

@media (max-width: 768px) {
  .audio-control {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
}

/* ═══════════════════════════════════════════════════════════
   TYPOGRAPHY
   ═══════════════════════════════════════════════════════════ */

h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
  background: linear-gradient(135deg, var(--moonlight), var(--stardust), var(--nebula-light));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 8s ease infinite;
  filter: drop-shadow(0 0 30px rgba(212, 165, 255, 0.4));
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

h2 {
  font-size: clamp(2rem, 4vw, 3.5rem);
  color: var(--rose-gold);
  text-shadow: 0 0 30px rgba(244, 194, 194, 0.5), 0 0 60px rgba(244, 194, 194, 0.3);
}

h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--stardust);
  margin-bottom: var(--spacing-sm);
  text-shadow: var(--glow-soft);
}

p {
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 300;
  color: var(--moonlight);
  opacity: 0.92;
}

/* ═══════════════════════════════════════════════════════════
   INTRO OVERLAY
   ═══════════════════════════════════════════════════════════ */

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--deep-space), var(--night-sky));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s ease;
}

.overlay.active {
  opacity: 1;
  pointer-events: all;
}

.overlay-card {
  text-align: center;
  padding: var(--spacing-lg) var(--spacing-lg);
  background: rgba(26, 29, 53, 0.85);
  border: 2px solid rgba(212, 165, 255, 0.3);
  border-radius: 24px;
  backdrop-filter: blur(30px);
  box-shadow: 
    var(--shadow-depth),
    0 0 100px rgba(107, 76, 154, 0.3) inset,
    0 0 200px rgba(107, 76, 154, 0.1);
  animation: floatIn 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 500px;
  margin: var(--spacing-md);
}

.heart-icon {
  font-size: 5rem;
  margin-bottom: var(--spacing-md);
  animation: heartbeat 2.5s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 107, 157, 0.6));
}

.overlay-card h1 {
  margin-bottom: var(--spacing-md);
}

.overlay-card p {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-md);
}

@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes heartbeat {
  0%, 100% { 
    transform: scale(1); 
  }
  10% { 
    transform: scale(1.15); 
  }
  20% { 
    transform: scale(1); 
  }
  30% { 
    transform: scale(1.1); 
  }
  40% { 
    transform: scale(1); 
  }
}

/* ═══════════════════════════════════════════════════════════
   BUTTONS
   ═══════════════════════════════════════════════════════════ */

.glow-btn {
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 500;
  padding: 1.125rem 3rem;
  margin-top: var(--spacing-md);
  background: linear-gradient(135deg, var(--nebula-purple), var(--nebula-light), var(--stardust));
  background-size: 200% 200%;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 10px 30px rgba(107, 76, 154, 0.5),
    0 0 0 0 rgba(212, 165, 255, 0.5);
  transition: var(--transition-smooth);
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.glow-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.glow-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50px;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.glow-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 15px 50px rgba(107, 76, 154, 0.7),
    0 0 50px rgba(212, 165, 255, 0.9);
  background-position: 100% 50%;
}

.glow-btn:hover::before {
  width: 400px;
  height: 400px;
}

.glow-btn:hover::after {
  opacity: 1;
}

.glow-btn:active {
  transform: translateY(-1px) scale(1);
}

.secondary-btn {
  background: linear-gradient(135deg, rgba(107, 76, 154, 0.3), rgba(212, 165, 255, 0.3));
  border: 2px solid var(--stardust);
  font-size: 1rem;
  padding: 0.875rem 2rem;
  margin-top: var(--spacing-lg);
}

.secondary-btn:hover {
  background: linear-gradient(135deg, rgba(107, 76, 154, 0.5), rgba(212, 165, 255, 0.5));
  border-color: var(--moonlight);
}

/* ═══════════════════════════════════════════════════════════
   PANELS & SECTIONS
   ═══════════════════════════════════════════════════════════ */

.panel {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-md);
  z-index: 1;
}

.full-screen {
  height: 100vh;
}

/* ═══════════════════════════════════════════════════════════
   OPENING SECTION
   ═══════════════════════════════════════════════════════════ */

#opening {
  text-align: center;
}

.opening-content {
  max-width: 900px;
  margin-bottom: var(--spacing-lg);
}

.typed {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: var(--constellation);
  font-style: italic;
  margin-bottom: var(--spacing-lg);
  opacity: 0;
  animation: fadeInUp 1.2s ease forwards 0.5s;
  position: relative;
}

.typed::after {
  content: '|';
  animation: blink 1s step-end infinite;
}

.typed.finished::after {
  content: '';
}

@keyframes blink {
  50% { opacity: 0; }
}

.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  opacity: 0;
  animation: fadeInUp 1s ease forwards 2.5s, floatUpDown 3s ease-in-out infinite 3.5s;
}

/* Scroll buttons for all sections */
.scroll-btn {
  margin-top: var(--spacing-lg);
  position: relative;
  animation: floatUpDown 3s ease-in-out infinite;
}

/* For full-screen sections, position scroll button at bottom */
.full-screen .scroll-btn {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0;
}

/* Timeline and reasons sections - scroll button after content */
#timeline .scroll-btn,
#reasons-section .scroll-btn {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: var(--spacing-xl);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}

@keyframes floatUpDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

/* ═══════════════════════════════════════════════════════════
   ROSE SECTION
   ═══════════════════════════════════════════════════════════ */

#rose-section {
  text-align: center;
  gap: var(--spacing-md);
}

.section-header {
  margin-bottom: var(--spacing-lg);
  animation: fadeIn 1s ease;
}

.section-header h2 {
  margin-bottom: var(--spacing-sm);
}

.section-header p {
  font-size: 1.125rem;
  opacity: 0.8;
}

#rose-canvas {
  max-width: 550px;
  width: 100%;
  height: 550px;
  cursor: pointer;
  filter: drop-shadow(0 0 30px rgba(244, 194, 194, 0.5));
  transition: var(--transition-smooth);
  border-radius: 50%;
}

#rose-canvas:hover {
  filter: drop-shadow(0 0 60px rgba(244, 194, 194, 0.9));
  transform: scale(1.03);
}

#rose-canvas:active {
  transform: scale(0.98);
}

.hidden-message {
  opacity: 0;
  margin-top: var(--spacing-md);
  font-size: 1.75rem;
  font-family: var(--font-display);
  font-style: italic;
  color: var(--rose-gold);
  transition: opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s;
  transform: translateY(30px);
  text-shadow: var(--glow-soft);
}

.hidden-message.revealed {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ═══════════════════════════════════════════════════════════
   TIMELINE SECTION
   ═══════════════════════════════════════════════════════════ */

#timeline {
  max-width: 900px;
  width: 100%;
}

#timeline h2 {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.timeline-container {
  position: relative;
  padding-left: var(--spacing-md);
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    transparent, 
    var(--stardust) 10%, 
    var(--stardust) 90%, 
    transparent
  );
  box-shadow: 0 0 10px var(--stardust);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--spacing-xl);
  padding-left: var(--spacing-lg);
  opacity: 0;
  transform: translateX(-50px);
  transition: var(--transition-smooth);
}

.timeline-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-marker {
  position: absolute;
  left: -10px;
  top: 0;
  width: 20px;
  height: 20px;
  background: var(--constellation);
  border-radius: 50%;
  box-shadow: 
    0 0 0 4px var(--night-sky),
    0 0 0 6px var(--stardust),
    0 0 20px var(--constellation);
  animation: pulse-marker 3s ease-in-out infinite;
  z-index: 2;
}

.timeline-item.visible .timeline-marker {
  animation: pulse-marker 3s ease-in-out infinite, pop-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes pulse-marker {
  0%, 100% { 
    transform: scale(1); 
    box-shadow: 
      0 0 0 4px var(--night-sky),
      0 0 0 6px var(--stardust),
      0 0 20px var(--constellation);
  }
  50% { 
    transform: scale(1.2); 
    box-shadow: 
      0 0 0 4px var(--night-sky),
      0 0 0 8px var(--stardust),
      0 0 30px var(--constellation);
  }
}

@keyframes pop-in {
  0% { 
    transform: scale(0); 
    opacity: 0;
  }
  50% {
    transform: scale(1.3);
  }
  100% { 
    transform: scale(1); 
    opacity: 1;
  }
}

.timeline-content {
  background: rgba(26, 29, 53, 0.6);
  padding: var(--spacing-md);
  border-radius: 16px;
  border: 1px solid rgba(212, 165, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: var(--transition-smooth);
}

.timeline-item:hover .timeline-content {
  border-color: rgba(212, 165, 255, 0.5);
  box-shadow: 0 15px 40px rgba(107, 76, 154, 0.4);
  transform: translateX(5px);
}

.timeline-content h3 {
  margin-bottom: var(--spacing-xs);
}

.timeline-content p {
  font-size: 1.125rem;
  line-height: 1.8;
}


/* ═══════════════════════════════════════════════════════════
   LETTER SECTION
   ═══════════════════════════════════════════════════════════ */

#letter-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
}

#envelope {
  position: relative;
  width: min(450px, 90vw);
  height: min(300px, 60vw); /* Slightly taller for better fit */
  background: linear-gradient(145deg, #fef8e8, #f5e6d3);
  border: none;
  cursor: pointer;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 5px 15px rgba(0, 0, 0, 0.3);
  transition: var(--transition-bounce);
  transform-style: preserve-3d;
  perspective: 1000px;
}

#envelope:hover {
  transform: translateY(-15px) rotateX(8deg);
  box-shadow: 
    0 35px 90px rgba(0, 0, 0, 0.6),
    0 10px 30px rgba(0, 0, 0, 0.4);
}

.envelope-flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: min(225px, 45vw) solid transparent;
  border-right: min(225px, 45vw) solid transparent;
  border-top: min(150px, 30vw) solid #d4a574; /* Adjusted for taller envelope */
  transform-origin: top center;
  transition: transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 3;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
}

#envelope.open .envelope-flap {
  transform: rotateX(-180deg);
}

.letter-paper {
  position: absolute;
  top: 10%;
  left: 8%;
  right: 8%;
  bottom: 15%;
  background: linear-gradient(to bottom, #ffffff, #fffef8);
  padding: var(--spacing-sm) var(--spacing-sm);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Space between text and closing */
  font-family: var(--font-display);
  font-size: clamp(0.85rem, 1.8vw, 1rem);
  line-height: 1.7;
  color: #2d2d2d;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
  z-index: 2;
  border-radius: 4px;
  overflow: hidden; /* Prevent text overflow */
}

#envelope.open .letter-paper {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.letter-text {
  color: #333;
  opacity: 1;
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.closing {
  font-style: italic;
  font-weight: 600;
  color: var(--nebula-purple);
  margin-top: auto;
  padding-top: var(--spacing-xs);
  text-align: center;
  font-size: 1em;
  flex-shrink: 0; /* Prevent shrinking */
}

.hint {
  font-size: 1rem;
  color: var(--stardust);
  opacity: 0.8;
  animation: pulse-hint 2.5s ease-in-out infinite;
  transition: opacity 0.5s ease;
}

#envelope.open + .hint {
  opacity: 0;
}

@keyframes pulse-hint {
  0%, 100% { 
    opacity: 0.6; 
    transform: translateY(0);
  }
  50% { 
    opacity: 1; 
    transform: translateY(-5px);
  }
}

/* ═══════════════════════════════════════════════════════════
   ENDING SECTION
   ═══════════════════════════════════════════════════════════ */

#ending {
  position: relative;
  text-align: center;
}

#firefly-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.ending-text {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.ending-text h2 {
  margin-bottom: var(--spacing-md);
  animation: fadeInScale 2s ease forwards;
  text-align: center;
  line-height: 1.4;
}

.heart-pulse {
  width: 120px;
  height: 120px;
  position: relative;
  animation: glowPulse 2.5s ease-in-out infinite;
}

.heart-pulse::before,
.heart-pulse::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 95px;
  background: linear-gradient(135deg, var(--rose-pink), var(--rose-gold));
  border-radius: 60px 60px 0 0;
  box-shadow: 
    0 0 40px rgba(244, 194, 194, 0.9),
    0 0 80px rgba(255, 107, 157, 0.5) inset;
}

.heart-pulse::before {
  left: 60px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.heart-pulse::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.7) translateY(30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes glowPulse {
  0%, 100% {
    filter: drop-shadow(0 0 25px rgba(244, 194, 194, 0.9));
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 50px rgba(255, 107, 157, 1));
    transform: scale(1.15);
  }
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE DESIGN
   ═══════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
  :root {
    --spacing-lg: 3rem;
    --spacing-xl: 4rem;
  }
  
  .panel {
    padding: var(--spacing-lg) var(--spacing-sm);
  }
  
  .overlay-card {
    padding: var(--spacing-lg) var(--spacing-md);
  }
  
  #rose-canvas {
    max-width: 400px;
    height: 400px;
  }
  
  .timeline-container {
    padding-left: var(--spacing-sm);
  }
  
  .timeline-item {
    padding-left: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }
  
  .timeline-content {
    padding: var(--spacing-sm);
  }
  
  .heart-pulse {
    width: 90px;
    height: 90px;
  }
  
  .heart-pulse::before,
  .heart-pulse::after {
    width: 45px;
    height: 72px;
  }
  
  .heart-pulse::before {
    left: 45px;
  }
  
  /* Envelope adjustments for mobile */
  .letter-paper {
    padding: var(--spacing-xs) var(--spacing-xs);
    font-size: clamp(0.75rem, 1.5vw, 0.9rem);
    line-height: 1.5;
  }
  
  .closing {
    font-size: 0.9em;
    padding-top: 0.25rem;
  }
  
  /* Scroll buttons on mobile */
  .scroll-btn {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
  
  .full-screen .scroll-btn {
    bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .glow-btn {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  #rose-canvas {
    max-width: 320px;
    height: 320px;
  }
  
  .hidden-message {
    font-size: 1.35rem;
  }
}

/* ═══════════════════════════════════════════════════════════
   ACCESSIBILITY & PERFORMANCE
   ═══════════════════════════════════════════════════════════ */

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Focus styles for keyboard navigation */
button:focus-visible,
#envelope:focus-visible {
  outline: 3px solid var(--stardust);
  outline-offset: 5px;
  border-radius: 4px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --moonlight: #ffffff;
    --night-sky: #000000;
  }
  
  .timeline-container::before {
    width: 3px;
  }
}

/* Dark mode is default, but we can add light mode if needed */
@media (prefers-color-scheme: light) {
  /* Optional: add light theme variables here if desired */
}

/* Print styles */
@media print {
  #star-canvas,
  #firefly-canvas,
  .glow-btn,
  .scroll-indicator {
    display: none;
  }
  
  body {
    background: white;
    color: black;
  }
}
