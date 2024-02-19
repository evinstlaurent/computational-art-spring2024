let h = 0;
let numCircles = 100;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
  
  noStroke();
}


function draw() {
  background(0, 0, 0);

  let xoff = 0;

  for (let i = 0; i < numCircles; i++) {
    let x = map(i, 0, numCircles, 0, width); 
    let hue = map(i, 0, numCircles, 100, 200);

    let tallness = map(noise(xoff), 0, 1, 100, height/2);

    fill(hue, 80, 100);
    ellipse(x, height/2, width/numCircles, tallness);

    xoff += 0.05;
  }
}