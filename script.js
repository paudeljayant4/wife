// Config
const CONFIG = {
  stars: { count: 200, countMobile: 100 },
  rose: { petalCount: 12, bloomSpeed: 0.02 },
  fireflies: { count: 30, countMobile: 15 },
  shootingStars: { frequency: 3000, speed: 15 },
  typing: { text: "In the vastness of space, across infinite possibilities, I found you...", delay: 80 }
};

const state = {
  isMobile: /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent),
  audioPlaying: false
};

// Init
document.addEventListener('DOMContentLoaded', init);

function init() {
  if (state.isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)) {
    CONFIG.stars.count = CONFIG.stars.countMobile;
    CONFIG.fireflies.count = CONFIG.fireflies.countMobile;
  }
  
  // Music
  const music = document.getElementById('music');
  const audioBtn = document.getElementById('audio-btn');
  
  if (music && audioBtn) {
    music.volume = 0.3;
    audioBtn.addEventListener('click', () => {
      if (state.audioPlaying) {
        music.pause();
        audioBtn.classList.add('paused');
        state.audioPlaying = false;
      } else {
        music.play().catch(() => {});
        audioBtn.classList.remove('paused');
        state.audioPlaying = true;
      }
    });
  }
  
  // Intro
  const intro = document.getElementById('intro');
  const startBtn = document.getElementById('start-btn');
  
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      intro.classList.remove('active');
      if (music) {
        music.play().catch(() => {});
        state.audioPlaying = true;
        audioBtn.classList.remove('paused');
      }
      setTimeout(startExperience, 800);
    });
  }
  
  // Initialize
  setTimeout(() => {
    try { new StarField(); } catch(e) {}
    try { new ShootingStars(); } catch(e) {}
    try { new Rose(); } catch(e) {}
    try { initTimeline(); } catch(e) {}
    try { initEnvelope(); } catch(e) {}
    try { new Fireflies(); } catch(e) {}
    try { initGSAP(); } catch(e) {}
  }, 300);
  
  // Replay
  const replay = document.getElementById('replay');
  if (replay) {
    replay.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => location.reload(), 1000);
    });
  }
}

function startExperience() {
  typeText();
}

// Typing
function typeText() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  
  const text = CONFIG.typing.text;
  let i = 0;
  
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, CONFIG.typing.delay);
    } else {
      el.classList.add('finished');
    }
  }
  
  setTimeout(type, 500);
}

// StarField
class StarField {
  constructor() {
    this.canvas = document.getElementById('star-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    
    this.resize();
    this.createStars();
    this.animate();
    
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resize();
        this.createStars();
      }, 250);
    });
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
  }
  
  createStars() {
    this.stars = [];
    for (let i = 0; i < CONFIG.stars.count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: 0.5 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        twinkleDir: Math.random() > 0.5 ? 1 : -1
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.stars.forEach(star => {
      star.alpha += star.twinkleSpeed * star.twinkleDir;
      if (star.alpha >= 1 || star.alpha <= 0.2) star.twinkleDir *= -1;
      
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(232, 244, 255, ${star.alpha})`;
      this.ctx.shadowBlur = star.radius * 3;
      this.ctx.shadowColor = `rgba(232, 244, 255, ${star.alpha * 0.8})`;
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Shooting Stars
class ShootingStars {
  constructor() {
    this.canvas = document.getElementById('shooting-stars');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    
    this.resize();
    this.animate();
    this.startCreating();
    
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.resize(), 250);
    });
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  startCreating() {
    this.createStar();
    setInterval(() => this.createStar(), CONFIG.shootingStars.frequency);
  }
  
  createStar() {
    const angle = Math.random() * Math.PI / 4 + Math.PI / 6;
    this.stars.push({
      x: Math.random() * this.canvas.width,
      y: Math.random() * (this.canvas.height * 0.5),
      vx: Math.cos(angle) * CONFIG.shootingStars.speed,
      vy: Math.sin(angle) * CONFIG.shootingStars.speed,
      trail: [],
      life: 1,
      size: 2 + Math.random() * 2
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.stars.forEach((star, idx) => {
      star.x += star.vx;
      star.y += star.vy;
      star.trail.push({ x: star.x, y: star.y, alpha: star.life });
      
      if (star.trail.length > 100) star.trail.shift();
      star.life -= 0.01;
      
      star.trail.forEach((point, i) => {
        const alpha = (i / star.trail.length) * point.alpha;
        const size = star.size * (i / star.trail.length);
        
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.fill();
      });
      
      if (star.life <= 0 || star.x > this.canvas.width || star.y > this.canvas.height) {
        this.stars.splice(idx, 1);
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Rose
class Rose {
  constructor() {
    this.canvas = document.getElementById('rose-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.bloomProgress = 0;
    this.isBloming = false;
    this.petals = [];
    this.message = document.getElementById('rose-msg');
    
    this.resize();
    this.setupPetals();
    this.draw();
    
    this.canvas.addEventListener('click', () => this.bloom());
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.resize(), 250);
    });
  }
  
  resize() {
    const size = Math.min(550, window.innerWidth - 40);
    this.canvas.width = size;
    this.canvas.height = size;
    this.cx = size / 2;
    this.cy = size / 2;
  }
  
  setupPetals() {
    for (let i = 0; i < CONFIG.rose.petalCount; i++) {
      this.petals.push({
        angle: (i / CONFIG.rose.petalCount) * Math.PI * 2,
        layer: Math.floor(i / 4),
        size: 40 + Math.floor(i / 4) * 18
      });
    }
  }
  
  bloom() {
    if (this.isBloming) return;
    this.isBloming = true;
    
    const animate = () => {
      if (this.bloomProgress < 1) {
        this.bloomProgress += CONFIG.rose.bloomSpeed;
        this.draw();
        requestAnimationFrame(animate);
      } else {
        this.bloomProgress = 1;
        this.draw();
        if (this.message) this.message.classList.add('revealed');
      }
    };
    
    animate();
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Stem
    const g = this.ctx.createLinearGradient(this.cx, this.canvas.height, this.cx, this.cy + 50);
    g.addColorStop(0, '#2d5037');
    g.addColorStop(1, '#5a8c6a');
    this.ctx.strokeStyle = g;
    this.ctx.lineWidth = 6;
    this.ctx.beginPath();
    this.ctx.moveTo(this.cx, this.canvas.height);
    this.ctx.quadraticCurveTo(this.cx + 5, this.cy + 100, this.cx, this.cy + 50);
    this.ctx.stroke();
    
    // Petals
    this.petals.forEach((petal, idx) => {
      const progress = Math.max(0, Math.min(1, (this.bloomProgress * 1.5) - (idx * 0.04)));
      this.ctx.save();
      this.ctx.translate(this.cx, this.cy);
      this.ctx.rotate(petal.angle);
      
      const dist = petal.size * progress;
      const w = 35 * progress;
      const h = 48 * progress;
      
      const pg = this.ctx.createRadialGradient(0, -dist, 0, 0, -dist, w);
      pg.addColorStop(0, '#ffcce0');
      pg.addColorStop(0.6, '#ff8fb5');
      pg.addColorStop(1, '#ff6b9d');
      
      this.ctx.beginPath();
      this.ctx.ellipse(0, -dist, w, h, 0, 0, Math.PI * 2);
      this.ctx.fillStyle = pg;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = 'rgba(255, 107, 157, 0.7)';
      this.ctx.fill();
      this.ctx.restore();
    });
    
    // Center
    const cg = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, 20 * this.bloomProgress);
    cg.addColorStop(0, '#ffe14d');
    cg.addColorStop(1, '#ffd700');
    this.ctx.beginPath();
    this.ctx.arc(this.cx, this.cy, 20 * this.bloomProgress, 0, Math.PI * 2);
    this.ctx.fillStyle = cg;
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = 'rgba(255, 215, 0, 0.9)';
    this.ctx.fill();
  }
}

// Timeline
function initTimeline() {
  const items = document.querySelectorAll('.timeline .item');
  if (!items.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 100);
      }
    });
  }, { threshold: 0.2 });
  
  items.forEach(item => observer.observe(item));
}

// Envelope
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  if (!envelope) return;
  
  envelope.addEventListener('click', function() {
    this.classList.toggle('open');
  });
}

// Fireflies
class Fireflies {
  constructor() {
    this.canvas = document.getElementById('firefly-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.fireflies = [];
    
    this.resize();
    this.create();
    this.animate();
    
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resize();
        this.create();
      }, 250);
    });
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  create() {
    this.fireflies = [];
    for (let i = 0; i < CONFIG.fireflies.count; i++) {
      this.fireflies.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 2 + Math.random() * 2,
        alpha: 0.5 + Math.random() * 0.5,
        glowSpeed: 0.02 + Math.random() * 0.03,
        glowDir: Math.random() > 0.5 ? 1 : -1,
        hue: 45 + Math.random() * 20
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.fireflies.forEach(ff => {
      ff.x += ff.vx;
      ff.y += ff.vy;
      
      if (ff.x < 0 || ff.x > this.canvas.width) ff.vx *= -1;
      if (ff.y < 0 || ff.y > this.canvas.height) ff.vy *= -1;
      
      ff.x = Math.max(0, Math.min(this.canvas.width, ff.x));
      ff.y = Math.max(0, Math.min(this.canvas.height, ff.y));
      
      ff.alpha += ff.glowSpeed * ff.glowDir;
      if (ff.alpha >= 1 || ff.alpha <= 0.3) ff.glowDir *= -1;
      
      const g = this.ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, ff.radius * 4);
      g.addColorStop(0, `hsla(${ff.hue}, 100%, 75%, ${ff.alpha})`);
      g.addColorStop(1, `hsla(${ff.hue}, 100%, 55%, 0)`);
      
      this.ctx.beginPath();
      this.ctx.arc(ff.x, ff.y, ff.radius * 4, 0, Math.PI * 2);
      this.ctx.fillStyle = g;
      this.ctx.fill();
      
      this.ctx.beginPath();
      this.ctx.arc(ff.x, ff.y, ff.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${ff.hue}, 100%, 85%, ${ff.alpha})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `hsla(${ff.hue}, 100%, 70%, ${ff.alpha})`;
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// GSAP
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  
  try {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.section').forEach((panel, i) => {
      if (i > 0) {
        gsap.from(panel, {
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: 'power3.out'
        });
      }
    });
  } catch(e) {}
}
