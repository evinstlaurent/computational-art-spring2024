class Particle {
    constructor(x, y, hue, theta) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-5, 5), random(-5, 5));
        this.acc = createVector(0, 0);

        this.hue = (hue + random(60)) % 360;

        this.mass = random(2, 7);

        this.radius = this.mass;

        this.lifetime = random(50, 400);

        this.theta = theta;

        this.gravity = createVector(random(-3, 3) * this.theta, random(-3, 3) * this.theta)
    }


    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    update() {
        this.lifetime--;
        if (this.lifetime < 0) {
            this.destroy = true;
        }

        this.radius -= 0.1;
        if (this.radius <= 0) {
            this.destroy = true;
        }

        // FORCES
        this.addForce(this.gravity);

        // MOVEMENT
        this.vel.add(this.acc); // Apply acceleration (and thus the forces) to vel
        this.vel.limit(5); // This limits the magnitude of the velocity vector
        this.pos.add(this.vel); // Apply velocity to position

        // Reset the acceleration back to (0,0). This is important because
        // forces need to be continually applied in order to affect velocity.
        // In other words, if we didn't do this, forces would accumulate over
        // multiple calls to update(), which isn't what we want.
        this.acc.mult(0);
    }

    show() {
        push();

        noStroke();
        translate(this.pos.x, this.pos.y);
        fill(this.hue, 100, 100);
        circle(0, 0, this.radius);
        pop();
    }
}