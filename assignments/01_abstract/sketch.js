let houses = [];
let rain = [];
let cloud;
let gravity = 0.05;

function setup() {
    createCanvas(1000,500);
    colorMode(HSB);
    noStroke();

    for (let i = 100; i <= 700; i=i+300) {
        houses.push(new House(i, 200));
    }
    cloud = new Cloud()
}

function draw() {
    if (mouseIsPressed) {
        mousePressed();
    }
    background(209,30,93);

    fill(121,83,43)
    rect(0, 400, 1000, 100);
    houses.forEach(element => element.update());
    rain.forEach(element => element.update());
    cloud.update();

    for (let i = 0; i < rain.length; i++) {
        if (rain[i].position.y > height) {
            rain.splice(i,1);
        }
    }
}

function mousePressed() {
    for(let i = 0; i < 3; i++) {
        rain.push(new Raindrop(random(mouseX-60, mouseX+60), random(mouseY-20, mouseY+20)));
    }
    return false;
}

class House {
    constructor(x, y) {
        this.position = createVector(x,y);
        this.hue = random(360)
    }

    update() {
        fill(this.hue, 80, 80);
        rect(this.position.x, this.position.y+10, 200, 200);
        fill((this.hue+180)%360, 80, 80);
        triangle(this.position.x-20, this.position.y+10, this.position.x+220,this.position.y+10, this.position.x+100, this.position.y-70);
        fill((this.hue+180)%360, 80, 80);
        rect(this.position.x+60,this.position.y+90, 80, 120);
        fill(this.hue, 80, 80);
        circle(this.position.x+125, this.position.y+150, 15)
        
    }
}

class Cloud {
    update() {
        fill(0,0,30);
        circle(mouseX, mouseY, 60);
        circle(mouseX+45, mouseY, 60);
        circle(mouseX-45, mouseY, 60);
        circle(mouseX+20, mouseY-30, 60);
        circle(mouseX-20, mouseY-30, 60);
    }
}

class Raindrop {
    constructor(x,y) {
        this.hue = random(200,240);
        this.diameter = random(8,12);
        this.position = createVector(x, y);
        this.velocity = createVector(0,0);
    }
    update() {
        this.velocity.y += gravity;

        this.position.add(this.velocity);

        

        fill(this.hue, 80, 75);
        circle(this.position.x, this.position.y, this.diameter);
    }
}

