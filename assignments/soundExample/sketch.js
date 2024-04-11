let soundSample;
let loop;
let synth;
let note = 60;
let sixteenth = 0;

function preload() {
    soundSample = loadSound("./samples/treeSound.mp3");
}

function setup() {
    createCanvas(600, 600);
    colorMode(HSB);

    synth = new p5.PolySynth();

    loop = new p5.SoundLoop(soundLoop, 1);

    loop.start();
}

function draw() {
    background(0,0,100);
    soundSample.play();

}

function mousePressed() {
    userStartAudio();
}

function soundLoop(timeFromNow) {
    if (sixteenth % 4 === 0) {
        soundSample(timeFromNow);
    }

    synth.play(midiToFreq(note), 0.8, timeFromNow, 0.1);
    note++;
    note = 60 + note % 4;

    sixteenth++;
}