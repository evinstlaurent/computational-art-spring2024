let camImg;
let camImgWidth = 30;
let camImgHeight = 30;
let crabImg;
let coconutImg;
let bottleImg;
let treeImg;
let margImg;
let synth;
let played = false;
let gamePlay = false;
let gameOver = false;
let gameStart = false;
let timerText;
let timeCount;
let pointText;
let alltimePointText;
let pointCount;
let allPointCount;
let replayButton;
let gameOverText;
let gamePrompt;
let replayText;
let crab;
let bottles = [];
let coconuts = [];
let margaritas = [];
let pixelDimensionWidth;
let pixelDimensionHeight;

function preload() {
   crabImg = loadImage("./images/crab.png");
   coconutImg = loadImage("./images/coconut.png");
   bottleImg = loadImage("./images/bottle.png");
   margImg = loadImage("./images/marg.png");
   treeImg = loadImage("./images/palmTree.png");
   crabLogo = loadImage("./images/crab.png");
}

function setup() {
    createCanvas(1000, 600);
    colorMode(HSB);
    camImg = createCapture(VIDEO);
    camImg.size(camImgWidth, camImgHeight);
    camImg.hide();

    pixelDimensionHeight = 100 / camImgHeight;
    pixelDimensionWidth = width / camImgWidth;

    background(200, 40, 90);

    crab = new Crab(width/2, 495);

    crabImg.resize(100, 65);
    treeImg.resize(220, 420);
    bottleImg.resize(70, 40);
    coconutImg.resize(70, 40);
    margImg.resize(45, 60);
    crabLogo.resize(200, 130);

    pointCount = 0;
    allPointCount = 0;
    timeCount = 60;
}

function draw() {
    if (!gameStart) {
        push();
        textSize(75);
        textAlign(CENTER, CENTER);
        imageMode(CENTER);
        image(crabLogo, width/2, height/4+20);
        text("Crabby's Beach Bonanza", width/2, height/2-20);
        textSize(50);
        text("Press Space To Start!", width/2, height/2+55);
        pop();
    }
    if (gamePlay && gameStart) {
        colorMode(HSB);
        background(200, 40, 90);
        renderScene();

        itemGen = random();

        if (itemGen >= 0.1 && itemGen < 0.135) {
            bottles.push(new Bottle(map(itemGen, 0.1, 0.135, 0, width), 0, random(1, 4.25)));
        } else if (itemGen >= 0.2 && itemGen < 0.235) {
            coconuts.push(new Coconut(map(itemGen, 0.2, 0.235, 0, width), 0, random(1, 4.25)));
        } else if (itemGen >= 0.4 && itemGen < 0.4175) {
            margaritas.push(new Margarita(map(itemGen, 0.4, 0.4175, 0, width), 0, random(1.5, 5.25)));
        }

        crab.update();
        crab.show();

        for (let i = 0; i < bottles.length; i++) {
            bottles[i].update();
            bottles[i].show();

            if (bottles[i].collision()) {
                pointCount -= 10;
                bottles.splice(i, 1);
                synth.play(midiToFreq(55), 1, 0, 0.1);
            } else if (bottles[i].pos.y > 500) {
                bottles.splice(i, 1);
            }
        }

        for (let i = 0; i < coconuts.length; i++) {
            coconuts[i].update();
            coconuts[i].show();

            if (coconuts[i].collision()) {
                pointCount += 10;
                coconuts.splice(i, 1);
                synth.play(midiToFreq(70), 1, 0, 0.1);
            } else if (coconuts[i].pos.y > 500) {
                coconuts.splice(i, 1);
            }
        }

        for (let i = 0; i < margaritas.length; i++) {
            margaritas[i].update();
            margaritas[i].show();

            if (margaritas[i].collision()) {
                pointCount += 25;
                margaritas.splice(i, 1);
                synth.play(midiToFreq(85), 1, 0, 0.1);
            } else if (margaritas[i].pos.y > 500) {
                margaritas.splice(i, 1);
            }
        }

        image(treeImg, 10, 125)

        timer();

        textSize(30);
        fill(0, 0, 0);
        pointText = text("Points: "+pointCount, 830, 35);
        alltimePointText = text("All-Time Score: "+allPointCount, 718, 60);

        console.log(bottles.length);
    }

}


// Some of the code in this function is code from the webcam in-class example
function renderScene() {
    colorMode(RGB);
    camImg.loadPixels();
    for (let y = 0; y < camImg.height; y++) {
        for (let x = 0; x < camImg.width; x++) {
            let index = (x + y * camImg.width) * 4;
            let r = camImg.pixels[index];
            let g = camImg.pixels[index+1];
            let b = camImg.pixels[index+2];
            let a = camImg.pixels[index+3];

            let pixelColorRGBA = color(r, g, b, a);

            colorMode(HSB);
            let pixelColorHSB = color(map(hue(pixelColorRGBA), 0, 360, 35, 70), map(saturation(pixelColorRGBA), 0, 100, 60, 100), map(brightness(pixelColorRGBA), 0, 100, 40, 100));
            noStroke();
            fill(pixelColorHSB);
            push();
            translate(0, 500);
            let xPos = x*pixelDimensionWidth;
            let yPos = y*pixelDimensionHeight;
            rect(xPos, yPos, pixelDimensionWidth, pixelDimensionHeight);
            pop();
        }
    }
}

function timer() {
    if (frameCount % 60 == 0 && timeCount > 0) {
        timeCount -= 1;
        synth.play(midiToFreq(60), 1, 0, 0.1);
    }

    textSize(30);
    fill(0, 0, 0);
    timerText = text("Time: "+timeCount, 10, 35);

    if (timeCount == 0) {
        gamePlay = false;
        gameOver = true;
        endText();
    }
}

function keyPressed() {
    if (keyCode === 32 || keyCode === 49) {
        if (!played) {
            userStartAudio();
            synth = new p5.PolySynth();
            played = true;
        }
        if (!gamePlay) {
            gamePlay = true;
        } else {
            gamePlay = false;
            push();
            textAlign(CENTER, CENTER);
            text("Paused", width/2, height/2);
            pop();
        }
        if (!gameStart) {
            gameStart = true;
        }
    }
}

function mousePressed() {
    if (gameOver) {
        if (mouseX > width/2-90 && mouseX < width/2+90 && mouseY > height/2+25 && mouseY < height/2+75) {
            replay();
        }
    }

}

function endText() {
    push();
    textAlign(CENTER, CENTER);
    gameOvertext = text("Game Over!", width/2, height/2-30)
    gamePrompt = text("Your Score Was "+pointCount+"! Want to Play Again?", width/2, height/2);
    rectMode(CENTER);
    replayButton = rect(width/2, height/2+50, 180, 50);
    fill(0, 0, 100);
    replayText = text("Replay", width/2, height/2+50);

    pop();
}

function replay() {
    background(200, 40, 90);
    renderScene();

    crab = new Crab(width/2, 495);

    allPointCount += pointCount;
    pointCount = 0;
    timeCount = 60;

    bottles.splice(0, bottles.length);
    coconuts.splice(0, coconuts.length);
    margaritas.splice(0, margaritas.length);

    gameOver = false;
    gamePlay = true;
}

