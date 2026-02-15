/* ===== CONFIG ===== */
const CONFIG = {
  stars: {
    count: 200,
    countMobile: 100,
    twinkleSpeed: { min: 0.01, max: 0.03 },
    driftSpeed: 0.1,
    mouseRadius: 150
  },
  rose: {
    petalCount: 12,
    bloomSpeed: 0.02,
    layers: 3
  },
  fireflies: {
    count: 30,
    countMobile: 15,
    speed: 1.5
  },
  shootingStars: {
    frequency: 3000,
    speed: 15,
    trailLength: 100
  },
  typing: {
    text: "In the vastness of space, across infinite possibilities, I found you...",
    minDelay: 50,
    maxDelay: 100
  },
  constellation: {
    starSize: 4,
    connectLines: true
  }
};

const state = {
  isMobile: /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent),
  isTabVisible: true,
  instances: {},
  audioPlaying: false
};

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('visibilitychange', () => {
  state.isTabVisible = !document.hidden;
});

function init() {
  adjustForPerformance();
  
  // Background music
  const music = document.getElementById('music');
  const audioBtn = document.getElementById('audio-btn');
  
  if (music && audioBtn) {
    music.volume = 0.3; // Set to 30% volume
    
    audioBtn.addEventListener('click', () => {
      if (state.audioPlaying) {
        fadeOut(music, () => {
          music.pause();
          audioBtn.classList.add('paused');
          state.audioPlaying = false;
        });
      } else {
        music.play().catch(() => {});
        fadeIn(music, 0.3);
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
        fadeIn(music, 0.3);
        state.audioPlaying = true;
        audioBtn.classList.remove('paused');
      }
      setTimeout(startExperience, 800);
    });
  }
  
  // Initialize features
  setTimeout(() => {
    try { state.instances.stars = new StarField(); } catch (e) {}
    try { state.instances.shootingStars = new ShootingStars(); } catch (e) {}
    try { state.instances.constellation = new Constellation(); } catch (e) {}
    try { state.instances.rose = new Rose(); } catch (e) {}
    try { initTimeline(); } catch (e) {}
    try { initEnvelope(); } catch (e) {}
    try { state.instances.fireflies = new Fireflies(); } catch (e) {}
    try { initGSAP(); } catch (e) {}
  }, 300);
  
  // Replay
  const replayBtn = document.getElementById('replay');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => location.reload(), 1000);
    });
  }
}

// Fade in audio
function fadeIn(audio, targetVolume) {
  audio.volume = 0;
  const fadeInterval = setInterval(() => {
    if (audio.volume < targetVolume - 0.02) {
      audio.volume = Math.min(audio.volume + 0.02, targetVolume);
    } else {
      audio.volume = targetVolume;
      clearInterval(fadeInterval);
    }
  }, 100);
}

// Fade out audio
function fadeOut(audio, callback) {
  const fadeInterval = setInterval(() => {
    if (audio.volume > 0.02) {
      audio.volume = Math.max(audio.volume - 0.02, 0);
    } else {
      audio.volume = 0;
      clearInterval(fadeInterval);
      if (callback) callback();
    }
  }, 100);
}

function adjustForPerformance() {
  if (state.isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)) {
    CONFIG.stars.count = CONFIG.stars.countMobile;
    CONFIG.fireflies.count = CONFIG.fireflies.countMobile;
  }
}

function startExperience() {
  typeText();
  if (state.instances.constellation) {
    state.instances.constellation.start();
  }
}

/* ===== TYPING ===== */
function typeText() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  
  const text = CONFIG.typing.text;
  let i = 0;
  
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      const delay = CONFIG.typing.minDelay + Math.random() * (CONFIG.typing.maxDelay - CONFIG.typing.minDelay);
      setTimeout(type, delay);
    } else {
      el.classList.add('finished');
    }
  }
  
  setTimeout(type, 500);
}

/* ===== STARFIELD ===== */
class StarField {
  constructor() {
    this.canvas = document.getElementById('star-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    this.resize();
    this.createStars();
    this.setupEvents();
    this.animate();
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
        twinkleSpeed: CONFIG.stars.twinkleSpeed.min + Math.random() * (CONFIG.stars.twinkleSpeed.max - CONFIG.stars.twinkleSpeed.min),
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        drift: {
          x: (Math.random() - 0.5) * CONFIG.stars.driftSpeed,
          y: (Math.random() - 0.5) * CONFIG.stars.driftSpeed
        }
      });
    }
  }
  
  setupEvents() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resize();
        this.createStars();
      }, 250);
    });
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY + window.scrollY;
    });
  }
  
  animate() {
    if (!state.isTabVisible) {
      requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.stars.forEach(star => {
      // Twinkle
      star.alpha += star.twinkleSpeed * star.twinkleDir;
      if (star.alpha >= 1 || star.alpha <= 0.2) star.twinkleDir *= -1;
      
      // Drift
      star.x += star.drift.x;
      star.y += star.drift.y;
      
      // Wrap
      if (star.x < 0) star.x = this.canvas.width;
      if (star.x > this.canvas.width) star.x = 0;
      if (star.y < 0) star.y = this.canvas.height;
      if (star.y > this.canvas.height) star.y = 0;
      
      // Mouse interaction
      const dx = this.mouse.x - star.x;
      const dy = this.mouse.y - star.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < CONFIG.stars.mouseRadius) {
        const force = (CONFIG.stars.mouseRadius - dist) / CONFIG.stars.mouseRadius;
        star.x -= dx * force * 0.03;
        star.y -= dy * force * 0.03;
      }
      
      // Draw
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

/* ===== SHOOTING STARS ===== */
class ShootingStars {
  constructor() {
    this.canvas = document.getElementById('shooting-stars');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    
    this.resize();
    this.setupEvents();
    this.animate();
    this.startCreating();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  setupEvents() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.resize(), 250);
    });
  }
  
  startCreating() {
    this.createStar();
    this.interval = setInterval(() => this.createStar(), CONFIG.shootingStars.frequency);
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
    if (!state.isTabVisible) {
      requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.stars.forEach((star, idx) => {
      star.x += star.vx;
      star.y += star.vy;
      star.trail.push({ x: star.x, y: star.y, alpha: star.life });
      
      if (star.trail.length > CONFIG.shootingStars.trailLength) {
        star.trail.shift();
      }
      
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
        this.stars.splice(idx, 1);
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

/* ===== CONSTELLATION ===== */
class Constellation {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10';
    
    const section = document.getElementById('opening');
    if (section) section.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.progress = 0;
    
    this.resize();
    this.createStars();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createStars() {
    const H = [[0,0],[0,1],[0,2],[0,3],[0,4],[1,2],[2,0],[2,1],[2,2],[2,3],[2,4]];
    const I = [[1,0],[1,1],[1,2],[1,3],[1,4]];
    const M = [[0,0],[0,1],[0,2],[0,3],[0,4],[1,1],[2,2],[3,1],[4,0],[4,1],[4,2],[4,3],[4,4]];
    const A = [[1,0],[0,1],[2,1],[0,2],[1,2],[2,2],[0,3],[2,3],[0,4],[2,4]];
    const N = [[0,0],[0,1],[0,2],[0,3],[0,4],[1,1],[2,2],[3,3],[4,0],[4,1],[4,2],[4,3],[4,4]];
    const I2 = [[1,0],[1,1],[1,2],[1,3],[1,4]];
    
    const letters = [H, I, M, A, N, I2];
    const scale = state.isMobile ? 10 : 14;
    const spacing = 45;
    
    let totalWidth = 0;
    letters.forEach(letter => {
      const w = Math.max(...letter.map(p => p[0])) * scale;
      totalWidth += w + spacing;
    });
    totalWidth -= spacing;
    
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2 - 30;
    let offsetX = cx - totalWidth / 2;
    
    letters.forEach((letter, letterIdx) => {
      letter.forEach(([x, y], pointIdx) => {
        this.stars.push({
          x: offsetX + x * scale,
          y: cy + y * scale,
          alpha: 0,
          radius: CONFIG.constellation.starSize,
          delay: (letterIdx * 15 + pointIdx * 3),
          letterIdx
        });
      });
      
      const w = Math.max(...letter.map(p => p[0])) * scale;
      offsetX += w + spacing;
    });
  }
  
  start() {
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.stars.forEach((star, idx) => {
        if (this.progress > star.delay && star.alpha < 1) {
          star.alpha += 0.1;
        }
        
        if (star.alpha > 0) {
          // Star
          this.ctx.beginPath();
          this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(255, 215, 0, ${star.alpha})`;
          this.ctx.shadowBlur = 20;
          this.ctx.shadowColor = `rgba(255, 215, 0, ${star.alpha})`;
          this.ctx.fill();
          
          // Center
          this.ctx.beginPath();
          this.ctx.arc(star.x, star.y, star.radius * 0.5, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.8})`;
          this.ctx.shadowBlur = 10;
          this.ctx.fill();
          
          // Lines
          if (CONFIG.constellation.connectLines && idx > 0) {
            const prev = this.stars[idx - 1];
            if (prev.letterIdx === star.letterIdx && prev.alpha > 0.3 && star.alpha > 0.3) {
              this.ctx.beginPath();
              this.ctx.moveTo(prev.x, prev.y);
              this.ctx.lineTo(star.x, star.y);
              this.ctx.strokeStyle = `rgba(212, 165, 255, ${Math.min(prev.alpha, star.alpha) * 0.5})`;
              this.ctx.lineWidth = 1.5;
              this.ctx.shadowBlur = 5;
              this.ctx.stroke();
            }
          }
        }
      });
      
      this.progress += 2;
      
      if (this.progress < this.stars[this.stars.length - 1].delay + 50) {
        requestAnimationFrame(animate);
      }
    };
    
    setTimeout(() => requestAnimationFrame(animate), 1500);
  }
}

/* ===== ROSE ===== */
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
    this.setupEvents();
  }
  
  resize() {
    const size = Math.min(this.canvas.parentElement?.clientWidth || 500, 550);
    this.canvas.width = size;
    this.canvas.height = size;
    this.cx = size / 2;
    this.cy = size / 2;
  }
  
  setupPetals() {
    for (let i = 0; i < CONFIG.rose.petalCount; i++) {
      this.petals.push({
        angle: (i / CONFIG.rose.petalCount) * Math.PI * 2,
        layer: Math.floor(i / (CONFIG.rose.petalCount / CONFIG.rose.layers)),
        size: 40 + (Math.floor(i / (CONFIG.rose.petalCount / CONFIG.rose.layers)) * 18),
        rotation: (Math.random() - 0.5) * 0.3
      });
    }
  }
  
  setupEvents() {
    this.canvas.addEventListener('click', () => this.bloom());
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.resize(), 250);
    });
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
    
    this.drawStem();
    this.drawLeaf(this.cx - 25, this.cy + 90, -0.6);
    this.drawLeaf(this.cx + 25, this.cy + 70, 0.6);
    
    this.petals.forEach((petal, idx) => {
      const progress = Math.max(0, Math.min(1, (this.bloomProgress * 1.5) - (idx * 0.04)));
      this.drawPetal(petal, progress);
    });
    
    this.drawCenter();
  }
  
  drawStem() {
    const g = this.ctx.createLinearGradient(this.cx, this.canvas.height, this.cx, this.cy + 50);
    g.addColorStop(0, '#2d5037');
    g.addColorStop(0.5, '#3d6647');
    g.addColorStop(1, '#5a8c6a');
    
    this.ctx.strokeStyle = g;
    this.ctx.lineWidth = 6;
    this.ctx.lineCap = 'round';
    this.ctx.shadowBlur = 5;
    this.ctx.shadowColor = 'rgba(45, 80, 55, 0.5)';
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.cx, this.canvas.height);
    this.ctx.quadraticCurveTo(this.cx + 5, this.cy + 100, this.cx, this.cy + 50);
    this.ctx.stroke();
    
    this.ctx.shadowBlur = 0;
  }
  
  drawLeaf(x, y, angle) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
    
    const g = this.ctx.createRadialGradient(0, 0, 0, 0, 0, 28);
    g.addColorStop(0, '#6ba876');
    g.addColorStop(0.5, '#5a8c6a');
    g.addColorStop(1, '#3d6647');
    
    this.ctx.shadowBlur = 8;
    this.ctx.shadowColor = 'rgba(45, 80, 55, 0.4)';
    
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, 20, 32, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = g;
    this.ctx.fill();
    
    this.ctx.shadowBlur = 0;
    this.ctx.strokeStyle = 'rgba(61, 102, 71, 0.6)';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -28);
    this.ctx.lineTo(0, 28);
    this.ctx.stroke();
    
    this.ctx.restore();
  }
  
  drawPetal(petal, progress) {
    this.ctx.save();
    this.ctx.translate(this.cx, this.cy);
    this.ctx.rotate(petal.angle + (petal.rotation * progress));
    
    const dist = petal.size * progress;
    const w = 35 * progress;
    const h = 48 * progress;
    
    const g = this.ctx.createRadialGradient(0, -dist, 0, 0, -dist, w);
    g.addColorStop(0, '#ffcce0');
    g.addColorStop(0.3, '#ffa6c9');
    g.addColorStop(0.6, '#ff8fb5');
    g.addColorStop(0.85, '#ff6b9d');
    g.addColorStop(1, '#e85894');
    
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = 'rgba(255, 107, 157, 0.7)';
    
    this.ctx.beginPath();
    this.ctx.ellipse(0, -dist, w, h, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = g;
    this.ctx.fill();
    
    this.ctx.restore();
  }
  
  drawCenter() {
    const r = 20 * this.bloomProgress;
    
    const outerGlow = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, r * 2);
    outerGlow.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
    outerGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
    
    this.ctx.beginPath();
    this.ctx.arc(this.cx, this.cy, r * 2, 0, Math.PI * 2);
    this.ctx.fillStyle = outerGlow;
    this.ctx.fill();
    
    const g = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, r);
    g.addColorStop(0, '#fff4b3');
    g.addColorStop(0.5, '#ffe14d');
    g.addColorStop(0.8, '#ffd700');
    g.addColorStop(1, '#d4a800');
    
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = 'rgba(255, 215, 0, 0.9)';
    
    this.ctx.beginPath();
    this.ctx.arc(this.cx, this.cy, r, 0, Math.PI * 2);
    this.ctx.fillStyle = g;
    this.ctx.fill();
    
    this.ctx.shadowBlur = 0;
  }
}

/* ===== TIMELINE ===== */
function initTimeline() {
  const items = document.querySelectorAll('.timeline .item');
  if (!items.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        const delay = parseInt(entry.target.dataset.index || 0) * 200;
        setTimeout(() => entry.target.classList.add('visible'), delay);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });
  
  items.forEach((item, idx) => {
    item.dataset.index = idx;
    observer.observe(item);
  });
}

/* ===== ENVELOPE ===== */
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const hint = document.querySelector('.hint');
  if (!envelope) return;
  
  envelope.addEventListener('click', function() {
    const isOpen = this.classList.toggle('open');
    if (isOpen && hint) hint.style.opacity = '0';
  });
}

/* ===== FIREFLIES ===== */
class Fireflies {
  constructor() {
    this.canvas = document.getElementById('firefly-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.fireflies = [];
    
    this.resize();
    this.create();
    this.setupEvents();
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  create() {
    for (let i = 0; i < CONFIG.fireflies.count; i++) {
      this.fireflies.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * CONFIG.fireflies.speed,
        vy: (Math.random() - 0.5) * CONFIG.fireflies.speed,
        radius: 2 + Math.random() * 2,
        alpha: 0.5 + Math.random() * 0.5,
        glowSpeed: 0.02 + Math.random() * 0.03,
        glowDir: Math.random() > 0.5 ? 1 : -1,
        hue: 45 + Math.random() * 20,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
  
  setupEvents() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resize();
        this.create();
      }, 250);
    });
  }
  
  animate() {
    if (!state.isTabVisible) {
      requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.fireflies.forEach(ff => {
      ff.phase += 0.02;
      ff.x += ff.vx + Math.sin(ff.phase) * 0.5;
      ff.y += ff.vy + Math.cos(ff.phase) * 0.5;
      
      if (ff.x < 0 || ff.x > this.canvas.width) ff.vx *= -1;
      if (ff.y < 0 || ff.y > this.canvas.height) ff.vy *= -1;
      
      ff.x = Math.max(0, Math.min(this.canvas.width, ff.x));
      ff.y = Math.max(0, Math.min(this.canvas.height, ff.y));
      
      ff.alpha += ff.glowSpeed * ff.glowDir;
      if (ff.alpha >= 1 || ff.alpha <= 0.3) ff.glowDir *= -1;
      
      // Glow
      const g = this.ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, ff.radius * 4);
      g.addColorStop(0, `hsla(${ff.hue}, 100%, 75%, ${ff.alpha})`);
      g.addColorStop(0.4, `hsla(${ff.hue}, 100%, 65%, ${ff.alpha * 0.6})`);
      g.addColorStop(1, `hsla(${ff.hue}, 100%, 55%, 0)`);
      
      this.ctx.beginPath();
      this.ctx.arc(ff.x, ff.y, ff.radius * 4, 0, Math.PI * 2);
      this.ctx.fillStyle = g;
      this.ctx.fill();
      
      // Core
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

/* ===== GSAP ===== */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  
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
  } catch (e) {}
}
