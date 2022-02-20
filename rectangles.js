canvas2 = document.querySelector("#rectangles")




var ca = canvas2.getContext("2d");

var canX = window.innerWidth;
var canY = window.innerHeight;
//------------------------
canvas2.width = canX;
canvas2.height = canY;


var rectArray = [];


function randomFloatFromInterval(min, max) {
  let rand = min + (max - min) * Math.random();
  return rand;
}


let colorArray2 = ["rgba(119, 119, 119, 0.7)", "rgba(119, 119, 119, 0.7)", "rgba(21, 101, 192, 0.7)"];

function Rectangle(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.dy = 0.1;
  this.w = w;
  this.h = h;
  this.rotation = 0;
  this.rotationDelta = ((Math.random() - 0.5) * ((0.007) * (1 - (w * 0.0002))));
  this.lineWidth = 1;
  this.transparency = 1;
  this.transparencyDelta = 0.0005;
  this.destroyDistance = randomFloatFromInterval(0.5, 0.8);
  this.distanceMoved = 0;
  this.randomColor = colorArray2[(Math.floor(Math.random() * colorArray2.length))];
  this.draw = () => {
    ca.strokeStyle = this.randomColor;
    ca.lineWidth = this.lineWidth;


    ca.save();
    ca.translate(this.x + this.w / 2, this.y + this.h / 2)
    // ca.translate(this.x + this.w / 2, this.y + this.h / 2)
    ca.rotate(this.rotation);
    // ca.translate(-1 * this.x - this.w / 2, -1 * this.y - this.h / 2)
    ca.beginPath();
    ca.globalAlpha = this.transparency;
    ca.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ca.restore();
  }
  this.update = () => {
    if (this.distanceMoved > canY * this.destroyDistance) {
      this.transparency -= this.transparencyDelta;
      if (this.transparency <= 0) {
        this.transparency = 0;
      }
    }
    // ca.translate(this.x + this.w / 2, this.y + this.h / 2)
    // ca.rotate(this.rotation);
    // ca.rotate(-this.rotation);
    // ca.translate(-1 * this.x - this.w / 2, -1 * this.y - this.h / 2)
    this.y -= this.dy;
    this.distanceMoved += this.dy;
    this.rotation += this.rotationDelta;
  }
}

const setRandomInterval = (intervalFunction, minDelay, maxDelay) => {
  let timeout;

  const runInterval = () => {
    const timeoutFunction = () => {
      intervalFunction();
      runInterval();
    };

    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    timeout = setTimeout(timeoutFunction, delay);
  };

  runInterval();

  return {
    clear() { clearTimeout(timeout) },
  };
};
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let left = true;
function createRect() {
  if (left) {
    left = false;
  } else {
    left = true;
  }
  let randX;
  if (left) {
    randX = canX / 3 * Math.random();
  } else {
    randX = canX - canX / 3 * Math.random();
  }

  let edgeSize = randomIntFromInterval(80, 120);



  rectArray.push(new Rectangle(randX, canY + 20, edgeSize, edgeSize));
}


function gotToBottom() {
  createRect();
  setRandomInterval(createRect, 1000, 12000);
}

function isContentScrolledToBottom(element) {
  const rest = element.scrollHeight - element.scrollTop;
  return Math.abs(element.clientHeight - rest) < 1;
}

let bot = false;

function atEnd() {
  var c = [document.scrollingElement.scrollHeight, document.body.scrollHeight, document.body.offsetHeight].sort(function(a, b) { return b - a }) // select longest candidate for scrollable length
  return (window.innerHeight + window.scrollY + 200 >= c[0]) // compare with scroll position + some give
}
function scrolling() {
  if (atEnd() && !bot) {
    bot = true;
    gotToBottom();
  }
}
window.addEventListener('scroll', scrolling, { passive: true });


function animate2() {
  requestAnimationFrame(animate2);
  ca.clearRect(0, 0, innerWidth, innerHeight);
  ca.beginPath();
  ca.fill();
  for (let i = 0; i < rectArray.length; i++) {
    rectArray[i].draw();
    rectArray[i].update();
  }

}
animate2();
