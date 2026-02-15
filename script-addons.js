/* ═══════════════════════════════════════════════════════════
   OUR UNIVERSE - ADDONS
   New Features: Shooting Stars, Particle Hearts, Love Notes,
   Reasons I Love You, 3D Rose, Sound Effects
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

\/ ═══════════════════════════════════════════════════════════
// LOVE NOTES JAR
// ═══════════════════════════════════════════════════════════

class LoveNotesJar {
  constructor() {
    this.jar = document.getElementById('love-jar');
    this.noteElement = document.getElementById('love-note');
    this.noteText = document.getElementById('note-text');
    this.anotherBtn = document.getElementById('another-note');
    
    if (!this.jar || !this.noteElement) return;
    
    this.notes = this.generateLoveNotes();
    this.usedNotes = [];
    
    this.setupEventListeners();
  }
  
  generateLoveNotes() {
    return [
      "Your smile is my favorite notification.",
      "I fall for you more every single day.",
      "You make ordinary moments extraordinary.",
      "My heart smiles when I think of you.",
      "You're the reason I believe in magic.",
      "Every love song reminds me of you.",
      "You're my favorite person to think about.",
      "With you, home is wherever we are together.",
      "You make my heart skip and race at the same time.",
      "I could never get tired of hearing your voice.",
      "You're the plot twist I never saw coming.",
      "My favorite place is inside your hug.",
      "You turn my darkness into light.",
      "I love the way you make me feel alive.",
      "You're the missing piece I didn't know I needed.",
      "Every moment with you is a treasure.",
      "You make me want to be a better person.",
      "Your laugh is my favorite sound in the universe.",
      "I'm so grateful you exist.",
      "You're my happy place.",
      "Life is better because you're in it.",
      "You make even Mondays feel like Fridays.",
      "I love the way you see the world.",
      "You're the best decision I never knew I was making.",
      "Your happiness is my favorite goal.",
      "I love you more than words can express.",
      "You're my favorite adventure.",
      "Thank you for being exactly who you are.",
      "You make my heart full.",
      "I'm the luckiest person to call you mine.",
      "You're my sunshine on cloudy days.",
      "Every day with you is a gift.",
      "You're the dream I didn't dare to dream.",
      "My love for you grows with every heartbeat.",
      "You're my today and all of my tomorrows.",
      "I love the way you love me.",
      "You're the reason I wake up smiling.",
      "With you, forever isn't long enough.",
      "You're my favorite kind of perfect.",
      "I choose you. Every single day.",
      "You make my heart feel like it's dancing.",
      "You're the answer to prayers I didn't know I had.",
      "I love every little thing about you.",
      "You're my safe place in this chaotic world.",
      "Thank you for loving me at my worst.",
      "You're the most beautiful soul I've ever known.",
      "I love the way your hand fits in mine.",
      "You're my favorite reason to lose sleep.",
      "Every goodbye is hard because I miss you instantly.",
      "You're the love I want to grow old with."
    ];
  }
  
  setupEventListeners() {
    this.jar.addEventListener('click', () => this.pullNote());
    this.anotherBtn.addEventListener('click', () => this.pullNote());
  }
  
  pullNote() {
    // Get random note
    if (this.usedNotes.length === this.notes.length) {
      this.usedNotes = []; // Reset if all used
    }
    
    let availableNotes = this.notes.filter(note => !this.usedNotes.includes(note));
    let randomNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
    this.usedNotes.push(randomNote);
    
    // Animate jar
    this.jar.style.transform = 'translateY(-20px) rotateZ(-5deg)';
    setTimeout(() => {
      this.jar.style.transform = '';
    }, 300);
    
    // Show note
    this.noteText.textContent = randomNote;
    this.noteElement.classList.remove('hidden');
    
    setTimeout(() => {
      this.noteElement.classList.add('visible');
    }, 100);
    
    // Sound effect
    if (state.instances.soundEffects) {
      state.instances.soundEffects.playRustle();
    }
  }
}

// ═══════════════════════════════════════════════════════════
// REASONS I LOVE YOU
// ═══════════════════════════════════════════════════════════

class ReasonsILoveYou {
  constructor() {
    this.container = document.getElementById('reasons-list');
    if (!this.container) return;
    
    this.reasons = this.generateReasons();
    this.createReasonCards();
    this.setupScrollObserver();
  }
  
  generateReasons() {
    return [
      "Your smile lights up my entire world",
      "The way you laugh makes everything better",
      "Your kindness touches everyone you meet",
      "You make me want to be the best version of myself",
      "Your intelligence amazes me every day",
      "The way you care about others is beautiful",
      "Your strength inspires me",
      "You make even ordinary moments magical",
      "Your honesty and authenticity",
      "The way you see beauty in everything",
      "Your passion for life is contagious",
      "You understand me like no one else",
      "Your hugs feel like home",
      "The sparkle in your eyes when you're excited",
      "Your patience with me and others",
      "The way you make me feel safe",
      "Your creativity and unique perspective",
      "You challenge me to grow",
      "Your love for learning new things",
      "The way you dance like nobody's watching",
      "Your compassion for all living things",
      "You make me laugh until my stomach hurts",
      "Your determination when facing challenges",
      "The little things you do just to make me smile",
      "Your ability to find joy in simple moments",
      "You listen with your whole heart",
      "Your courage to be vulnerable",
      "The way you support my dreams",
      "Your beautiful mind and soul",
      "You make me believe in magic again",
      "Your touch makes everything okay",
      "The way you remember small details about me",
      "Your optimism even on tough days",
      "You make me feel cherished",
      "Your spontaneity and sense of adventure",
      "The peace I feel when I'm with you",
      "Your incredible heart",
      "You accept me completely",
      "The way you make ordinary days extraordinary",
      "Your wisdom beyond your years",
      "You bring out the best in me",
      "Your gentle nature",
      "The way you love with all your heart",
      "Your quirks that make you uniquely you",
      "You're my favorite person to be with",
      "Your eyes tell stories words never could",
      "The way you make me feel like I'm home",
      "Your beautiful soul shines through everything you do",
      "You're my best friend and my love",
      "Simply because you're you, and that's everything"
    ];
  }
  
  createReasonCards() {
    this.reasons.forEach((reason, index) => {
      const card = document.createElement('div');
      card.className = 'reason-card';
      card.innerHTML = `
        <div class="reason-number">${index + 1}</div>
        <p class="reason-text">${reason}</p>
      `;
      this.container.appendChild(card);
    });
  }
  
  setupScrollObserver() {
    const cards = document.querySelectorAll('.reason-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
            if (state.instances.soundEffects) {
              state.instances.soundEffects.playChime();
            }
          }, 100);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });
    
    cards.forEach(card => observer.observe(card));
  }
}

// ═══════════════════════════════════════════════════════════
// 3D ROSE (Basic Three.js Implementation)
// ═══════════════════════════════════════════════════════════

class Rose3D {
  constructor() {
    this.container = document.getElementById('rose-3d-container');
    if (!this.container || typeof THREE === 'undefined') {
      console.log('Three.js not loaded or container not found');
      return;
    }
    
    this.fallingPetals = [];
    this.resetBtn = document.getElementById('reset-petals');
    
    this.init();
    this.createRose();
    this.setupEventListeners();
    this.animate();
  }
  
  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0e27);
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xff6b9d, 1, 100);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0xd4a5ff, 0.5, 100);
    pointLight2.position.set(-5, -5, 5);
    this.scene.add(pointLight2);
  }
  
  createRose() {
    this.rose = new THREE.Group();
    
    // Stem
    const stemGeometry = new THREE.CylinderGeometry(0.05, 0.08, 3, 8);
    const stemMaterial = new THREE.MeshPhongMaterial({ color: 0x2d5037 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = -1.5;
    this.rose.add(stem);
    
    // Petals
    this.petals = [];
    const petalCount = 12;
    const petalGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    
    for (let i = 0; i < petalCount; i++) {
      const petalMaterial = new THREE.MeshPhongMaterial({
        color: 0xff6b9d,
        shininess: 30,
        transparent: true,
        opacity: 0.9
      });
      
      const petal = new THREE.Mesh(petalGeometry, petalMaterial);
      const angle = (i / petalCount) * Math.PI * 2;
      const layer = Math.floor(i / 4);
      const radius = 0.5 + layer * 0.3;
      
      petal.position.x = Math.cos(angle) * radius;
      petal.position.z = Math.sin(angle) * radius;
      petal.position.y = layer * 0.2;
      petal.scale.set(0.8, 0.4, 0.3);
      petal.rotation.y = angle;
      
      this.rose.add(petal);
      this.petals.push(petal);
    }
    
    // Center
    const centerGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const centerMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700, emissive: 0xffaa00 });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    center.position.y = 0.3;
    this.rose.add(center);
    
    this.scene.add(this.rose);
  }
  
  setupEventListeners() {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    this.renderer.domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    this.renderer.domElement.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        
        this.rose.rotation.y += deltaX * 0.01;
        this.rose.rotation.x += deltaY * 0.01;
        
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });
    
    this.renderer.domElement.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Touch support
    this.renderer.domElement.addEventListener('touchstart', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    
    this.renderer.domElement.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        
        this.rose.rotation.y += deltaX * 0.01;
        this.rose.rotation.x += deltaY * 0.01;
        
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });
    
    this.renderer.domElement.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Reset button
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetPetals());
    }
    
    // Microphone blow detection (optional - requires permission)
    this.setupMicrophoneDetection();
    
    // Window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }
  
  setupMicrophoneDetection() {
    // This is a simplified version - full implementation would need user permission
    // For now, we'll make petals fall randomly
    setInterval(() => {
      if (Math.random() < 0.05 && this.petals.length > 0) {
        this.dropPetal();
      }
    }, 1000);
  }
  
  dropPetal() {
    if (this.petals.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * this.petals.length);
    const petal = this.petals[randomIndex];
    
    this.petals.splice(randomIndex, 1);
    this.fallingPetals.push({
      mesh: petal,
      velocity: { x: (Math.random() - 0.5) * 0.02, y: -0.02, z: (Math.random() - 0.5) * 0.02 },
      rotation: { x: Math.random() * 0.1, y: Math.random() * 0.1, z: Math.random() * 0.1 }
    });
  }
  
  resetPetals() {
    this.fallingPetals.forEach(fp => {
      this.rose.add(fp.mesh);
      // Reset position (simplified)
    });
    this.fallingPetals = [];
  }
  
  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Gentle auto-rotation
    this.rose.rotation.y += 0.002;
    
    // Update falling petals
    this.fallingPetals.forEach((fp, index) => {
      fp.mesh.position.x += fp.velocity.x;
      fp.mesh.position.y += fp.velocity.y;
      fp.mesh.position.z += fp.velocity.z;
      
      fp.mesh.rotation.x += fp.rotation.x;
      fp.mesh.rotation.y += fp.rotation.y;
      fp.mesh.rotation.z += fp.rotation.z;
      
      // Remove if fallen too far
      if (fp.mesh.position.y < -5) {
        this.scene.remove(fp.mesh);
        this.fallingPetals.splice(index, 1);
      }
    });
    
    this.renderer.render(this.scene, this.camera);
  }
  
  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SoundEffects,
    ShootingStars,
    LoveNotesJar,
    ReasonsILoveYou,
    Rose3D
  };
}
