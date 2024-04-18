class Star {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.velocity = createVector(random(-2, 2), random(-2, 2));
        this.currentCell = this.getCell();
    }

    getCell() {
        let cellIndex = createVector(floor(map(this.pos.x, 0, width, 0, 8)), floor(map(this.pos.y, 0, height, 0, 8)));
        return cellIndex;
    }

    update() {
        let fetchCell = this.getCell();
        if (played) {
            this.pos.add(this.velocity);
            if (this.pos.x > width || this.pos.x < 0) {
                this.velocity.x *= -1;
            }   
            if (this.pos.y > height || this.pos.y < 0) {
                this.velocity.y *= -1;
            }

            if (floor(map(this.pos.y, 0, width, 0, 8)) % 2 == 0) {
                note = floor(map(this.pos.x, 0, width, 0, 8)); 
            } else {
                note = floor(map(this.pos.x, 0, width, 8, 0)); 
            }

            if (fetchCell.x !== this.currectCell.x || fetchCell.y !== this.currectCell.y) {
                synth.play(midiToFreq(60+scales[scale][note]), 1, 0, 0.1);
            }
        }
        this.currectCell = fetchCell;
    }

    show() {
        fill(51, 100, 100);
        circle(this.pos.x, this.pos.y, 20);
    }
}