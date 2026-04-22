const PARTICLE_COUNT = 1000;
const NOISE_SCALE = 0.01 / 2;
const PARTICLE_SPEED = 1.2;
const BACKGROUND_DARK = [34, 38, 36];
const BACKGROUND_ALPHA = [1, 2];

let particles = [];
let yellowColor;
let silverWhiteColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  yellowColor = color(255, 255, 161);
  silverWhiteColor = color(34, 3, 31, 70);

  if (!particles.length) {
    initializeParticles();
  }

  stroke(255);
  strokeWeight(1.5);
  clear();
}

windowResized = function() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
};

function draw() {
  background(...BACKGROUND_DARK, random() > 0.99 ? BACKGROUND_ALPHA[1] : BACKGROUND_ALPHA[0]);

  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    const p = particle.position;

    const n = noise(p.x * NOISE_SCALE, p.y * NOISE_SCALE, frameCount * NOISE_SCALE * NOISE_SCALE);

    let lerpedColor;
    if (n < particle.transitionThreshold) {
      lerpedColor = lerpColor(yellowColor, silverWhiteColor, n / particle.transitionThreshold);
    } else {
      lerpedColor = silverWhiteColor;
    }

    stroke(lerpedColor);
    point(p.x, p.y);

    const a = TAU * n;
    p.x += cos(a) * PARTICLE_SPEED;
    p.y += sin(a) * PARTICLE_SPEED;

    if (!onScreen(p)) {
      p.x = windowWidth;
      p.y = random(windowHeight);
    }
  }
}

function keyReleased() {
}

function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function initializeParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      position: createVector(random(width), random(height)),
      transitionThreshold: random(0.5, 0.9),
    });
  }
}
