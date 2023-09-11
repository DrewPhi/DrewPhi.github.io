let particles = [];
const num = 10000;
const noiseScale = 0.01 / 2;
let time = 0; // Variable for time

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }

  clear();
}

function draw() {
  background(0, 10);
  time += 0.01; // Increment time
  strokeWeight(1);
  for (let i = 0; i < num; i++) {
    let p = particles[i];
    stroke(getColor(p, time));
    point(p.x, p.y);

    // Modify the noise input with time for temporal variation
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale + time);
    let a = TAU * n;
    p.x += cos(a);
    p.y += sin(a);
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}

function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function getColor(particle, t) {
  let randomSeedX = particle.x * 0.01;
  let randomSeedY = particle.y * 0.01;
  let lerpingForward = noise(randomSeedX, randomSeedY, t) > 0.5;
  let lerpAmt = noise(randomSeedX + 1000, randomSeedY + 1000, t);
  
  if (lerpingForward) {
    lerpAmt += 0.05;
    if (lerpAmt >= 1) {
      lerpAmt = 1;
    }
  } else {
    lerpAmt -= 0.05;
    if (lerpAmt <= 0) {
      lerpAmt = 0;
    }
  }
  
  return lerpColor(color(255, 255, 153, 255), color(192, 192, 192, 255), lerpAmt);
    //return lerpColor(color(0, 0, 255, 255), color(255, 0, 0, 255), lerpAmt);

}
