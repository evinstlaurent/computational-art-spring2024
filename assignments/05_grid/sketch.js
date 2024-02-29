let numCols = 30;
let numRows = 30;
let cellWidth;
let cellHeight;

function setup() {
    createCanvas(600,600);
    colorMode(HSB);
    cellWidth = width/numCols;
    cellHeight = height/numRows;
}

function draw() {
    background(0, 0, 100);

    let xOffset = 0;
    let yOffset = 0;

    for (let xi = 0; xi < numCols; xi++) {
        xOffset += 0.1;
        for (let yi = 0; yi < numRows; yi++) {
            let cellPos = createVector(xi*cellWidth, yi*cellHeight);

            push();

            translate(cellPos.x, cellPos.y);
            fill(map(sin(xi), -1, 1, 0, 10), map(sin(yi), -1, 1, 70, 100), map(sin(yi+xi), -1, 1, 50, 100));
            rect(0, 0, cellWidth, cellHeight);
            stroke(0, 0, 100);
            circle(cellWidth/2, cellHeight/2, map(noise(xOffset, yOffset), 0, 1, 0, cellWidth));
            yOffset += 0.1;
            pop();
        }
    }
}
