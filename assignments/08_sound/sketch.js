// My project is not sonically pleasing in the slightest but I had fun messing around with it

let bellSample;
let loop;
let loopInterval = 1;
let synth;
let played = false;
let eighth = 0;
let note = 0;
let scale = "minor";
let numCols = 8;
let numRows = 8;
let cellWidth;
let cellHeight;
let cells = [];
let stars = [];
let numStars = 4;
let reverb;
let distortion;

function preload() {
    bellSample = loadSound("https://evinstlaurent.github.io/computational-art-spring2024/assignments/08_sound/samples/bell.mp3");
}

function setup() {
    createCanvas(700, 700);
    colorMode(HSB);
    background(0,90,75);
    
    cellWidth = width/numCols;
    cellHeight = height/numRows;

    for (let xi = 0; xi < numCols; xi++) {
        for (let yi = 0; yi < numRows; yi++) {
            let cellPos = createVector(xi*cellWidth, yi*cellHeight);
            cells.push(new Cell(cellPos.x, cellPos.y, xi, yi));
        }
    }

    for(let i = 0; i < numStars; i++) {
        stars.push(new Star(width/2, height/2));
    }
}

function draw() {
    background(0,90,75);
    for (cell of cells) {
        cell.show();
    }
    for (let star of stars) {
        star.update();
        star.show();
    }
}

function soundLoop(timeFromNow) {
    if (eighth % 2 === 0) {
        bellSample.play(timeFromNow);
    }
    if (eighth % 3 === 0) {
        bellSample.play(timeFromNow);
    }

    eighth++;
}

function mousePressed() {
    if (!played) {
        userStartAudio();

        synth = new p5.PolySynth();

        reverb = new p5.Reverb();

        distortion = new p5.Distortion();

        reverb.process(synth, 10);

        distortion.process(synth, 0.2, '4x');
    
        loop = new p5.SoundLoop(soundLoop, loopInterval/4);
    
        loop.start();

        played = true;
    }
}
