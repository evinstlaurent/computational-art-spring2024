class ParticleSystem {
    constructor(x, y, theta) {
        this.pos = createVector(x, y);
        this.particles = [];
        this.radius = random(10, 25);

        this.theta = theta;
        this.hue = map(theta, 0, 2 * PI, 0, 360)
    }

    update() {
        this.hue = ((this.hue + this.theta) % 360);
        this.particles.push(new Particle(this.pos.x, this.pos.y, this.hue, this.theta));

        for (let particle of this.particles) {
            particle.update();
            particle.show();
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (this.particles[i].destroy) {
                this.particles.splice(i, 1);
            }
        }
    }
}