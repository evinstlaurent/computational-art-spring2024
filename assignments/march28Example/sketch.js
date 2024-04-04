let count = 0;
let numGenerations = 5;
let segments = [];

function setup() {
    createCanvas(600, 400);
    colorMode(HSB);
    rectMode(CENTER);

    noFill();
    background(0, 0, 100);
    //drawCircles(width/2, height/2, 400);

    stroke(0, 0, 100);

    let start = createVector(50, height/2);
    let end = createVector(width-50, height/2);
    segments.push(new KochLine(start, end));

    for (let i = 0; i < numGenerations; i++) {
        generate();
    }
}

function generate() {
    let next = [];
    for (let segment of segments) {
        segment.createNewKochLinePoints();
        next.push(new KochLine(segment.a, segment.b));
        next.push(new KochLine(segment.b, segment.c));
        next.push(new KochLine(segment.c, segment.d));
        next.push(new KochLine(segment.d, segment.e));
    }
    segments = next;
}

function draw() {
    background(0, 0, 0);

    for (let segment of segments) {
        segment.show();
    }



    // count = 0;
    // push();
    // translate(width/2, height/2);
    // scale(map(noise(frameCount * 0.008), 0, 1, 1, 5));
    // rotate(frameCount * 0.01);
    // drawCircles(0, 0, 400);
    // pop();


}

function drawCircles(x, y, diameter) {
    count++;

    if (count % 2 === 0) {
        ellipse(x, y, diameter);
    } else {
        rect(x, y, diameter, diameter);
    }

    if (diameter > 1) {
        drawCircles(x, y, diameter/map(sin(frameCount *0.01), -1, 1, 1.01, 2 ));
    } else {
        console.log(count)
    }
}
