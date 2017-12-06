// https://codepen.io/whqet/pen/Auzch

class FireWork {
	constructor(sx, sy, tx, ty, parent){
		// actual coordinates
		this.x = sx;
		this.y = sy;
		// starting coordinates
		this.sx = sx;
		this.sy = sy;
		// target coordinates
		this.tx = tx;
		this.ty = ty;
		this.ctx = parent.ctx;
		this.hue = parent.hue;
		this.particles = parent.particles;
		this.fireworks = parent.fireworks;
		this.parent = parent;

		// distance from starting point to target
		this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
		this.distanceTraveled = 0;
		// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
		this.coordinates = [];
		this.coordinateCount = 3;
		// populate initial coordinate collection with the current coordinates
		while (this.coordinateCount--) {
			this.coordinates.push([this.x, this.y]);
		}
		this.angle = Math.atan2(ty - sy, tx - sx);
		this.speed = 2;
		this.acceleration = 1.05;
		this.brightness = random(50, 70);
		// circle target indicator radius
		this.targetRadius = 1;

		this.particle = new Particle(this.x, this.y, this.parent);
	}

	update(index) {
		// remove last item in coordinates array
		this.coordinates.pop();
		// add current coordinates to the start of the array
		this.coordinates.unshift([this.x, this.y]);

		// cycle the circle target indicator radius
		if (this.targetRadius < 8) {
			this.targetRadius += 0.3;
		} else {
			this.targetRadius = 1;
		}

		// speed up the firework
		this.speed *= this.acceleration;

		// get the current velocities based on angle and speed
		var vx = Math.cos(this.angle) * this.speed,
			vy = Math.sin(this.angle) * this.speed;
		// how far will the firework have traveled with velocities applied?
		this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

		// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
		if (this.distanceTraveled >= this.distanceToTarget) {
			this.particle.createParticles(this.tx, this.ty);
			// remove the firework, use the index passed into the update function to determine which to remove
			this.fireworks.splice(index, 1);
		} else {
			// target not reached, keep traveling
			this.x += vx;
			this.y += vy;
		}
	}

	draw() {
		this.ctx.beginPath();
		// move to the last tracked coordinate in the set, then draw a line to the current x and y
		this.ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
		this.ctx.lineTo(this.x, this.y);
		this.ctx.strokeStyle = 'hsl(' + this.hue + ', 100%, ' + this.brightness + '%)';
		this.ctx.stroke();

		this.ctx.beginPath();
		// draw the target for this firework with a pulsing circle
		/* ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
		 ctx.stroke(); */
	}
}

class Particle {
	constructor(x, y, parent){
		this.x = x;
		this.y = y;
		this.ctx = parent.ctx;
		this.hue = parent.hue;
		this.particles = parent.particles;
		this.parent = parent;
		// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
		this.coordinates = [];
		this.coordinateCount = 5;
		while (this.coordinateCount--) {
			this.coordinates.push([this.x, this.y]);
		}
		// set a random angle in all possible directions, in radians
		this.angle = random(0, Math.PI * 2);
		this.speed = random(1, 10);
		// friction will slow the particle down
		this.friction = 0.95;
		// gravity will be applied and pull the particle down
		this.gravity = 1;
		// set the hue to a random number +-50 of the overall hue variable
		this.hue = random(this.hue - 50, this.hue + 50);
		this.brightness = random(50, 80);
		this.alpha = 1;
		// set how fast the particle fades out
		this.decay = random(0.015, 0.03);
	}

	update(index) {
		// remove last item in coordinates array
		this.coordinates.pop();
		// add current coordinates to the start of the array
		this.coordinates.unshift([this.x, this.y]);
		// slow down the particle
		this.speed *= this.friction;
		// apply velocity
		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed + this.gravity;
		// fade out the particle
		this.alpha -= this.decay;

		// remove the particle once the alpha is low enough, based on the passed in index
		if (this.alpha <= this.decay) {
			this.particles.splice(index, 1);
		}
	}

	draw() {
		this.ctx.beginPath();
		// move to the last tracked coordinates in the set, then draw a line to the current x and y
		this.ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
		this.ctx.lineTo(this.x, this.y);
		this.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
		this.ctx.stroke();
	}

	createParticles(x, y) {
		// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
		var particleCount = 30;
		while (particleCount--) {
			this.particles.push(new Particle(x, y, this.parent));
		}
	}
}

function random(min, max) {
	return Math.random() * (max - min) + min;
}

// calculate the distance between two points
function calculateDistance(p1x, p1y, p2x, p2y) {
	var xDistance = p1x - p2x,
		yDistance = p1y - p2y;
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}


export class CreateFireworks {
	constructor() {
		this.animationFrame;
		this.canvas;
		this.ctx;
		this.hue;
		this.cw;
		this.ch;
		this.fireworks;
		this.particles;
		this.my;
		this.mx;
		this.timerTick;
		this.timerTotal;
		this.mousedown;
		this.Firework;

		this.startLoop = this.startLoop.bind(this);

		this.init();
	}
	init() {
		this.initRequestAnimFrame();

		this.initCanvasAndSetupVariables();

		// mouse event bindings
		// update the mouse coordinates on mousemove
		this.canvas.addEventListener( 'mousemove', ( e ) => {
			this.mx = e.pageX - this.canvas.offsetLeft;
			this.my = e.pageY - this.canvas.offsetTop;
		});

		// toggle mousedown state and prevent canvas from being selected
		this.canvas.addEventListener( 'mousedown', ( e ) => {
			e.preventDefault();
			this.mousedown = true;
		});

		this.canvas.addEventListener( 'mouseup', ( e ) => {
			e.preventDefault();
			this.mousedown = false;
		});

		window.onload = this.startLoop;
	}

	initRequestAnimFrame(){
		// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
		// not supported in all browsers though and sometimes needs a prefix, so we need a shim
		window.requestAnimFrame = (function () {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};
		})();
	}

	initCanvasAndSetupVariables(){
		// now we will setup our basic variables for the demo
		var canvas = this.canvas = document.createElement('canvas');
		document.body.appendChild(canvas);
		this.ctx = canvas.getContext('2d');

		// full screen dimensions
		this.cw = window.innerWidth;
		this.ch = window.innerHeight;

		// firework collection
		this.fireworks = [];

		// particle collection
		this.particles = [];

		// starting hue
		this.hue = 120;

		// when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
		this.limiterTotal = 5;
		this.limiterTick = 0;

		// this will time the auto launches of fireworks, one launch per 80 loop ticks
		this.timerTotal = 80;
		this.timerTick = 0;
		this.mousedown = false;

		// mouse x coordinate,
		this.mx;

		// mouse y coordinate
		this.my;

		// set canvas dimensions
		canvas.width = this.cw;
		canvas.height = this.ch;
	}

	startLoop() {
		
		// this function will run endlessly with requestAnimationFrame
		window.requestAnimFrame(this.startLoop);
	
		var cw = this.cw,
			ch = this.ch,
			mx = this.mx,
			my = this.my;

		// increase the hue to get different colored fireworks over time
		//hue += 0.5;

		// create random color
		this.hue = random(0, 360);

		// normally, clearRect() would be used to clear the canvas
		// we want to create a trailing effect though
		// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
		this.ctx.globalCompositeOperation = 'destination-out';
		// decrease the alpha property to create more prominent trails
		this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		this.ctx.fillRect(0, 0, cw, ch);
		// change the composite operation back to our main mode
		// lighter creates bright highlight points as the fireworks and particles overlap each other
		this.ctx.globalCompositeOperation = 'lighter';

		// loop over each firework, draw it, update it
		var i = this.fireworks.length;
		while (i--) {
			this.fireworks[i].draw();
			this.fireworks[i].update(i);
		}

		// loop over each particle, draw it, update it
		var newi = this.particles.length;
		while (newi--) {
			this.particles[newi].draw();
			this.particles[newi].update(newi);
		}

		// launch fireworks automatically to random coordinates, when the mouse isn't down
		if (this.timerTick >= this.timerTotal) {
			if (!this.mousedown) {
				// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
				this.fireworks.push(new FireWork(cw / 2, ch, random(0, cw), random(0, ch / 2), this));
				this.timerTick = 0;
			}
		} else {
			this.timerTick++;
		}

		// limit the rate at which fireworks get launched when mouse is down
		if (this.limiterTick >= this.limiterTotal) {
			if (this.mousedown) {
				// start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
				this.fireworks.push(new FireWork(cw / 2, ch, mx, my, this));
				this.limiterTick = 0;
			}
		} else {
			this.limiterTick++;
		}
	}
}