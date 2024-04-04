let count = 0;
let offsetSlider;
let colorSlider;
let angleSlider;
let rotateSlider;
let branchSlider;
let offsetText;
let colorText;
let angleText;
let rotateText;

function setup() {
    createCanvas(800, 600);
    colorMode(HSB);
    textAlign(LEFT, TOP);

    angleSlider = createSlider(20, 180, 0);
    angleSlider.position(10,10);
    angleSlider.size(150);

    offsetSlider = createSlider(0, 80, 0);
    offsetSlider.position(10,30);
    offsetSlider.size(140);

    branchSlider = createSlider(1, 8, 8, 1);
    branchSlider.position(10,50);
    branchSlider.size(130);

    colorSlider = createSlider(0, 360, 0);
    colorSlider.position(10,70);
    colorSlider.size(120);
}

function draw() {
    background(0, 0, 0);

    fill(0, 0, 100);
    text("Angle", 165, 15);
    text("Offset", 155, 35);
    text("Branch", 145, 55);
    text("Colors", 135, 75);

    push();
    translate(width/2, height/2);
    drawCircle(0, 0, 90)

    pop();

}

function branch(l) {
    angle = angleSlider.value();
    stroke((map(l, 0, 90, 0, 360) + colorSlider.value()) % 360, 100, 100);
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
    }
}

function drawCircle(x, y, b) {
    //count++;
    push();
    translate(x, y)
    for (let theta = 0; theta < 2*PI; theta += PI/(branchSlider.value())) {
        push();
        rotate(theta);
        branch(b);
        pop();
    }
    pop();

    if (b > 20) {
        drawCircle(x-offsetSlider.value(), y, b/2);
        drawCircle(x+offsetSlider.value(), y, b/2);
        drawCircle(x, y+offsetSlider.value(), b/2);
        drawCircle(x, y-offsetSlider.value(), b/2);
    }
}