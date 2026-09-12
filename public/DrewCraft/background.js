let particles = [];
const num = 1000;
const noiseScale = 0.01 / 2;
let yellowColor;
let silverWhiteColor;

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('flow-bg');
  yellowColor = color(255, 255, 161);
  silverWhiteColor = color(34, 3, 31, 70);
  initializeParticles();
  stroke(255);
  strokeWeight(1.5);
  clear();
}

windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  clear();
};

function draw() {
  background(34, 38, 36, random() > 0.99 ? 2 : 1);

  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    const p = particle.position;
    const n = noise(
      p.x * noiseScale,
      p.y * noiseScale,
      frameCount * noiseScale * noiseScale
    );

    let lerpedColor;
    if (n < particle.transitionThreshold) {
      lerpedColor = lerpColor(
        yellowColor,
        silverWhiteColor,
        n / particle.transitionThreshold
      );
    } else {
      lerpedColor = silverWhiteColor;
    }

    stroke(lerpedColor);
    point(p.x, p.y);

    const a = TAU * n;
    p.x += cos(a) * 1.2;
    p.y += sin(a) * 1.2;

    if (!onScreen(p)) {
      p.x = windowWidth;
      p.y = random(windowHeight);
    }
  }
}

function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function initializeParticles() {
  particles = [];
  for (let i = 0; i < num; i++) {
    particles.push({
      position: createVector(random(width), random(height)),
      transitionThreshold: random(0.5, 0.9),
    });
  }
}
