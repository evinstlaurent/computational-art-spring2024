let systems = [];
let randNum;
let radius;
function setup() {
    createCanvas(850, 850);
    colorMode(HSB);

    for (let theta = 0; theta <= 2 * PI; theta += PI / 12) {
        systems.push(new ParticleSystem(cos(theta) * 100, sin(theta) * 100, theta));
    }

    background(0, 0, 0);

}

function draw() {
    randNum = Math.floor(random(0, 500));
    if (randNum == 13) {
        background(0, 0, 0);
    }

    push();
    translate(width / 2, height / 2);
    for (let system of systems) {
        push();
        rotate(system.theta * sqrt(PI));
        system.update();
        pop();
    }

    radius = 150;
    fill(0, 0, 0);
    circle(0, 0, radius);

    // The block of commented out code adds alternating black and white circles in the center with decreasing radii.
    // I thought it looked cool but chose to stick with the single black circle but definitely look at this too they are fun looking!

    // for (let i = radius; i >= 0; i -= 15) {
    //     if(i % 2 === 0) {
    //         fill(0, 0, 0);
    //         circle(0, 0, i);
    //     } else {
    //         fill(0, 0, 100);
    //         circle(0, 0, i);
    //     }
    // }
    
    pop();

}