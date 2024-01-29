let xMin = -10;
let xMax = 10;
let yMin = -10;
let yMax = 10;
let particles = [];
let particleSize = 2;
let numParticles = 1000;
let step = 0.01; // Step size for particle movement
const maxParticleSpeed = 2; // Define your maximum particle speed here
let fixedPoints = []; // Array to store the fixed points
let stabiltiy = []; // Array to store the stability of the fixed points
let particleColors = []; // Array to store colors for particles
let colorChangeTimings = []; // Array to store color transition timings for particles
let colorChangeSpeeds = []; // Array to store color transition speeds for particles


function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeParticles();
  findFixedPoints();
  console.log(fixedPoints)
  processFixedPoints();
  classifyFixedPoints();
  console.log(fixedPoints);
  console.log(stabiltiy);
}


function draw() {
  background(0, 0, 0, 5); // Semi-transparent black background
  moveParticles();
  wrapParticles();
  drawParticles();
  drawFixedPoints();
  resetParticles();
}

function processFixedPoints() {
  let epsilon = 0.4; // Define the threshold for considering fixed points to be close
  let mergedFixedPoints = [];

  while (fixedPoints.length > 0) {
    // Take the first fixed point as a starting point for a cluster
    let cluster = [fixedPoints[0]];
    fixedPoints.splice(0, 1);

    // Check remaining fixed points for proximity to the cluster
    let i = 0;
    while (i < fixedPoints.length) {
      let point = fixedPoints[i];
      let closeToCluster = cluster.some(clusterPoint => dist(point.x, point.y, clusterPoint.x, clusterPoint.y) < epsilon);

      if (closeToCluster) {
        // Add point to cluster and remove from fixedPoints
        cluster.push(point);
        fixedPoints.splice(i, 1);
      } else {
        i++;
      }
    }

    // Calculate the average position of the cluster
    let avgX = cluster.reduce((sum, p) => sum + p.x, 0) / cluster.length;
    let avgY = cluster.reduce((sum, p) => sum + p.y, 0) / cluster.length;

    // Determine the stability of the merged fixed point
    let stability = cluster[0].stability; // Assuming all points in the cluster have the same stability

    // Add the merged fixed point to the list of merged fixed points
    mergedFixedPoints.push({ x: avgX, y: avgY, stability: stability });
  }

  // Update fixedPoints with the merged fixed points
  fixedPoints = mergedFixedPoints;
}



function resetParticles() {
  const offScreenTolerance = 1; // Tolerance for going off-screen
  const epsilon = 0.05; // Epsilon distance away from the fixed point
  const minVelocityThreshold = 0.05; // Minimum velocity threshold
  const halfProbability = 0.5; // Probability threshold for half of the cases

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    let velocity = createVector(xdot(particle.x, particle.y), ydot(particle.x, particle.y));

    let tooFarOffScreen = particle.x > xMax + offScreenTolerance ||
                          particle.x < xMin - offScreenTolerance ||
                          particle.y > yMax + offScreenTolerance ||
                          particle.y < yMin - offScreenTolerance;

    let tooCloseToStablePoint = fixedPoints.some(point => 
      point.stability !== "Unstable Node/Source" && 
      point.stability !== "Saddle Point" &&
      dist(particle.x, particle.y, point.x, point.y) < epsilon);

    let velocityTooLow = velocity.mag() < minVelocityThreshold;

    if (tooFarOffScreen || tooCloseToStablePoint || velocityTooLow) {
      if (random() > halfProbability) {
        resetParticleOnBorder(particle);
      } else {
        resetParticleNearUnstablePoint(particle, epsilon);
      }
    }
  }
}
function resetRandomParticle(particle) {
  particle.x = random(xMin, xMax);
  particle.y = random(yMin, yMax);
}
function resetParticleOnBorder(particle) {
  let side = Math.floor(random(4));
  switch (side) {
    case 0: // Top side
      particle.x = random(xMin, xMax);
      particle.y = yMin;
      break;
    case 1: // Right side
      particle.x = xMax;
      particle.y = random(yMin, yMax);
      break;
    case 2: // Bottom side
      particle.x = random(xMin, xMax);
      particle.y = yMax;
      break;
    case 3: // Left side
      particle.x = xMin;
      particle.y = random(yMin, yMax);
      break;
  }
}

function resetParticleNearUnstablePoint(particle, epsilon) {
  let unstablePoints = fixedPoints.filter(
    point => point.stability === "Unstable Node/Source" || point.stability === "Saddle Point"
  );

  if (unstablePoints.length > 0) {
    let randomUnstablePoint = unstablePoints[Math.floor(Math.random() * unstablePoints.length)];
    let angle = random(TWO_PI);
    let noiseFactor = random(0.5 * epsilon, 4 * epsilon); // Noise factor within 50% of epsilon
    particle.x = randomUnstablePoint.x + cos(angle) * (epsilon + noiseFactor);
    particle.y = randomUnstablePoint.y + sin(angle) * (epsilon + noiseFactor);
  } else {
    resetParticleOnBorder(particle);
  }
}








function drawFixedPoints() {
  noStroke();
  fill(255, 0, 0);
  let fixedPointSize = 8;
  for (let i = 0; i < fixedPoints.length; i++) {
    ellipse(map(fixedPoints[i].x, xMin, xMax, 0, width), map(fixedPoints[i].y, yMin, yMax, height, 0), fixedPointSize, fixedPointSize);
  }
}
function initializeParticles() {
  for (let i = 0; i < numParticles; i++) {
    particles.push(createVector(random(xMin, xMax), random(yMin, yMax)));

    // Randomly set initial color between startColor and endColor
    let startColor = color(255, 255, 161);
    let endColor = color(255, 0, 0);
    
    let initialColor = lerpColor(startColor, endColor, random(1));

    particleColors.push(initialColor);

    colorChangeTimings.push(random(100, 500)); // Random timings for color change
    colorChangeSpeeds.push(random(0.001, 0.001)); // Random transition speeds
  }
}




function moveParticles() {
  for (let i = 0; i < particles.length; i++) {
    let x = particles[i].x;
    let y = particles[i].y;
    let xDelta = xdot(x, y);
    let yDelta = ydot(x, y);

    // Calculate the speed of the particle
    let speed = sqrt(xDelta * xDelta + yDelta * yDelta);

    // If speed exceeds the maximum speed limit, adjust velocity
    if (speed > maxParticleSpeed) {
      let scaleFactor = maxParticleSpeed / speed;
      xDelta *= scaleFactor;
      yDelta *= scaleFactor;
    }

    particles[i].x += xDelta * step;
    particles[i].y += yDelta * step;
  }
}

function wrapParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].x = (particles[i].x - xMin) % (xMax - xMin) + xMin;
    particles[i].y = (particles[i].y - yMin) % (yMax - yMin) + yMin;
  }
}

function drawParticles() {
  strokeWeight(.75);
  for (let i = 0; i < particles.length; i++) {
    let currentColor = particleColors[i];
    let startColor = color(255, 255, 161);
    let endColor = color(255, 255, 255);
    let timing = colorChangeTimings[i];
    let changeSpeed = colorChangeSpeeds[i]; // Renamed from 'speed' to 'changeSpeed'

    if (frameCount % timing === 0) {
      colorChangeTimings[i] = random(100, 500);
    }

    let progress = (frameCount % timing) / timing;
    let lerpValue = (1 - cos(PI * progress)) / 2;

    particleColors[i] = lerpColor(startColor, endColor, lerpValue);

    stroke(particleColors[i]); // Set stroke color
    let prevX = map(particles[i].x, xMin, xMax, 0, width);
    let prevY = map(particles[i].y, yMin, yMax, height, 0);

    let x = particles[i].x;
    let y = particles[i].y;
    let xDelta = xdot(x, y);
    let yDelta = ydot(x, y);

    let particleSpeed = sqrt(xDelta * xDelta + yDelta * yDelta); // Renamed to 'particleSpeed'

    if (particleSpeed > maxParticleSpeed) {
      let scaleFactor = maxParticleSpeed / particleSpeed;
      xDelta *= scaleFactor;
      yDelta *= scaleFactor;
    }

    x += xDelta * step;
    y += yDelta * step;

    let newX = map(x, xMin, xMax, 0, width);
    let newY = map(y, yMin, yMax, height, 0);

    line(prevX, prevY, newX, newY);
    particles[i].x = x;
    particles[i].y = y;
  }
}





function xdot(x, y) {
  return (y-5.1)*(y-5.2);
}

function ydot(x, y) {
  return -(-y-x);
}
function xdotString() {
  return '(y-5.1)*(y-5.2)';
}
function ydotString() {
  return '-(-y-x)';
}



function classifyFixedPoints() {
  console.log("Solutions",fixedPoints)
  for (let fixedpoint of fixedPoints) {
        const jacobian = math.matrix([
          [
            math.derivative(xdotString(), 'x').evaluate({ x: fixedpoint.x, y: fixedpoint.y }),
            math.derivative(xdotString(), 'y').evaluate({ x: fixedpoint.x, y: fixedpoint.y })
          ],
          [
            math.derivative(ydotString(), 'x').evaluate({ x: fixedpoint.x, y: fixedpoint.y }),
            math.derivative(ydotString(), 'y').evaluate({ x: fixedpoint.x, y: fixedpoint.y })
          ]
        ]);
        
        const eigen = math.eigs(jacobian);
        const eigenValuesReal = (eigen.values.map((eig) => eig.re))._data;
        //code to convert eigenValuesReal to an array called eigenArry

        let stability = "";
        if (eigenValuesReal.every((value) => value === 0)) {
          stability = "Center";
        } else if (eigenValuesReal.every((value) => value < 0)) {
          stability = "Stable Node/Sink";
        } else if (eigenValuesReal.every((value) => value > 0)) {
          stability = "Unstable Node/Source";
        } else {
          stability = "Saddle Point";
        }

        stabiltiy.push(stability);
  }
}







function findFixedPoints() {
  let particleTestCount = 200; // Number of particles to test for finding fixed points
  let testParticles = [];
  let stablePoints = [];
  let unstablePoints = [];
  let tolerance = 0.1; // Tolerance for considering a velocity to be zero
  let timeOut = 1000; // Maximum iterations to wait before considering no fixed points
  let step2 = 0.01; // Step size for particle movement

  // Initialize test particles
  for (let i = 0; i < particleTestCount; i++) {
    testParticles.push({
      x: random(xMin, xMax),
      y: random(yMin, yMax),
      stableChecked: false,
      unstableChecked: false
    });
  }

  // Function to update particle positions
  function updateTestParticles(negateVelocity = false) {
    for (let particle of testParticles) {
      let xDelta = xdot(particle.x, particle.y);
      let yDelta = ydot(particle.x, particle.y);

      if (negateVelocity) {
        xDelta *= -1;
        yDelta *= -1;
      }

      particle.x += xDelta * step2;
      particle.y += yDelta * step2;
    }
  }

  // Function to check for fixed points
  function checkForFixedPoints(negateVelocity = false) {
    for (let particle of testParticles) {
      let xDelta = xdot(particle.x, particle.y);
      let yDelta = ydot(particle.x, particle.y);

      if (negateVelocity) {
        xDelta *= -1;
        yDelta *= -1;
      }

      let speed = sqrt(xDelta * xDelta + yDelta * yDelta);

      if (speed < tolerance) {
        let point = { x: particle.x, y: particle.y };
        if (negateVelocity) {
          unstablePoints.push(point);
          particle.unstableChecked = true;
        } else {
          stablePoints.push(point);
          particle.stableChecked = true;
        }
      }
    }
  }

  // Check for stable points
  for (let i = 0; i < timeOut; i++) {
    updateTestParticles();
    checkForFixedPoints();
  }

  // Reset test particles
  testParticles.forEach(particle => {
    particle.x = random(xMin, xMax);
    particle.y = random(yMin, yMax);
  });

  // Check for unstable points
  for (let i = 0; i < timeOut; i++) {
    updateTestParticles(true);
    checkForFixedPoints(true);
  }

  // Combine and filter the points
  let combinedPoints = stablePoints.concat(unstablePoints);
  combinedPoints = combinedPoints.filter((point, index, self) =>
    index === self.findIndex((t) => (
      t.x === point.x && t.y === point.y
    ))
  );

  // Classify each point as stable, unstable, or saddle
  fixedPoints = combinedPoints.map((point) => {
    let isStable = stablePoints.some(p => p.x === point.x && p.y === point.y);
    let isUnstable = unstablePoints.some(p => p.x === point.x && p.y === point.y);

    return {
      x: point.x,
      y: point.y,
      stability: isStable && isUnstable ? "Saddle Point" : isStable ? "Stable Node/Sink" : "Unstable Node/Source"
    };
  });
}
