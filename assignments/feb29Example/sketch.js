let vehicles = [];
let numVehicles = 0;
let target;

let flowField = [];
let numCellsWidth = 10;
let numCellsHeight = 10;
let cellWidth;
let cellHeight;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);

  noStroke();
  fill(100, 10, 0);

  cellWidth = width / numCellsWidth;
  cellHeight = height / numCellsHeight;

  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    flowField[xIndex] = [];
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      flowField[xIndex][yIndex] = random(2 * PI);
    }
  }
  
  target = createVector(width/4, height/2);
  for(let i = 0; i < numVehicles; i++) {
    vehicles.push(new Vehicle(random(width), random(height), target));
  }
}

function draw() {
  background(0, 0, 100 , 1);

  target.x = mouseX; 
  target.y = mouseY;

  ellipse(target.x, target.y, 10, 10);

  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      let x = cellWidth * xIndex;
      let y = cellHeight * yIndex;

      push();
      translate(x + cellWidth/2, y + cellHeight/2);
      rotate(flowField[xIndex][yIndex]);

      stroke(0);
      line(-cellWidth/2, 0, cellWidth/2, 0);
      line(cellWidth/2, 0, cellWidth/4, -cellHeight/4);
      line(cellWidth/2, 0, cellWidth/4, cellHeight/4);
      
      pop();
    }
  }

  for (let vehicle of vehicles) {
    vehicle.update();
    vehicle.show();
  }
}

function positionToFlowFieldIndex(x, y) {
  let xIndex = floor(map(x, 0, width, 0, numCellsWidth));
  xIndex = constrain(xIndex, 0, numCellsWidth-1);
  let yIndex = floor(map(y, 0, height, 0, numCellsHeight));
  yIndex = constrain(yIndex, 0, numCellsHeight-1);
  return createVector(xIndex, yIndex);
}