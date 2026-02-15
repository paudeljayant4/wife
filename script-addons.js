/* ═══════════════════════════════════════════════════════════
   OUR UNIVERSE - ADDONS
   New Features: Shooting Stars,,
 Sound Effects
   ═══════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════
// SOUND EFFECTS SYSTEM
// ═══════════════════════════════════════════════════════════

class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.enabled = CONFIG.soundEffects.enabled;
    this.volume = CONFIG.soundEffects.volume;
    
    if (this.enabled) {
      this.initAudioContext();
    }
  }
  
  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.log('Web Audio API not supported');
      this.enabled = false;
    }
  }
  
  playChime() {
    if (!this.enabled || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
    
    gainNode.gain.setValueAtTime(this.volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }
  
  playBloom() {
    if (!this.enabled || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, now);
    oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.8);
    
    gainNode.gain.setValueAtTime(this.volume * 0.8, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    
    oscillator.start(now);
    oscillator.stop(now + 0.8);
  }
  
  playRustle() {
    if (!this.enabled || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const bufferSize = this.audioContext.sampleRate * 0.3;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    
    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    gainNode.gain.value = this.volume * 0.5;
    
    source.start(now);
  }
  
  playWhoosh() {
    if (!this.enabled || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.5);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + 0.5);
    
    gainNode.gain.setValueAtTime(this.volume * 0.6, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    oscillator.start(now);
    oscillator.stop(now + 0.5);
  }
}

// ═══════════════════════════════════════════════════════════
// SHOOTING STARS
// ═══════════════════════════════════════════════════════════

class ShootingStars {
  constructor() {
    this.canvas = document.getElementById('shooting-stars-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.shootingStars = [];
    this.animationId = null;
    
    this.resize();
    this.setupEventListeners();
    this.startCreatingStars();
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.resize(), 250);
    });
  }
  
  startCreatingStars() {
    this.createShootingStar();
    this.starInterval = setInterval(() => {
      this.createShootingStar();
    }, CONFIG.shootingStars.frequency);
  }
  
  createShootingStar() {
    const startX = Math.random() * this.canvas.width;
    const startY = Math.random() * (this.canvas.height * 0.5);
    const angle = Math.random() * Math.PI / 4 + Math.PI / 6; // 30-75 degrees
    
    this.shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * CONFIG.shootingStars.speed,
      vy: Math.sin(angle) * CONFIG.shootingStars.speed,
      trail: [],
      life: 1,
      size: 2 + Math.random() * 2
    });
    
    if (state.instances.soundEffects) {
      state.instances.soundEffects.playWhoosh();
    }
  }
  
  animate() {
    if (!state.isTabVisible) {
      this.animationId = requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.shootingStars.forEach((star, index) => {
      // Update position
      star.x += star.vx;
      star.y += star.vy;
      
      // Add to trail
      star.trail.push({ x: star.x, y: star.y, alpha: star.life });
      if (star.trail.length > CONFIG.shootingStars.trailLength) {
        star.trail.shift();
      }
      
      // Fade out
      star.life -= 0.01;
      
      // Draw trail
      star.trail.forEach((point, i) => {
        const alpha = (i / star.trail.length) * point.alpha;
        const size = star.size * (i / star.trail.length);
        
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.fill();
        
        // Sparkles
        if (i % 5 === 0) {
          this.ctx.beginPath();
          this.ctx.arc(point.x + (Math.random() - 0.5) * 10, point.y + (Math.random() - 0.5) * 10, 1, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(212, 165, 255, ${alpha * 0.5})`;
          this.ctx.fill();
        }
      });
      
      // Remove dead stars
      if (star.life <= 0 || star.x > this.canvas.width || star.y > this.canvas.height) {
        this.shootingStars.splice(index, 1);
      }
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.starInterval) {
      clearInterval(this.starInterval);
    }
  }
}


// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SoundEffects,
    ShootingStars,
  };
}
