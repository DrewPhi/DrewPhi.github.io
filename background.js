let particles = [];
const num = 1000;

const noiseScale = 0.01 / 2;

// Define initial colors
let yellowColor;
let silverWhiteColor;
let colorChangeThreshold = 0.7; // Adjust this threshold value
function setup() {
  createCanvas(windowWidth, windowHeight);
  yellowColor = color(250, 255, 117,70);
  silverWhiteColor = color(255, 255, 255,70);

  initializeParticles();

  stroke(255);
  strokeWeight(3);
  clear();
}

windowResized = function() {
 let tempParticles = particles;
  noLoop();
  canvas.remove(); // Remove the existing canvas
  setup();
  particles = tempParticles;
  loop(); 
}

function draw() {
  background(0, 5);
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    let p = particle.position;

    // Calculate color interpolation based on noise
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);

    // Determine the color based on the transition threshold
    let lerpedColor;
    if (n < particle.transitionThreshold) {
      lerpedColor = lerpColor(yellowColor, silverWhiteColor, n / particle.transitionThreshold);
    } else {
      lerpedColor = silverWhiteColor;
    }

    stroke(lerpedColor);
    point(p.x, p.y);

    // Update particle position
    let a = TAU * n;
    p.x += cos(a) * 1.2;
    p.y += sin(a) * 1.2;

    // Check if the particle is off-screen
    if (!onScreen(p)) {
      p.x = windowWidth;
      p.y = random(windowHeight);
    }

    // Update color change rate individually
    particle.colorChangeRate += random(-0.0002, 0.0002); // Add some randomness

    // Decrease particle lifespan

    // Respawn particles with random lifespans greater than 5 seconds

  }
}
function keyReleased() {
  noiseSeed(millis());
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
      colorChangeRate: random(0.001, 0.01),
      transitionThreshold: random(0.5, 0.9),
      lifespan: random(30, 30), // Random lifespan greater than 5 seconds
    });
  }
}
