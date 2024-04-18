class Cell {
    constructor(x, y, xIndex, yIndex) {
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.pos = createVector(x, y);
        this.hue = 0;
        this.saturation = 95;
        this.brightness = 75;

    }

    show() {
        noStroke();
        if (this.xIndex % 2 == 0) {
            if (this.yIndex % 2 == 1) {
                this.hue = 120;
                this.saturation = 75;
                this.brightness = 25;
            }
        } else if (this.xIndex % 2 == 1) {
            if (this.yIndex % 2 == 0) {
                this.hue = 120;
                this.saturation = 75;
                this.brightness = 25;
            }
        }
        fill(this.hue, this.saturation, this.brightness);
        rect(this.pos.x, this.pos.y, cellWidth, cellHeight);
    }
}