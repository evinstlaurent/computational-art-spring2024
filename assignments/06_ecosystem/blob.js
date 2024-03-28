class Blob {
    constructor(x, y, target, state) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.acc = createVector(0, 0);

        this.target = target;
        this.maxSpeed = random(4);
        this.maxForce = 0.05;

        this.goodRange = 150;

        this.badRange = 50;

        this.state = state;

        this.mass = this.state;

        this.alignmentMultiple = 1;
    }

    updateState() {
        let randNum = random(1000)
        if (randNum >= 13 && randNum < 14) {
            this.state = 1
        } else if (randNum >= 69 && randNum < 70) {
            this.state = 2
        } else if (randNum >= 20 && randNum < 21) {
            this.state = 3
        }
    }

    clickState() {
        let randNum = Math.round(random(5))
        this.state = ((this.state + randNum) % 3) + 1;
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    wrap() {
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }

    getCloseGoodBlobs() {
        let closeGoodBlobs = [];
        for (let blob of blobs) {
            if (blob !== this) {
                if (blob.state == this.state) {
                    if (dist(blob.pos.x, blob.pos.y, this.pos.x, this.pos.y) < this.goodRange) {
                        closeGoodBlobs.push(blob);
                    }
                }
            }
        }
        return closeGoodBlobs;
    }

    getCloseBadBlobs() {
        let closeBadBlobs = [];
        for (let blob of blobs) {
            if (blob !== this) {
                if (blob.state !== this.state) {
                    if (dist(blob.pos.x, blob.pos.y, this.pos.x, this.pos.y) < this.badRange) {
                        closeBadBlobs.push(blob);
                    }
                }
            }
        }
        return closeBadBlobs;
    }

    cohesion(closeGoodBlobs) {
        if (closeGoodBlobs.length > 0) {
            let sumPositions = createVector(0, 0);
            for (let blob of closeGoodBlobs) {
                sumPositions.add(blob.pos);
            }
            sumPositions.div(closeGoodBlobs.length);

            let desired = p5.Vector.sub(sumPositions, this.pos);
            desired.setMag(this.maxSpeed);
            let steeringForce = p5.Vector.sub(desired, this.blob);
            steeringForce.limit(this.maxForce);
            return steeringForce;
        }

        return createVector(0,0);
    }

    separation(closeBadBlobs) {
        let sumOfAnglesToBlobs = createVector(0, 0);
        for (let blob of closeBadBlobs) {
            let dirToBlobs = p5.Vector.sub(blob.pos, this.pos);
            sumOfAnglesToBlobs.add(dirToBlobs);
        }
        if (closeBadBlobs.length !== 0) {
            sumOfAnglesToBlobs.div(closeBadBlobs.length);
        }
        sumOfAnglesToBlobs.setMag(this.maxSpeed);
        sumOfAnglesToBlobs.mult(-1);
        
        let steeringForce = p5.Vector.sub(sumOfAnglesToBlobs, this.blob);
        steeringForce.limit(this.maxForce);

        return steeringForce;
    }

    alignment(closeGoodBlobs) {
        let sumOfVelocities = createVector(0, 0);
        for (let blob of closeGoodBlobs) {
            sumOfVelocities.add(blob.vel);
        }
        if (closeGoodBlobs.length > 0) {
            sumOfVelocities.div(closeGoodBlobs.length);
        }
        sumOfVelocities.setMag(this.maxSpeed);
        
        let steeringForce = p5.Vector.sub(sumOfVelocities, this.vel);
        steeringForce.limit(this.maxForce);

        return steeringForce;
    }

    update() {
        if (mouseIsPressed) {
            this.clickState();
        }


        this.updateState();

        let closeGoodBlobs = this.getCloseGoodBlobs();
        let cohesionForce = this.cohesion(closeGoodBlobs);
        cohesionForce.mult(1);
        this.addForce(cohesionForce);

        let closeBadBlobs = this.getCloseBadBlobs();
        let separationForce = this.separation(closeBadBlobs);
        separationForce.mult(1);
        this.addForce(separationForce);

        let alignmentForce = this.alignment(closeGoodBlobs);
        alignmentForce.mult(0.2);
        this.addForce(alignmentForce);

        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0,0);

        this.wrap();
    }

    show() {
        push();
        
        translate(this.pos.x, this.pos.y);

        let angle = this.vel.heading();
        rotate(angle);

        fill(this.state*100, 100, 100);
        rect(0, 0, 20, 20);

        pop();
    }

}