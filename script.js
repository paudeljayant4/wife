const introOverlay = document.getElementById('intro-overlay');
const beginBtn = document.getElementById('begin-experience');
const typedLineEl = document.getElementById('typed-line');
const constellationName = document.getElementById('constellation-name');
const scrollNextBtn = document.getElementById('scroll-next');

const openingLine = 'In a universe of billions… I found you.';
let audioContext;

function setupStarfield() {
  const canvas = document.getElementById('star-canvas');
  const context = canvas.getContext('2d');
  const stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars.length = 0;
    for (let i = 0; i < 220; i += 1) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.3,
        speed: Math.random() * 0.35 + 0.05,
        alpha: Math.random() * 0.8 + 0.2
      });
    }
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = -5;
        star.x = Math.random() * canvas.width;
      }
      context.beginPath();
      context.fillStyle = `rgba(255,255,255,${star.alpha})`;
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
}

function typeLine() {
  typedLineEl.textContent = '';
  let index = 0;
  const timer = setInterval(() => {
    typedLineEl.textContent += openingLine[index];
    index += 1;
    if (index >= openingLine.length) {
      clearInterval(timer);
      gsap.to(constellationName, { opacity: 1, y: -8, duration: 1.4, ease: 'power2.out' });
    }
  }, 60);
}

function createAudioSystem() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const master = audioContext.createGain();
  master.gain.value = 0.12;
  master.connect(audioContext.destination);

  const drone = audioContext.createOscillator();
  drone.type = 'triangle';
  drone.frequency.value = 196;

  const droneFilter = audioContext.createBiquadFilter();
  droneFilter.type = 'lowpass';
  droneFilter.frequency.value = 480;

  const droneGain = audioContext.createGain();
  droneGain.gain.value = 0.001;

  drone.connect(droneFilter);
  droneFilter.connect(droneGain);
  droneGain.connect(master);
  drone.start();

  droneGain.gain.setTargetAtTime(0.08, audioContext.currentTime + 0.1, 4.5);

  return {
    chime(freq = 660, length = 0.25) {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(master);
      const now = audioContext.currentTime;
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + length);
      osc.start(now);
      osc.stop(now + length + 0.03);
    }
  };
}

const audio = { chime: () => {} };

function createRoseScene() {
  const canvas = document.getElementById('rose-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  camera.position.set(0, 1.4, 6.8);

  scene.add(new THREE.AmbientLight(0xffd4e8, 0.55));
  const key = new THREE.PointLight(0xff5ea7, 1.4, 25);
  key.position.set(2.2, 2.8, 3);
  scene.add(key);

  const roseGroup = new THREE.Group();

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.07, 3.1, 18),
    new THREE.MeshStandardMaterial({ color: 0x2f7a4a, roughness: 0.9 })
  );
  stem.position.y = -1.4;
  roseGroup.add(stem);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0x8f123f, emissive: 0x2b0712, emissiveIntensity: 0.45 })
  );
  roseGroup.add(core);

  const petals = [];
  const petalMaterial = new THREE.MeshStandardMaterial({ color: 0xcf296f, roughness: 0.3, metalness: 0.1 });
  for (let ring = 0; ring < 4; ring += 1) {
    const count = 6 + ring * 4;
    const radius = 0.48 + ring * 0.16;
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2;
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.46, 20, 20), petalMaterial);
      petal.scale.set(0.7, 0.23, 1.05);
      petal.position.set(Math.cos(angle) * radius, ring * 0.12 + 0.1, Math.sin(angle) * radius);
      petal.rotation.set(Math.PI / 3.8, angle, 0);
      petals.push(petal);
      roseGroup.add(petal);
    }
  }

  const sparkles = new THREE.Group();
  for (let i = 0; i < 100; i += 1) {
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.013, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffd6f0, transparent: true, opacity: 0.72 })
    );
    dot.position.set((Math.random() - 0.5) * 8, Math.random() * 5 - 1, (Math.random() - 0.5) * 8);
    sparkles.add(dot);
  }
  scene.add(sparkles);
  scene.add(roseGroup);

  const pointer = new THREE.Vector2();
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  });

  function animate() {
    roseGroup.rotation.y += 0.003;
    roseGroup.rotation.x = pointer.y * 0.08;
    key.position.x = 2 + pointer.x * 1.2;
    sparkles.rotation.y += 0.0016;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  canvas.addEventListener('click', () => {
    petals.forEach((petal, index) => {
      gsap.to(petal.rotation, {
        x: petal.rotation.x - 0.36,
        z: (index % 2 ? 1 : -1) * 0.18,
        duration: 1.4,
        ease: 'power2.out'
      });
      gsap.to(petal.position, {
        y: petal.position.y + 0.23,
        duration: 1.3,
        ease: 'power2.out'
      });
    });

    document.getElementById('rose-message').classList.add('show');
    audio.chime(740, 0.45);
  });

  window.addEventListener('resize', () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  });
}

function setupTimeline() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    '#timeline h2',
    { autoAlpha: 0, y: 22 },
    { autoAlpha: 1, y: 0, duration: 1, scrollTrigger: { trigger: '#timeline h2', start: 'top 88%' } }
  );

  gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    gsap.fromTo(
      item,
      { autoAlpha: 0, x: index % 2 === 0 ? -30 : 30, y: 20 },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 84%' }
      }
    );
  });
}

function setupEnvelope() {
  const envelope = document.getElementById('envelope');
  envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
    audio.chime(envelope.classList.contains('open') ? 520 : 420, 0.28);
  });
}

function setupFireflies() {
  const canvas = document.getElementById('firefly-canvas');
  const context = canvas.getContext('2d');
  const fireflies = [];

  function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    fireflies.length = 0;
    for (let i = 0; i < 48; i += 1) {
      fireflies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function tick() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const fly of fireflies) {
      fly.x += fly.vx;
      fly.y += fly.vy;
      fly.phase += 0.06;
      if (fly.x < 0 || fly.x > canvas.width) fly.vx *= -1;
      if (fly.y < 0 || fly.y > canvas.height) fly.vy *= -1;

      const alpha = 0.2 + (Math.sin(fly.phase) + 1) * 0.35;
      context.beginPath();
      context.fillStyle = `rgba(255,236,135,${alpha})`;
      context.arc(fly.x, fly.y, fly.r, 0, Math.PI * 2);
      context.fill();
    }
    requestAnimationFrame(tick);
  }

  resize();
  tick();
  window.addEventListener('resize', resize);
}

function startExperience() {
  const timeline = gsap.timeline();
  timeline.to(introOverlay, { autoAlpha: 0, duration: 0.7 }).set(introOverlay, { display: 'none' });
  typeLine();
  createRoseScene();
  setupTimeline();
  setupEnvelope();
  setupFireflies();
}

beginBtn.addEventListener('click', async () => {
  if (!audioContext) {
    Object.assign(audio, createAudioSystem());
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
  }
  audio.chime(660, 0.3);
  startExperience();
});

scrollNextBtn.addEventListener('click', () => {
  document.getElementById('rose-section').scrollIntoView({ behavior: 'smooth' });
  audio.chime(590, 0.22);
});

setupStarfield();
