class KochLine {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    show() {
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    createNewKochLinePoints() {
        this.a = this.start;
        this.e = this.end;

        let dirFromAtoE = p5.Vector.sub(this.e, this.a);
        let distanceFromAtoE = dirFromAtoE.mag();
        dirFromAtoE.normalize();
        dirFromAtoE.mult(distanceFromAtoE/3);

        this.b = p5.Vector.add(this.a, dirFromAtoE);
        this.d = p5.Vector.add(this.b, dirFromAtoE);

        dirFromAtoE.rotate(radians(-60));
        
        this.c = p5.Vector.add(this.b, dirFromAtoE);
    }
}