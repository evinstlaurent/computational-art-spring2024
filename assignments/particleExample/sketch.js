let systems = [];
let numSystems = 5;
let gravity;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);

  gravity = createVector(0, 0.1);

  for (let i = 0; i < numSystems; i++) {
    systems.push(new ParticleSystem(random(100, width-100), height));
  }
}

function draw() {
  background(0, 0, 15);

  // Draw some cool looking lines
  strokeWeight(1);
  numLines = 10;
  for (let i = 0; i < numLines; i++) {
    stroke(0, 0, 100, map(i, 0, numLines, .1, .7));
    let offset = i * i * 6;
    line(0, offset + height/2, width, offset + height/2);
  }

  for (let ps of systems) {
    ps.update();
  }

  // Add a border so it looks cool
  noFill();
  strokeWeight(10);
  stroke(0, 0, 100);
  rect(0, 0, width, height);
}