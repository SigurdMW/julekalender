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

	//createShootingStar();
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
	  return setTimeout(callback, 1000 / 60);
	};


	var square = {
		'x': 50,
		'y': 50,
		'width': 100,
		'height': 1
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

	  var randomX = (Math.random() * 10000) + 1;
	  var randomY = (Math.random() * 1000) + 1;
	  
	  animate('x', randomX, 10000);

	  
}

/*
	1. create canvas, setup context
	2. 
*/

// http://jsfiddle.net/Ljyh8umr/2/
function test(){

	var canvas = document.createElement('canvas');
	canvas.id = "testidd";
	canvas.height = window.screen.availHeight;
	canvas.width = window.screen.availWidth;
	document.body.appendChild(canvas);

	console.log(canvas);

	var ctx = canvas.getContext('2d'),
	scene = [],
	lastTime = 0, // Last seen timestamp.
	drawFrame = function (timestamp) {
		// Clear canvas. An efficient implementation
		// will only clear as much as needed.
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// Call update on all scene elements...
		scene.forEach(function (elem) {
			elem.update(timestamp - lastTime);
		});
		
		// ...then draw them.
		scene.forEach(function (elem) {
			elem.draw(ctx);
		});
		
		// Request to be called again.
		lastTime = timestamp;
		window.requestAnimationFrame(drawFrame);
	};
	
	// Kick off animation loop.
	window.requestAnimationFrame(drawFrame);
	
	// Animated circle constructor.
	var animatedCircle = function (starx, starty, color) {
	var dir = 1, // movement direction
		x = starx || canvas.width / 2,
		y = starty || canvas.height / 2,
		r = 50,
		v = 0.1,
		color = color || 'black';
	
	return {
		x: x, y: y, r: r, v: v, color: color,
		update: function (deltaT) {
			// Update location based on elapsed time.
			this.x += this.v * deltaT * dir;
			
			// Clamp.
			if (this.x + this.r > canvas.width) {
				dir = -1;
			}
			else if (this.x - this.r < 0) {
				dir = 1;
			}
		},
		draw: function (ctx) {
			// Draw element according to current property values.
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.r, 0, 2 * Math.PI);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	}
	};
	
	// Compose scene.
	scene.push(animatedCircle(canvas.width * 0.33, null, 'red'));
	scene.push(animatedCircle(null, canvas.height * 0.25, 'green'));
	scene.push(animatedCircle(canvas.width * 0.66, canvas.height * 0.75, 'blue'));
}

test();
