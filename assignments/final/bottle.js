class Bottle {
    constructor(x, y, vel) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, vel);
    }

    update() {
        this.pos.add(this.vel);
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(frameCount*this.vel.y*0.01);
        imageMode(CENTER);
        image(bottleImg, 0, 0);
        pop();
    }

    collision() {
        if (this.pos.x + 35 > crab.pos.x - 50 && this.pos.x - 35 < crab.pos.x + 35 && this.pos.y + 20 > crab.pos.y - 32.5 && this.pos.y - 20 < crab.pos.y + 32.5) {
            return true;
        } else {
            return false;
        }
    }
}