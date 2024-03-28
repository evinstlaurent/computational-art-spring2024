let blobs = [];
let numBlobs = 150;
let target;

function setup() {
    createCanvas(1200, 600);
    colorMode(HSB);
    noStroke();

    background(100, 0, 0);

    target = createVector(width/2, height/2);

    for (let i = 0; i < numBlobs; i++) {
        blobs.push(new Blob(random(width), random(height), target, (i % 3) + 1))
    }
}

function keyTyped() {
    // keyCodes are for both Windows and Mac! I wanted to be inclusive :)
    if (keyCode === 32 || keyCode === 49) {
        background(0, 0, 0);
    }
    if (keyCode === 88 || keyCode === 7) {
        for (let blob of blobs) {
            blob.maxSpeed += 30;
            blob.alignmentMultiple += 5;
        }
    }
    if (keyCode === 48 || keyCode === 29) {
        background(0, 0, 0);
        for (let blob of blobs) {
            blob.pos = createVector(random(width), random(height));
            blob.vel = createVector(random(-1, 1), random(-1, 1));
            blob.acc = createVector(0, 0);
            blob.maxSpeed = random(4);
            blob.alignmentMultiple = 1;
        }
    }
}

function draw() {
    for(let blob of blobs) {
        blob.update();
        blob.show();
    }
}
