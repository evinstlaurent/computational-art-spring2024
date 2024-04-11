let bellSample;
let loop;
let loopInterval = 1;
let synth;
let played = false;
let eighth = 0;
let note = 0;

function preload() {
    bellSample = loadSound("https://evinstlaurent.github.io/computational-art-spring2024/assignments/08_sound/samples/bell.mp3");
}

function setup() {
    createCanvas(600, 400);
    colorMode(HSB);
    background(0,0,100);
}

function draw() {

}

function soundLoop(timeFromNow) {
    bellSample.play(timeFromNow);

    if (eighth % 2 === 0) {
        synth.play(midiToFreq(60+note), 1, timeFromNow, 0.1);
    }

    eighth++;
    note++;
}

function mousePressed() {
    if (!played) {
        userStartAudio();

        synth = new p5.PolySynth();
    
        loop = new p5.SoundLoop(soundLoop, loopInterval/8);
    
        loop.start();

        played = true;
    } 
}
