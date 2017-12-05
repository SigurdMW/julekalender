export function makeNightSky() {
	// https://codepen.io/jesswar/pen/JoQPxV
	// https://codepen.io/jackrugile/pen/Gving?page=1&
	var c = document.getElementById('sky');
	var ctx = c.getContext('2d');
	var xMax = c.width = window.screen.availWidth;
	var yMax = c.height = window.screen.availHeight;

	var hmTimes = Math.round(xMax + yMax);

	for(var i=0; i<=hmTimes; i++) {
	  var randomX = Math.floor((Math.random()*xMax)+1);
	  var randomY = Math.floor((Math.random()*yMax)+1);
	  var randomSize = Math.floor((Math.random()*2)+1);
	  var randomOpacityOne = Math.floor((Math.random()*9)+1);
	  var randomOpacityTwo = Math.floor((Math.random()*9)+1);
	  var randomHue = Math.floor((Math.random()*360)+1);

		if(randomSize>1) {
			ctx.shadowBlur = Math.floor((Math.random()*15)+5);
			ctx.shadowColor = "white";
		}

    ctx.fillStyle = "hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")";
	  ctx.fillRect(randomX, randomY, randomSize, randomSize);
	}
	
	// Create shooting star suddenly
	// setInterval(function(){
		
	// 	const randTime = (Math.random() * 10) * 2000;
	// 	setTimeout(function(){
	// 		console.log(randTime);
	// 		createShootingStar(ctx, xMax, yMax);
	// 	}, randTime);

	// }, 2000);

	createShootingStar();
}

// function createShootingStar(ctx, xMax, yMax){
// 	var randomX = Math.floor((Math.random()*xMax)+1);
// 	var randomY = Math.floor((Math.random()*yMax)+1);
// 	var randomSize = 10;
// 	var randomOpacityOne = Math.floor((Math.random()*9)+1);
// 	var randomOpacityTwo = Math.floor((Math.random()*9)+1);
// 	var randomHue = Math.floor((Math.random()*360)+1);

// 	ctx.fillStyle = "hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")";
// 	ctx.fillRect(randomX, randomY, randomSize, randomSize);
	
// 	ctx.beginPath();

// 	for(let i = 0;i < 10; i++){
// 		ctx.moveTo(3*i, 5*i);
// 	}
// }

function createShootingStar(){
	const canvas = document.createElement("canvas");
	canvas.height = window.screen.availHeight;
	canvas.width = window.screen.availWidth;
	document.body.appendChild(canvas);

	const context = canvas.getContext("2d");

	var requestAnimationFrame =  
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	function(callback) {
	  return setTimeout(callback, 1);
	};

	

	var square = {
		'x': 50,
		'y': 50,
		'width': 30,
		'height': 10
	};

	var grd = context.createLinearGradient(square.x, square.y, square.x + square.width, square.y);
	grd.addColorStop(0, "white");
	grd.addColorStop(1, "transparent");
	
	var render = function() {
		// Clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
	
		// Draw the square
		context.beginPath();
		context.rect(square.x, square.y, square.width, square.height);
		context.fillStyle = grd;
		context.fill();
	
		// Redraw
		requestAnimationFrame(render);
	};
	
	// Start the redrawing process
	render();

	var animate = function(prop, val, duration) {
		// The calculations required for the step function
		var start = new Date().getTime();
		var end = start + duration;
		var current = square[prop];
		var distance = val - current;
	  
		var step = function() {
		  // Get our current progres
		  var timestamp = new Date().getTime();
		  var progress = Math.min((duration - (end - timestamp)) / duration, 1);
	  
		  // Update the square's property
		  //square[prop] = current + (distance * progress);
		  context.translate(current + (distance * progress), square.y);
	  
		  // If the animation hasn't finished, repeat the step.
		  if (progress < 1) requestAnimationFrame(step);
		};
	  
		// Start the animation
		return step();
	  };
	  
	  animate('x', 0, 10000);
}