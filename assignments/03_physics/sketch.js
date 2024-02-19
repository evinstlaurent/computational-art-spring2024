let people = [];
let numPeople = 100;
let gravitationalConstant = 0.0075;
let springConstant = -0.3;

function setup() {
    createCanvas(700, 500);
    colorMode(HSB);

    for (let i = 0; i < numPeople; i++) {
        let x = map(i, 0, numPeople, 50, width-50);
        let y = random(height/2);
        people.push(new Person(x, y, i+1));
      }
}

function draw() {
    background(0, 0, 100);

    for(person of people) {
        person.update();
        person.show();
    }

    noStroke();
    fill(240, 100, 100, 0);
    rect(0, height/2, width, height/2);
    fill(0, 100, 100, 0);
    rect(0, 0, width, height/2);
}

class Person {
    constructor(x, y, index) {
        this.index = index;
        this.hue = random(360);
        this.mass = this.index;
        this.radius = 20 + sqrt(this.mass);

        this.limbs = [];
        this.springs = [];

        this.limbs.push(new Limb(x, y, this.mass+1, this.hue+25, this.radius+5, this.limbs));

        this.limbs.push(new Limb(x, y-2, this.mass, this.hue, this.radius, this.limbs));

        this.limbs.push(new Limb(x+4, y-2, this.mass, this.hue+50, this.radius, this.limbs));
        this.limbs.push(new Limb(x-4, y-2, this.mass, this.hue+50, this.radius, this.limbs));

        this.limbs.push(new Limb(x, y-6, this.mass, this.hue, this.radius, this.limbs));
        this.limbs.push(new Limb(x+5, y-9, this.mass, this.hue+50, this.radius, this.limbs));
        this.limbs.push(new Limb(x-5, y-9, this.mass, this.hue+50, this.radius, this.limbs));

        this.springs.push(new Spring(this.limbs[0], this.limbs[1], 2+15, springConstant));
        this.springs.push(new Spring(this.limbs[1], this.limbs[2], 4+15, springConstant));
        this.springs.push(new Spring(this.limbs[1], this.limbs[3], 4+15, springConstant));
        this.springs.push(new Spring(this.limbs[1], this.limbs[4], 4+15, springConstant));
        this.springs.push(new Spring(this.limbs[4], this.limbs[5], 5+15, springConstant));
        this.springs.push(new Spring(this.limbs[4], this.limbs[6], 5+15, springConstant));

    }

    update() {
        for(let limb of this.limbs) {
            limb.update();
        }
        for(let spring of this.springs) {
            spring.update();
        }
    }

    show() {
        for(let limb of this.limbs) {
            limb.show();
        }
        for(let spring of this.springs) {
            spring.show();
        }
    }
}
