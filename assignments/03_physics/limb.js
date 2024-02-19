class Limb {
    constructor(x, y, mass, hue, radius, limbs) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.limbs = limbs;

        this.hue = hue

        this.mass = mass;

        this.radius = radius;
    }

    wrap() {
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    applyGravityToOtherLimbs() {
        for (let limb of this.limbs) {
            if (limb !== this) {
                if(limb.pos.y > height/2) {
                    let vectorFromMeToOtherLimb = p5.Vector.sub(limb.pos, this.pos);
                    let d = vectorFromMeToOtherLimb.mag();

                    // F = (G * m1 * m2) / d^2
                    let gForce = (gravitationalConstant * this.mass * limb.mass) / d * d;

                    vectorFromMeToOtherLimb.normalize();
                    vectorFromMeToOtherLimb.mult(gForce);
                    vectorFromMeToOtherLimb.mult(-1);
                    limb.addForce(vectorFromMeToOtherLimb);
                } else {
                    let vectorFromMeToOtherLimb = p5.Vector.sub(limb.pos, this.pos);
                    let d = vectorFromMeToOtherLimb.mag();

                    // F = (G * m1 * m2) / d^2
                    let gForce = (-gravitationalConstant * this.mass * limb.mass) / d * d;

                    vectorFromMeToOtherLimb.normalize();
                    vectorFromMeToOtherLimb.mult(gForce);
                    vectorFromMeToOtherLimb.mult(-1);
                    limb.addForce(vectorFromMeToOtherLimb);
                }
            }
        }
    }

    update() {
       // this.addForce(downwardGravity);

        this.applyGravityToOtherLimbs();

        this.vel.add(this.acc)
        this.vel.limit(5);
        this.pos.add(this.vel);

        this.wrap();

        this.acc.mult(0);
    }

    show() {
        push();

        noStroke();

        translate(this.pos.x, this.pos.y);
        fill(this.hue, 100, 100);
        ellipse(0, 0, this.radius*2);

        pop();
    }
}