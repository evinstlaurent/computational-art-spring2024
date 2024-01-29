let thing;

function setup() {
  createCanvas(1000,500);

  thing = new Thing(100, 100);

  colorMode(HSB);
}

function draw() {
  background(0, 0, 100);

  thing.update();
}

class Thing {
  constructor(x, y) {
    this.hue = 0;
    this.position = createVector(x, y);
    this.velocity = createVector(1,1);
  }

  update() {
    this.position.add(this.velocity);
    if (this.position.x > width || this.position.x < 0) {
      velocity.x *= -1;
    }

    if (this.position.y > height || this.position.y < 0) {
      velocity.y *= -1;
    }

    this.hue += 1;
    let saturation = mouseX / width * 100;

    fill(this.hue % 360, saturation, 100);

    circle(this.position.x, this.position.y, 100);

  }


}
