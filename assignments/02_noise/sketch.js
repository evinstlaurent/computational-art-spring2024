let numCols = 25;
let numRows = 25;

function setup() {
    createCanvas(500,500);
    colorMode(HSB);
    noStroke();
}

function draw() {
    background(0, 0, 0);

    let offset = 0;

    for (let i = 0; i < numCols; i++) {
        let x1 = map(noise(offset), 0, 1, (i/numRows)*width, (i/numRows)*width+10);
        offset += 0.1;
        let x2 = map(noise(offset), 0, 1, (i/numRows)*width+10, (i/numRows)*width+20);
        offset += 0.1;
        for (let i = 0; i < numRows; i++) {
            let y1 = map(noise(offset), 0, 1, (i/numCols)*height, (i/numCols)*height+10);
            offset += 0.1;
            let y2 = map(noise(offset), 0, 1, (i/numCols)*height+10, (i/numCols)*height+20);
            offset += 0.1;

            let hue = map(i, 0, numCols, 190, 310);

            stroke(hue, 100, 100);
            line(x1, y1, x2, y2);
            stroke(hue, 100, 100);
            line(x1+10, y1-10, x2-10, y2+10);
        }
    }      
}