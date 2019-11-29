// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;
let blackColor = "black";
let redColor = "red";
let smallSize = 1;
let mediumSize = 5;
let largeSize = 10;
let blackSelected = true;
let redSelected = false;
let smallSelected = false;
let mediumSelected = true;
let largeSelected = false;

const myPics = document.getElementById('myPics');
const context = myPics.getContext('2d');

// The x and y offset of the canvas from the edge of the page
const rect = myPics.getBoundingClientRect();

// Add the event listeners for mousedown, mousemove, and mouseup
myPics.addEventListener('mousedown', e => {
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  isDrawing = true;
});

myPics.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

document.getElementById('clearDrawing').onclick = function() {clearLine()};
document.getElementById('saveDrawing').onclick = function() {convertCanvasToImage(myPics)};

document.getElementById('blackSelector').onclick = function() {setSelectedColor(blackColor)};
document.getElementById('redSelector').onclick = function() {setSelectedColor(redColor)};

document.getElementById('smallSelector').onclick = function() {setSelectedSize(smallSize)};
document.getElementById('mediumSelector').onclick = function() {setSelectedSize(mediumSize)};
document.getElementById('largeSelector').onclick = function() {setSelectedSize(largeSize)};

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  if(blackSelected)
  {
    context.strokeStyle = blackColor;
  }
  else if(redSelected)
  {
    context.strokeStyle = redColor;
  }
  if(smallSelected)
  {
    context.lineWidth = smallSize;
  }
  else if (mediumSelected)
  {
    context.lineWidth = mediumSize;
  }
  else if (largeSelected)
  {
    context.lineWidth = largeSize;
  }
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function clearLine() {
  return context.clearRect(0, 0, rect.right, rect.bottom);
}

function setSelectedColor(color) {
  if(blackColor === color){
    blackSelected = true;
    redSelected = false;
    document.getElementById('blackSelector').style.backgroundColor = "white";
    document.getElementById('blackSelector').style.border = "3px solid black";
    document.getElementById('redSelector').style.backgroundColor = "red";
    document.getElementById('redSelector').style.border = "none";
  }
  else if(redColor === color){
    blackSelected = false;
    redSelected = true;
    document.getElementById('redSelector').style.backgroundColor = "white";
    document.getElementById('redSelector').style.border = "3px solid red";
    document.getElementById('blackSelector').style.backgroundColor = "black";
    document.getElementById('blackSelector').style.border = "none";
  }
}

function setSelectedSize(size) {
  if(size === smallSize)
  {
    smallSelected = true;
    mediumSelected = false;
    largeSelected = false;
    document.getElementById('smallSelector').style.backgroundColor = "lavender";
    document.getElementById('mediumSelector').style.backgroundColor = "lavenderblush";
    document.getElementById('largeSelector').style.backgroundColor = "lavenderblush";
  }
  else if (size === mediumSize)
  {
    smallSelected = false;
    mediumSelected = true;
    largeSelected = false;
    document.getElementById('smallSelector').style.backgroundColor = "lavenderblush";
    document.getElementById('mediumSelector').style.backgroundColor = "lavender";
    document.getElementById('largeSelector').style.backgroundColor = "lavenderblush";
  }
  else if (size === largeSize)
  {
    smallSelected = false;
    mediumSelected = false;
    largeSelected = true;
    document.getElementById('smallSelector').style.backgroundColor = "lavenderblush";
    document.getElementById('mediumSelector').style.backgroundColor = "lavenderblush";
    document.getElementById('largeSelector').style.backgroundColor = "lavender";
  }
}

function convertCanvasToImage(canvas)
{
  window.location = canvas.toDataURL("image/png");
}