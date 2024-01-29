let dots = [];
let numDots = 1000;
let gravity = 0.098;

function setup() {
  createCanvas(800,600);
  colorMode(HSB);
  noStroke();

  for (let i = 0; i < numDots; i++) {
    let x = width / numDots * i;
    let diameter = 10;
    dots[i] = new Dot(x, random(600), diameter, i);
  }
}

function draw() {
  background(0, 0, 100, 0.05);

  for(let i = 0; i < dots.length; i++) {
    dots[i].update();
  }
}

class Dot {
  constructor(x, y, diameter, id) {
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.diameter = diameter;
    this.id = id;
    this.hue = this.id / numDots * 360;
  }

  update() {
    //let vectorToMouse = createVector(mouseX - this.position.x, mouseY - this.position.y);
    //vectorToMouse.normalize();

    //this.velocity = vectorToMouse;
    //this.position.add(this.velocity);

    this.velocity.y += gravity;

    this.position.add(this.velocity);

    if(this.position.y > height) {
      this.velocity.y *= -1;
    }

    fill(this.hue, 50, 100);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  }
}
