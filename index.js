var menuOpen = false;


function toggleMenu() {
  if(!menuOpen) {
  document.getElementById("sidebar").style.width = "100%";
  document.getElementById("sidebar").style.background = "rgba(0, 0, 0, 0.7)";

  menuOpen = true;
} else {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("sidebar").style.background = "rgba(0, 0, 0, 1)";
  menuOpen = false;
}
}

 // Look for .hamburger
  var hamburger = document.querySelector(".hamburger");
  // On click
  hamburger.addEventListener("click", function() {
    // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
    toggleMenu();
  });

function scrolltTop() {

  document.getElementById("top").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

function scrollAboutMe() {

  document.getElementById("aboutMe").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}
// function scrollAbilities() {
//
//   document.getElementById("top").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
// }
//
// function scrollProjects() {
//
//   document.getElementById("top").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
// }



var canvas = document.getElementById("circles");

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}


var mouse = {
  x: undefined,
  y: undefined
}
var rect = canvas.getBoundingClientRect();
var trueX = mouse.x - rect.left;
var trueY = mouse.y - rect.top;
//changeables-------------
canvas.style.left = "0";
canvas.style.top = "0";
canvas.style.padding = "0";
canvas.style.position = "absolute";
var canX = window.innerWidth;
var canY = window.innerHeight;
//------------------------
canvas.width = canX;
canvas.height = canY;

window.addEventListener("mousemove", function(event) {
   mouse.x = event.clientX;
   mouse.y = event.clientY + document.body.scrollTop;
  trueX = mouse.x - rect.left;
  trueY = mouse.y - rect.top;
})

var c = canvas.getContext("2d");

function randomNumber(min,max)
{
    return (Math.random()*(max-min+1)+min);
}

//create mouse object


var colorArray = [
  "#C84127",
  "#67C5C2",
  "#3D2117",
  "#FEFCE8",
  "#000000",
  "",
];





var maxRadius = 50;
//var minRadius = radius;


function Circle(x,y,radius,dx,dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.minRadius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
//template of circle being drawn
  this.draw = function() {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2);
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }


//template of circle movement
  this.update = function() {
if(this.x+this.radius>canX || this.x - this.radius < 0) {
  this.dx=-this.dx;
}

if(this.y+this.radius>canY || this.y - this.radius < 0) {
  this.dy=-this.dy;
}
this.x+=this.dx;
this.y+=this.dy;

//interactivity

//when mouse close
if (trueX - this.x < 100 && trueX - this.x > -100
  && trueY - this.y < 100 && trueY - this.y > -100
  ) {
    if (this.radius < maxRadius) {
      this.radius += 4;
    }
} else if (this.radius > this.minRadius) {
  this.radius -=0.4;
}

  }
}




var circleArray = [];

for (var i = 0; i < 200; i++) {
var x = Math.random()*canX;
var dx = randomNumber(-1,1);
var y = Math.random()*canY;
var dy = 0;
var radius = Math.random()*3+2;
circleArray.push(
  new Circle(x,y,radius,dx,dy))
}

function animate() {

  requestAnimationFrame(animate)
  c.clearRect(0,0,innerWidth,innerHeight);

  for (var i = 0; i <circleArray.length; i++) {
    circleArray[i].draw();
    circleArray[i].update();
  }

}
animate();
