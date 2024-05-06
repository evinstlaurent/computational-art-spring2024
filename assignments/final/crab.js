class Crab {
    constructor(x, y) {
        this.pos = createVector(x, y);
    }

    update() {
        this.pos.x = mouseX;
    }

    show() {
        push();
        imageMode(CENTER);
        translate(this.pos.x, this.pos.y);
        image(crabImg, 0, 0);
        pop();
    }

}