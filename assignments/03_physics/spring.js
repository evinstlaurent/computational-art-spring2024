class Spring {
    constructor(d1, d2, rest, constant) {
        this.dot1 = d1;
        this.dot2 = d2;
        this.restLength = rest;
        this.constant = constant;
    }

    update() {
        let vecBetweenDots = p5.Vector.sub(this.dot2.pos, this.dot1.pos);
        let distance = vecBetweenDots.mag();
        let stretch = distance - this.restLength;
        let springForce = stretch * this.constant;
        vecBetweenDots.normalize();
        vecBetweenDots.mult(springForce);
        this.dot2.addForce(vecBetweenDots);
        this.dot1.addForce(vecBetweenDots.mult(-1));
    }

    show() {
        stroke(0);
        line(this.dot1.pos.x, this.dot1.pos.y, this.dot2.pos.x, this.dot2.pos.y);
    }
}