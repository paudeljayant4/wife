/* ═══════════════════════════════════════════════════════════
   OUR UNIVERSE - Enhanced Interactive JavaScript
   Version: 2.0 - Improved Performance & Features
   All animations and interactions for the romantic experience
   ═══════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════
// CONFIGURATION & STATE
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  stars: {
    count: 200,
    countMobile: 100,
    twinkleSpeed: { min: 0.01, max: 0.03 },
    driftSpeed: 0.1,
    mouseInteractionRadius: 150
  },
  rose: {
    petalCount: 12,
    bloomSpeed: 0.02,
    layers: 3
  },
  fireflies: {
    count: 30,
    countMobile: 15,
    speed: 1.5,
    glowSpeed: { min: 0.02, max: 0.05 }
  },
  typing: {
    text: "In the vastness of space, across infinite possibilities, I found you...",
    minDelay: 50,
    maxDelay: 100
  },
  constellation: {
    name: "HIMANI",
    starSize: 4,
    connectLines: true
  },
  shootingStars: {
    frequency: 3000, // Every 3 seconds
    speed: 15,
    trailLength: 100
  },
  soundEffects: {
    enabled: true,
    volume: 0.3
  }
};

let state = {
  performanceMode: true,
  isMobile: false,
  isTabVisible: true,
  instances: {},
  audioPlaying: false,
  audioInitialized: false
};

// ═══════════════════════════════════════════════════════════
// INITIALIZATION & PERFORMANCE
// ═══════════════════════════════════════════════════════════

function checkPerformance() {
  state.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  state.performanceMode = !(state.isMobile || isLowEnd);
  
  // Adjust config based on performance
  if (!state.performanceMode) {
    CONFIG.stars.count = CONFIG.stars.countMobile;
    CONFIG.fireflies.count = CONFIG.fireflies.countMobile;
  }
}

// ═══════════════════════════════════════════════════════════
// BACKGROUND MUSIC
// ═══════════════════════════════════════════════════════════

class BackgroundMusic {
  constructor() {
    this.audio = document.getElementById('background-music');
    this.controlBtn = document.getElementById('audio-control');
    
    if (!this.audio || !this.controlBtn) return;
    
    this.audio.volume = 0.3; // Set to 30% volume for gentle background
    this.isPlaying = false;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Toggle music on button click
    this.controlBtn.addEventListener('click', () => this.toggle());
    
    // Handle audio errors gracefully
    this.audio.addEventListener('error', (e) => {
      console.log('Audio loading error (this is normal, using fallback):', e);
      this.useSynthesizedMusic();
    });
    
    // Fade in when loaded
    this.audio.addEventListener('canplaythrough', () => {
      console.log('Background music ready');
    }, { once: true });
  }
  
  async play() {
    if (!this.audio) return;
    
    try {
      // Modern browsers require user interaction before playing audio
      await this.audio.play();
      this.isPlaying = true;
      this.controlBtn.classList.remove('paused');
      state.audioPlaying = true;
      
      // Fade in effect
      this.fadeIn();
    } catch (error) {
      console.log('Audio play failed (this is normal on first load):', error);
      // Will be triggered on user's first interaction
    }
  }
  
  pause() {
    if (!this.audio) return;
    
    this.fadeOut(() => {
      this.audio.pause();
      this.isPlaying = false;
      this.controlBtn.classList.add('paused');
      state.audioPlaying = false;
    });
  }
  
  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  fadeIn() {
    if (!this.audio) return;
    
    this.audio.volume = 0;
    const fadeInterval = setInterval(() => {
      if (this.audio.volume < 0.3) {
        this.audio.volume = Math.min(this.audio.volume + 0.02, 0.3);
      } else {
        clearInterval(fadeInterval);
      }
    }, 100);
  }
  
  fadeOut(callback) {
    if (!this.audio) return;
    
    const fadeInterval = setInterval(() => {
      if (this.audio.volume > 0.02) {
        this.audio.volume = Math.max(this.audio.volume - 0.02, 0);
      } else {
        clearInterval(fadeInterval);
        this.audio.volume = 0;
        if (callback) callback();
      }
    }, 100);
  }
  
  // Fallback: Create synthesized romantic piano music using Web Audio API
  useSynthesizedMusic() {
    console.log('Using synthesized romantic music');
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Romantic piano chord progression: C - Am - F - G
      const chordProgression = [
        [261.63, 329.63, 392.00], // C major (C, E, G)
        [220.00, 261.63, 329.63], // A minor (A, C, E)
        [174.61, 220.00, 261.63], // F major (F, A, C)
        [196.00, 246.94, 293.66], // G major (G, B, D)
      ];
      
      let chordIndex = 0;
      
      const playChord = () => {
        const chord = chordProgression[chordIndex];
        const now = audioContext.currentTime;
        
        chord.forEach((frequency, i) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = frequency;
          oscillator.type = 'sine'; // Sine wave for soft piano-like sound
          
          // ADSR envelope for piano-like sound
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.05, now + 0.1); // Attack
          gainNode.gain.exponentialRampToValueAtTime(0.03, now + 0.5); // Decay/Sustain
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2); // Release
          
          oscillator.start(now);
          oscillator.stop(now + 2);
        });
        
        chordIndex = (chordIndex + 1) % chordProgression.length;
      };
      
      // Play chords in a loop
      if (state.audioPlaying) {
        this.synthesizedInterval = setInterval(playChord, 2000);
      }
      
    } catch (error) {
      console.log('Synthesized music not available:', error);
    }
  }
  
  destroy() {
    if (this.synthesizedInterval) {
      clearInterval(this.synthesizedInterval);
    }
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
  }
}

// ═══════════════════════════════════════════════════════════
// LOADING SCREEN
// ═══════════════════════════════════════════════════════════

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => loadingScreen.remove(), 1000);
    }, 1000);
  }
}

// ═══════════════════════════════════════════════════════════
// CONSTELLATION NAME - HIMANI
// ═══════════════════════════════════════════════════════════

class ConstellationName {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'constellation-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '10'; // Higher z-index to be above everything
    
    const openingSection = document.getElementById('opening');
    if (openingSection) {
      openingSection.appendChild(this.canvas);
      console.log('Constellation canvas added to opening section');
    } else {
      console.error('Opening section not found!');
      return;
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.constellationStars = [];
    this.drawProgress = 0;
    this.animationId = null;
    
    this.resize();
    this.createConstellationStars();
    window.addEventListener('resize', () => this.handleResize());
  }
  
  handleResize() {
    this.resize();
    this.createConstellationStars();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createConstellationStars() {
    // Better letter patterns for HIMANI in 5x5 grid (clearer visibility)
    // Format: [x, y] coordinates where each letter is mapped clearly
    
    // H - Two vertical lines with horizontal connector
    const letterH = [
      [0,0],[0,1],[0,2],[0,3],[0,4],  // Left vertical
      [1,2],                           // Middle connector
      [2,0],[2,1],[2,2],[2,3],[2,4]   // Right vertical
    ];
    
    // I - Simple vertical line
    const letterI = [
      [1,0],[1,1],[1,2],[1,3],[1,4]   // Center vertical
    ];
    
    // M - Two verticals with peaks
    const letterM = [
      [0,0],[0,1],[0,2],[0,3],[0,4],  // Left vertical
      [1,1],                           // Left peak
      [2,2],                           // Center peak
      [3,1],                           // Right peak
      [4,0],[4,1],[4,2],[4,3],[4,4]   // Right vertical
    ];
    
    // A - Triangle with crossbar
    const letterA = [
      [1,0],                           // Top
      [0,1],[2,1],                     // Upper sides
      [0,2],[1,2],[2,2],               // Crossbar
      [0,3],[2,3],                     // Lower sides
      [0,4],[2,4]                      // Bottom
    ];
    
    // N - Two verticals with diagonal
    const letterN = [
      [0,0],[0,1],[0,2],[0,3],[0,4],  // Left vertical
      [1,1],                           // Diagonal
      [2,2],                           // Diagonal
      [3,3],                           // Diagonal
      [4,0],[4,1],[4,2],[4,3],[4,4]   // Right vertical
    ];
    
    // I - Simple vertical line (second I)
    const letterI2 = [
      [1,0],[1,1],[1,2],[1,3],[1,4]   // Center vertical
    ];
    
    // Array of all 6 letters: H-I-M-A-N-I
    const letters = [letterH, letterI, letterM, letterA, letterN, letterI2];
    const letterSpacing = 45; // Space between letters
    const scale = state.isMobile ? 10 : 14; // Size of each dot
    
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2 - 30;
    
    // Calculate total width of all letters
    let totalWidth = 0;
    letters.forEach((letter) => {
      const letterWidth = Math.max(...letter.map(p => p[0])) * scale;
      totalWidth += letterWidth + letterSpacing;
    });
    totalWidth -= letterSpacing; // Remove last spacing
    
    // Start position (centered)
    let offsetX = centerX - totalWidth / 2;
    
    // Create stars for each letter
    letters.forEach((letter, letterIndex) => {
      letter.forEach(([x, y], pointIndex) => {
        this.constellationStars.push({
          x: offsetX + x * scale,
          y: centerY + y * scale,
          alpha: 0,
          targetAlpha: 1,
          radius: CONFIG.constellation.starSize + 0.5, // Slightly larger stars
          delay: (letterIndex * 15 + pointIndex * 3), // Faster animation
          letterIndex: letterIndex
        });
      });
      
      // Move to next letter position
      const letterWidth = Math.max(...letter.map(p => p[0])) * scale;
      offsetX += letterWidth + letterSpacing;
    });
    
    console.log(`Created constellation with ${this.constellationStars.length} stars for HIMANI`);
  }
  
  startAnimation() {
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.constellationStars.forEach((star, index) => {
        // Fade in based on delay - fast animation
        if (this.drawProgress > star.delay) {
          if (star.alpha < star.targetAlpha) {
            star.alpha += 0.1; // Very fast fade in
          }
        }
        
        if (star.alpha > 0) {
          // Draw star with glow
          this.ctx.beginPath();
          this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(255, 215, 0, ${star.alpha})`;
          this.ctx.shadowBlur = 20;
          this.ctx.shadowColor = `rgba(255, 215, 0, ${star.alpha})`;
          this.ctx.fill();
          
          // Add extra bright center
          this.ctx.beginPath();
          this.ctx.arc(star.x, star.y, star.radius * 0.5, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.8})`;
          this.ctx.shadowBlur = 10;
          this.ctx.shadowColor = `rgba(255, 255, 255, ${star.alpha})`;
          this.ctx.fill();
          
          // Draw connection lines within same letter
          if (CONFIG.constellation.connectLines && index > 0) {
            const prevStar = this.constellationStars[index - 1];
            if (prevStar.letterIndex === star.letterIndex && prevStar.alpha > 0.3 && star.alpha > 0.3) {
              this.ctx.beginPath();
              this.ctx.moveTo(prevStar.x, prevStar.y);
              this.ctx.lineTo(star.x, star.y);
              this.ctx.strokeStyle = `rgba(212, 165, 255, ${Math.min(prevStar.alpha, star.alpha) * 0.5})`;
              this.ctx.lineWidth = 1.5;
              this.ctx.shadowBlur = 5;
              this.ctx.shadowColor = `rgba(212, 165, 255, ${Math.min(prevStar.alpha, star.alpha) * 0.3})`;
              this.ctx.stroke();
            }
          }
        }
      });
      
      this.drawProgress += 2; // Faster progression
      
      if (this.drawProgress < this.constellationStars[this.constellationStars.length - 1].delay + 50) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        // Keep drawing the final state
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.constellationStars.forEach((star, index) => {
          // Draw final stars
          this.ctx.beginPath();
          this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          this.ctx.fillStyle = 'rgba(255, 215, 0, 1)';
          this.ctx.shadowBlur = 20;
          this.ctx.shadowColor = 'rgba(255, 215, 0, 1)';
          this.ctx.fill();
          
          this.ctx.beginPath();
          this.ctx.arc(star.x, star.y, star.radius * 0.5, 0, Math.PI * 2);
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          this.ctx.shadowBlur = 10;
          this.ctx.shadowColor = 'rgba(255, 255, 255, 1)';
          this.ctx.fill();
          
          // Draw final connection lines
          if (CONFIG.constellation.connectLines && index > 0) {
            const prevStar = this.constellationStars[index - 1];
            if (prevStar.letterIndex === star.letterIndex) {
              this.ctx.beginPath();
              this.ctx.moveTo(prevStar.x, prevStar.y);
              this.ctx.lineTo(star.x, star.y);
              this.ctx.strokeStyle = 'rgba(212, 165, 255, 0.5)';
              this.ctx.lineWidth = 1.5;
              this.ctx.shadowBlur = 5;
              this.ctx.shadowColor = 'rgba(212, 165, 255, 0.3)';
              this.ctx.stroke();
            }
          }
        });
      }
    };
    
    setTimeout(() => {
      this.animationId = requestAnimationFrame(animate);
    }, 1500); // Start earlier
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// STARFIELD BACKGROUND
// ═══════════════════════════════════════════════════════════

class StarField {
  constructor() {
    this.canvas = document.getElementById('star-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.animationId = null;
    
    this.resize();
    this.createStars();
    this.setupEventListeners();
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
  
  createStars() {
    this.stars = [];
    for (let i = 0; i < CONFIG.stars.count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 0.5 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.7,
        twinkleSpeed: CONFIG.stars.twinkleSpeed.min + Math.random() * (CONFIG.stars.twinkleSpeed.max - CONFIG.stars.twinkleSpeed.min),
        twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        drift: {
          x: (Math.random() - 0.5) * CONFIG.stars.driftSpeed,
          y: (Math.random() - 0.5) * CONFIG.stars.driftSpeed
        },
        originalAlpha: 0.3 + Math.random() * 0.7
      });
    }
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => this.handleResize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    
    // Throttle resize for performance
    this.resizeTimeout = null;
  }
  
  handleResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.resize();
      this.createStars();
    }, 250);
  }
  
  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY + window.scrollY;
  }
  
  animate() {
    if (!state.isTabVisible) {
      this.animationId = requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.stars.forEach(star => {
      // Twinkling effect
      star.alpha += star.twinkleSpeed * star.twinkleDirection;
      if (star.alpha >= 1 || star.alpha <= 0.2) {
        star.twinkleDirection *= -1;
      }
      
      // Gentle drift
      star.x += star.drift.x;
      star.y += star.drift.y;
      
      // Wrap around edges
      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;
      
      // Mouse interaction
      if (state.performanceMode) {
        const dx = this.mouse.x - star.x;
        const dy = this.mouse.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < CONFIG.stars.mouseInteractionRadius) {
          const force = (CONFIG.stars.mouseInteractionRadius - distance) / CONFIG.stars.mouseInteractionRadius;
          star.x -= dx * force * 0.03;
          star.y -= dy * force * 0.03;
        }
      }
      
      // Draw star
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(232, 244, 255, ${star.alpha})`;
      this.ctx.shadowBlur = star.radius * 3;
      this.ctx.shadowColor = `rgba(232, 244, 255, ${star.alpha * 0.8})`;
      this.ctx.fill();
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// INTRO OVERLAY
// ═══════════════════════════════════════════════════════════

function initIntro() {
  const overlay = document.getElementById('intro-overlay');
  const beginBtn = document.getElementById('begin-experience');
  
  if (!overlay || !beginBtn) return;
  
  beginBtn.addEventListener('click', () => {
    playAudioFeedback('click');
    
    // Start background music on user interaction
    if (state.instances.backgroundMusic && !state.audioInitialized) {
      state.instances.backgroundMusic.play();
      state.audioInitialized = true;
    }
    
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
      startExperience();
    }, 800);
  });
}

function startExperience() {
  typeText();
  
  // Start constellation drawing
  if (state.instances.constellation) {
    state.instances.constellation.startAnimation();
  }
}

// ═══════════════════════════════════════════════════════════
// TYPING ANIMATION
// ═══════════════════════════════════════════════════════════

function typeText() {
  const element = document.getElementById('typed-line');
  if (!element) return;
  
  const text = CONFIG.typing.text;
  let index = 0;
  
  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      const delay = CONFIG.typing.minDelay + Math.random() * (CONFIG.typing.maxDelay - CONFIG.typing.minDelay);
      setTimeout(type, delay);
    } else {
      element.classList.add('finished');
    }
  }
  
  setTimeout(type, 500);
}

// ═══════════════════════════════════════════════════════════
// SCROLL BEHAVIOR
// ═══════════════════════════════════════════════════════════

function initScrollBehavior() {
  const scrollButtons = document.querySelectorAll('.scroll-btn, .scroll-indicator');
  const replayBtn = document.getElementById('replay-btn');
  
  // Handle all scroll buttons
  scrollButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Play sound effect
        if (state.instances.soundEffects) {
          state.instances.soundEffects.playChime();
        }
      }
    });
  });
  
  // Handle replay button
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  }
}

// ═══════════════════════════════════════════════════════════
// INTERACTIVE ROSE
// ═══════════════════════════════════════════════════════════

class InteractiveRose {
  constructor() {
    this.canvas = document.getElementById('rose-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.bloomProgress = 0;
    this.isBloming = false;
    this.petals = [];
    this.message = document.getElementById('rose-message');
    this.animationId = null;
    
    this.resize();
    this.setupPetals();
    this.setupEventListeners();
    
    // Start drawing immediately
    this.continuousDraw();
  }
  
  resize() {
    const size = Math.min(this.canvas.parentElement?.clientWidth || 500, 550);
    this.canvas.width = size;
    this.canvas.height = size;
    this.centerX = size / 2;
    this.centerY = size / 2;
  }
  
  setupPetals() {
    this.petals = [];
    for (let i = 0; i < CONFIG.rose.petalCount; i++) {
      this.petals.push({
        angle: (i / CONFIG.rose.petalCount) * Math.PI * 2,
        layer: Math.floor(i / (CONFIG.rose.petalCount / CONFIG.rose.layers)),
        size: 40 + (Math.floor(i / (CONFIG.rose.petalCount / CONFIG.rose.layers)) * 18),
        rotation: (Math.random() - 0.5) * 0.3
      });
    }
  }
  
  setupEventListeners() {
    this.canvas.addEventListener('click', () => this.bloom());
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resize();
        this.draw();
      }, 250);
    });
  }
  
  continuousDraw() {
    this.draw();
  }
  
  bloom() {
    if (this.isBloming) return; // Already bloomed, keep it permanent
    this.isBloming = true;
    playAudioFeedback('bloom');
    
    const animate = () => {
      if (this.bloomProgress < 1) {
        this.bloomProgress += CONFIG.rose.bloomSpeed;
        this.draw();
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.bloomProgress = 1;
        this.draw();
        if (this.message) {
          this.message.classList.add('revealed');
        }
        // Don't reset - keep the rose bloomed permanently
      }
    };
    
    animate();
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw stem
    this.drawStem();
    
    // Draw leaves
    this.drawLeaf(this.centerX - 25, this.centerY + 90, -0.6);
    this.drawLeaf(this.centerX + 25, this.centerY + 70, 0.6);
    
    // Draw petals
    this.petals.forEach((petal, index) => {
      const progress = Math.max(0, Math.min(1, (this.bloomProgress * 1.5) - (index * 0.04)));
      this.drawPetal(petal, progress);
    });
    
    // Draw center
    this.drawCenter();
  }
  
  drawStem() {
    const gradient = this.ctx.createLinearGradient(
      this.centerX, this.canvas.height,
      this.centerX, this.centerY + 50
    );
    gradient.addColorStop(0, '#2d5037');
    gradient.addColorStop(0.5, '#3d6647');
    gradient.addColorStop(1, '#5a8c6a');
    
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 6;
    this.ctx.lineCap = 'round';
    this.ctx.shadowBlur = 5;
    this.ctx.shadowColor = 'rgba(45, 80, 55, 0.5)';
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.canvas.height);
    
    // Slight curve to stem
    this.ctx.quadraticCurveTo(
      this.centerX + 5, this.centerY + 100,
      this.centerX, this.centerY + 50
    );
    this.ctx.stroke();
    
    this.ctx.shadowBlur = 0;
  }
  
  drawLeaf(x, y, angle) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
    
    const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, 28);
    gradient.addColorStop(0, '#6ba876');
    gradient.addColorStop(0.5, '#5a8c6a');
    gradient.addColorStop(1, '#3d6647');
    
    // Leaf shadow
    this.ctx.shadowBlur = 8;
    this.ctx.shadowColor = 'rgba(45, 80, 55, 0.4)';
    
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, 20, 32, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    this.ctx.shadowBlur = 0;
    
    // Leaf vein
    this.ctx.strokeStyle = 'rgba(61, 102, 71, 0.6)';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -28);
    this.ctx.lineTo(0, 28);
    this.ctx.stroke();
    
    // Side veins
    for (let i = -20; i <= 20; i += 10) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(i > 0 ? 10 : -10, i);
      this.ctx.strokeStyle = 'rgba(61, 102, 71, 0.3)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
    
    this.ctx.restore();
  }
  
  drawPetal(petal, progress) {
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(petal.angle + (petal.rotation * progress));
    
    const distance = petal.size * progress;
    const width = 35 * progress;
    const height = 48 * progress;
    
    // Petal gradient - more vibrant colors
    const gradient = this.ctx.createRadialGradient(0, -distance, 0, 0, -distance, width);
    gradient.addColorStop(0, '#ffcce0');
    gradient.addColorStop(0.3, '#ffa6c9');
    gradient.addColorStop(0.6, '#ff8fb5');
    gradient.addColorStop(0.85, '#ff6b9d');
    gradient.addColorStop(1, '#e85894');
    
    // Draw petal with shadow
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = 'rgba(255, 107, 157, 0.7)';
    
    this.ctx.beginPath();
    this.ctx.ellipse(0, -distance, width, height, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    // Add petal highlight
    this.ctx.shadowBlur = 0;
    const highlightGradient = this.ctx.createRadialGradient(
      -width * 0.3, -distance - height * 0.2, 0,
      0, -distance, width * 0.8
    );
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    this.ctx.beginPath();
    this.ctx.ellipse(0, -distance, width * 0.8, height * 0.8, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = highlightGradient;
    this.ctx.fill();
    
    this.ctx.restore();
  }
  
  drawCenter() {
    const centerRadius = 20 * this.bloomProgress;
    
    // Outer glow
    const outerGlow = this.ctx.createRadialGradient(
      this.centerX, this.centerY, 0,
      this.centerX, this.centerY, centerRadius * 2
    );
    outerGlow.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
    outerGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
    
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, centerRadius * 2, 0, Math.PI * 2);
    this.ctx.fillStyle = outerGlow;
    this.ctx.fill();
    
    // Main center
    const gradient = this.ctx.createRadialGradient(
      this.centerX, this.centerY, 0,
      this.centerX, this.centerY, centerRadius
    );
    gradient.addColorStop(0, '#fff4b3');
    gradient.addColorStop(0.5, '#ffe14d');
    gradient.addColorStop(0.8, '#ffd700');
    gradient.addColorStop(1, '#d4a800');
    
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = 'rgba(255, 215, 0, 0.9)';
    
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, centerRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    this.ctx.shadowBlur = 0;
    
    // Add texture dots to center
    if (this.bloomProgress > 0.5) {
      const dotCount = Math.floor(25 * this.bloomProgress);
      for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * Math.PI * 2;
        const radius = (centerRadius * 0.6) * (0.5 + Math.random() * 0.5);
        const x = this.centerX + Math.cos(angle) * radius;
        const y = this.centerY + Math.sin(angle) * radius;
        
        this.ctx.beginPath();
        this.ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(204, 153, 0, 0.7)';
        this.ctx.fill();
      }
    }
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// TIMELINE SCROLL ANIMATIONS
// ═══════════════════════════════════════════════════════════

function initTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        const delay = parseInt(entry.target.dataset.index || 0) * 200;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }, observerOptions);
  
  items.forEach((item, index) => {
    item.dataset.index = index;
    observer.observe(item);
  });
}

// ═══════════════════════════════════════════════════════════
// ENVELOPE LETTER
// ═══════════════════════════════════════════════════════════

function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const hint = document.querySelector('.hint');
  
  if (!envelope) return;
  
  envelope.addEventListener('click', function() {
    const isOpen = this.classList.toggle('open');
    this.setAttribute('aria-expanded', isOpen);
    
    if (isOpen) {
      playAudioFeedback('open');
      if (hint) hint.style.opacity = '0';
    }
  });
}

// ═══════════════════════════════════════════════════════════
// FIREFLY ANIMATION
// ═══════════════════════════════════════════════════════════

class FireflyCanvas {
  constructor() {
    this.canvas = document.getElementById('firefly-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.fireflies = [];
    this.animationId = null;
    
    this.resize();
    this.createFireflies();
    this.setupEventListeners();
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
  
  createFireflies() {
    this.fireflies = [];
    for (let i = 0; i < CONFIG.fireflies.count; i++) {
      this.fireflies.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * CONFIG.fireflies.speed,
        vy: (Math.random() - 0.5) * CONFIG.fireflies.speed,
        radius: 2 + Math.random() * 2,
        alpha: 0.5 + Math.random() * 0.5,
        glowSpeed: CONFIG.fireflies.glowSpeed.min + Math.random() * (CONFIG.fireflies.glowSpeed.max - CONFIG.fireflies.glowSpeed.min),
        glowDirection: Math.random() > 0.5 ? 1 : -1,
        hue: 45 + Math.random() * 20,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resize();
        this.createFireflies();
      }, 250);
    });
  }
  
  animate() {
    if (!state.isTabVisible) {
      this.animationId = requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.fireflies.forEach(firefly => {
      // Update position with sine wave motion for organic movement
      firefly.phase += 0.02;
      firefly.x += firefly.vx + Math.sin(firefly.phase) * 0.5;
      firefly.y += firefly.vy + Math.cos(firefly.phase) * 0.5;
      
      // Bounce off edges with some randomness
      if (firefly.x < 0 || firefly.x > this.width) {
        firefly.vx *= -1;
        firefly.vx += (Math.random() - 0.5) * 0.5;
      }
      if (firefly.y < 0 || firefly.y > this.height) {
        firefly.vy *= -1;
        firefly.vy += (Math.random() - 0.5) * 0.5;
      }
      
      // Keep within bounds
      firefly.x = Math.max(0, Math.min(this.width, firefly.x));
      firefly.y = Math.max(0, Math.min(this.height, firefly.y));
      
      // Glowing effect
      firefly.alpha += firefly.glowSpeed * firefly.glowDirection;
      if (firefly.alpha >= 1 || firefly.alpha <= 0.3) {
        firefly.glowDirection *= -1;
      }
      
      // Draw firefly glow
      const gradient = this.ctx.createRadialGradient(
        firefly.x, firefly.y, 0,
        firefly.x, firefly.y, firefly.radius * 4
      );
      gradient.addColorStop(0, `hsla(${firefly.hue}, 100%, 75%, ${firefly.alpha})`);
      gradient.addColorStop(0.4, `hsla(${firefly.hue}, 100%, 65%, ${firefly.alpha * 0.6})`);
      gradient.addColorStop(1, `hsla(${firefly.hue}, 100%, 55%, 0)`);
      
      this.ctx.beginPath();
      this.ctx.arc(firefly.x, firefly.y, firefly.radius * 4, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      
      // Draw firefly core
      this.ctx.beginPath();
      this.ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${firefly.hue}, 100%, 85%, ${firefly.alpha})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `hsla(${firefly.hue}, 100%, 70%, ${firefly.alpha})`;
      this.ctx.fill();
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// AUDIO FEEDBACK
// ═══════════════════════════════════════════════════════════

function playAudioFeedback(type = 'click') {
  if (!state.performanceMode) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
      case 'click':
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
        
      case 'open':
        oscillator.frequency.value = 600;
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
        
      case 'bloom':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.6);
        gainNode.gain.setValueAtTime(0.06, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.6);
        break;
    }
  } catch (error) {
    // Silent fail if audio not supported
    console.log('Audio feedback not available:', error);
  }
}

// ═══════════════════════════════════════════════════════════
// GSAP SCROLL ANIMATIONS
// ═══════════════════════════════════════════════════════════

function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }
  
  try {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate panels on scroll
    gsap.utils.toArray('.panel').forEach((panel, i) => {
      if (i > 0) {
        gsap.from(panel, {
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
            once: false
          },
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: 'power3.out'
        });
      }
    });
    
    // Parallax effect for section headers
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.to(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -50,
        opacity: 0.8
      });
    });
    
  } catch (error) {
    console.log('GSAP animations not initialized:', error);
  }
}

// ═══════════════════════════════════════════════════════════
// VISIBILITY MANAGEMENT
// ═══════════════════════════════════════════════════════════

function handleVisibilityChange() {
  state.isTabVisible = !document.hidden;
  
  // Could pause expensive animations when tab is hidden for better performance
  if (!state.isTabVisible) {
    console.log('Tab hidden - animations continue in background');
  }
}

// ═══════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════

function handleError(error, context) {
  console.error(`Error in ${context}:`, error);
  // Graceful degradation - app continues to work even if one feature fails
}

// ═══════════════════════════════════════════════════════════
// CLEANUP
// ═══════════════════════════════════════════════════════════

function cleanup() {
  Object.values(state.instances).forEach(instance => {
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
    }
  });
}

// ═══════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════

function init() {
  checkPerformance();
  
  // Initialize background music first
  try {
    state.instances.backgroundMusic = new BackgroundMusic();
  } catch (error) {
    handleError(error, 'BackgroundMusic');
  }
  
  // Initialize core features
  try {
    state.instances.starField = new StarField();
  } catch (error) {
    handleError(error, 'StarField');
  }
  
  try {
    state.instances.constellation = new ConstellationName();
  } catch (error) {
    handleError(error, 'ConstellationName');
  }
  
  try {
    initIntro();
  } catch (error) {
    handleError(error, 'Intro');
  }
  
  // Initialize features after a short delay
  setTimeout(() => {
    try {
      state.instances.soundEffects = new SoundEffects();
    } catch (error) {
      handleError(error, 'SoundEffects');
    }
    
    try {
      state.instances.shootingStars = new ShootingStars();
    } catch (error) {
      handleError(error, 'ShootingStars');
    }
    
    try {
      state.instances.rose = new InteractiveRose();
    } catch (error) {
      handleError(error, 'InteractiveRose');
    }
    
    try {
      initTimeline();
    } catch (error) {
      handleError(error, 'Timeline');
    }
    
    try {
      initEnvelope();
    } catch (error) {
      handleError(error, 'Envelope');
    }
    
    try {
      state.instances.fireflies = new FireflyCanvas();
    } catch (error) {
      handleError(error, 'FireflyCanvas');
    }
    
    try {
      initGSAPAnimations();
    } catch (error) {
      handleError(error, 'GSAP');
    }
    
    hideLoadingScreen();
  }, 300);
}

// ═══════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('visibilitychange', handleVisibilityChange);
window.addEventListener('beforeunload', cleanup);

// ═══════════════════════════════════════════════════════════
// MAINTAIN ROMANTIC VISION
// ═══════════════════════════════════════════════════════════

/*
 * Every interaction is designed to feel magical and intentional.
 * Performance is optimized without sacrificing emotional impact.
 * Animations are smooth and purposeful, creating moments of delight.
 * The experience scales gracefully across all devices.
 * Accessibility is built-in, not bolted on.
 * Error handling ensures nothing breaks the romantic atmosphere.
 * 
 * This is a love story told through code - beautiful, thoughtful, and timeless.
 */
