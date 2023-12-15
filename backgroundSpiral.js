let xMin = -10;
let xMax = 10;
let yMin = -10;
let yMax = 10;
let particles = [];
let particleSize = 2;
let numParticles = 1000;
let step = 0.01; // Step size for particle movement
const maxParticleSpeed = 1; // Define your maximum particle speed here
let fixedPoints = []; // Array to store the fixed points

let particleColors = []; // Array to store colors for particles
let colorChangeTimings = []; // Array to store color transition timings for particles
let colorChangeSpeeds = []; // Array to store color transition speeds for particles


function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeParticles();
  findFixedPoints();
  console.log(fixedPoints)
}


function draw() {
  background(0, 0, 0, 5); // Semi-transparent black background
  moveParticles();
  wrapParticles();
  drawParticles();
  //drawFixedPoints();
  resetParticles();
}

function resetParticles() {
  const offScreenTolerance = 3; // Tolerance for going off-screen
  const epsilon = 0.01; // Epsilon distance away from the fixed point
  const halfProbability = 0.5; // Probability threshold for half of the cases

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];

    // Check if the particle is too far off-screen
    if (
      particle.x > xMax + offScreenTolerance ||
      particle.x < xMin - offScreenTolerance ||
      particle.y > yMax + offScreenTolerance ||
      particle.y < yMin - offScreenTolerance
    ) {
      // Half the time, reset it to a random point on the boundary of the screen
      if (random() > halfProbability) {
        // Choose a random side and set the particle's position on that side
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
      } else {
        // If there are unstable fixed points, reset it near a random unstable fixed point
        let unstablePoints = fixedPoints.filter(
          point =>
            point.stability === "Unstable Node/Source" ||
            point.stability === "Saddle Point"
        );

        if (unstablePoints.length > 0) {
          let randomUnstablePoint =
            unstablePoints[Math.floor(Math.random() * unstablePoints.length)];
          let angle = atan2(
            particle.y - randomUnstablePoint.y,
            particle.x - randomUnstablePoint.x
          );

          particle.x =
            randomUnstablePoint.x + cos(angle) * (epsilon + random());
          particle.y =
            randomUnstablePoint.y + sin(angle) * (epsilon + random());
        } else {
          // If there are no unstable fixed points, reset it to a random point on the boundary
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
      }
    } else {
      // Check proximity to stable fixed points
      let closestStablePoint = null;
      let minDistanceThreshold = 0.01; // Define your minimum distance threshold here

      fixedPoints.forEach(point => {
        let distance = dist(particle.x, particle.y, point.x, point.y);

        if (
          distance < minDistanceThreshold &&
          point.stability !== "Unstable Node/Source" &&
          point.stability !== "Saddle Point"
        ) {
          if (random() > halfProbability) {
            // Half the time, reset it to a random point on the boundary
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
          } else {
            // If there are unstable fixed points, reset it near a random unstable fixed point
            let unstablePoints = fixedPoints.filter(
              point =>
                point.stability === "Unstable Node/Source" ||
                point.stability === "Saddle Point"
            );

            if (unstablePoints.length > 0) {
              let randomUnstablePoint =
                unstablePoints[Math.floor(Math.random() * unstablePoints.length)];
              let angle = atan2(
                particle.y - randomUnstablePoint.y,
                particle.x - randomUnstablePoint.x
              );

              particle.x =
                randomUnstablePoint.x + cos(angle) * (epsilon + random());
              particle.y =
                randomUnstablePoint.y + sin(angle) * (epsilon + random());
            } else {
              // If there are no unstable fixed points, reset it to a random point on the boundary
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
          }
        }
      });
    }
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
  return (-y+5);
}

function ydot(x, y) {
  return -(-y-x);
}
function xdotString() {
  return '-y+5';
}
function ydotString() {
  return '-(-y-x)';
}

function findFixedPoints() {
  let solutions = nerdamer.solveEquations([xdotString()+"=0", ydotString()+"=0"]);
  console.log("Solutions",solutions)
  for (let x = xMin; x <= xMax; x += 1) {
    for (let y = yMin; y <= yMax; y += 1) {
      if (xdot(x, y) === 0 && ydot(x, y) === 0) {
        const jacobian = math.matrix([
          [
            math.derivative(xdotString(), 'x').evaluate({ x: x, y: y }),
            math.derivative(xdotString(), 'y').evaluate({ x: x, y: y })
          ],
          [
            math.derivative(ydotString(), 'x').evaluate({ x: x, y: y }),
            math.derivative(ydotString(), 'y').evaluate({ x: x, y: y })
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

        fixedPoints.push({ x: x, y: y, stability: stability });
      }
    }
  }
}
