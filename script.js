//Initial 
let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");
let downloadButton = document.getElementById("download-art");

let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
container.appendChild(canvas);

let draw = false;
let erase = false;

//Grid
gridButton.addEventListener("click", () => {
  const canvasWidth = container.offsetWidth;
  const maxDimension = Math.max(gridWidth.value, gridHeight.value);
  cellSize = Math.floor(canvasWidth / maxDimension);

  canvas.width = cellSize * gridWidth.value;
  canvas.height = cellSize * gridHeight.value;

  drawGrid();

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", drawOnCanvas);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);
  canvas.addEventListener("touchstart", startDrawing);
  canvas.addEventListener("touchmove", drawOnCanvas);
  canvas.addEventListener("touchend", stopDrawing);
});

//Draw grid
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  for (let x = 0; x < canvas.width; x += cellSize) {
    for (let y = 0; y < canvas.height; y += cellSize) {
      ctx.strokeStyle = "#ddd";
      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  }
}

function startDrawing(event) {
  draw = true;
  drawOnCanvas(event);
}

function stopDrawing() {
  draw = false;
  ctx.beginPath(); 
}

//Draw canvas
function drawOnCanvas(event) {
  if (!draw) return;

  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX || event.touches[0].clientX) - rect.left;
  const y = (event.clientY || event.touches[0].clientY) - rect.top;

  const cellX = Math.floor(x / cellSize) * cellSize;
  const cellY = Math.floor(y / cellSize) * cellSize;

  ctx.fillStyle = erase ? "white" : colorButton.value;
  ctx.fillRect(cellX, cellY, cellSize, cellSize);

  if (erase) {
    ctx.strokeStyle = "#ddd";
    ctx.strokeRect(cellX, cellY, cellSize, cellSize); //Redraw grid 
  }
}

//Clear
clearGridButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//Erase
eraseBtn.addEventListener("click", () => {
  erase = true;
});

//Paint 
paintBtn.addEventListener("click", () => {
  erase = false;
});

//Height Width
gridWidth.addEventListener("input", () => {
  widthValue.innerHTML = gridWidth.value.padStart(2, "0");
});

gridHeight.addEventListener("input", () => {
  heightValue.innerHTML = gridHeight.value.padStart(2, "0");
});

//Download
downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "pixel-art.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

window.onload = () => {
  gridWidth.value = 0;
  gridHeight.value = 0;
  widthValue.textContent = "00";
  heightValue.textContent = "00";
};
