let count = 0;

function setup() {
    createCanvas(600,400);
    colorMode(HSB);

    // noFill();
    // drawCircle(width/2, height/2, 400);
}

function branch(l) {
    angle = map(mouseY, 0, 400, 0, 360);
    line(0, 0, 0, -l);

    translate(0, -l);

    l = l * 0.7;

    if (l > 5) {
        push();
        rotate(radians(-angle));
        branch(l);
        pop();

        push();
        rotate(radians(angle));
        branch(l);
        pop();
    } else {
        // circle(0, 0, 5);
    }

}

function drawCircle(x, y, w) {
    stroke(map(count, 0, 100000, 0, 360), 100, 100);
    ellipse(x, y, w);

    count++;

    if (w > 5) {
        drawCircle(x, y, w/2);
        drawCircle(x-30, y, w/2);
        drawCircle(x+30, y, w/2);
        drawCircle(x, y+30, w/2);
        drawCircle(x, y-30, w/2);
    }
}

function draw() {
    background(0, 0, 100);

    push();
    translate(width/2, height);
    branch(125);
    pop();
}