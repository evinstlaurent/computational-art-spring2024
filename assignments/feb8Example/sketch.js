let xoff = 0;
let x;
let y;
let baseRadiusSlider;

function setup() {
    createCanvas(600,400);
    colorMode(HSB);
    noStroke();

    x = width/2;
    y = height/2;

    baseRadiusSlider = createSlider(0, 1, 0.1, 0.01);
    baseRadiusSlider.position(50,50);
    baseRadiusSlider.size(width-100);
}

function draw() {
    background(0,0,100, 0.5);

    //x += 1;

    push();
    translate(x,height/2);

    beginShape();
    strokeWeight(3);
    stroke(0);
    let baseRadius = 0;
    for(let theta = 0; theta < 128 * PI; theta += 0.1){
        let radius = baseRadius + map(noise(xoff), 0, 1, -15, 15);
        let x = radius * cos(theta);
        let y = radius * sin(theta);

        vertex(x,y);

        xoff += 0.2;
        baseRadius += baseRadiusSlider.value();
    }
    endShape();

    pop();

}
