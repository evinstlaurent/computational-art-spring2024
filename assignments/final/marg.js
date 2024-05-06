class Margarita {
    constructor(x, y, vel) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, vel);
        this.rotateCoef = random(-1, 1);
    }

    update() {
        this.pos.add(this.vel);
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(frameCount*this.vel.y*0.01*this.rotateCoef);
        imageMode(CENTER);
        image(margImg, 0, 0);
        pop();
    }

    collision() {
        if (this.pos.x + 22.5 > crab.pos.x - 50 && this.pos.x - 22.5 < crab.pos.x + 35 && this.pos.y + 30 > crab.pos.y - 32.5 && this.pos.y - 30 < crab.pos.y + 32.5) {
            return true;
        } else {
            return false;
        }
    }
}