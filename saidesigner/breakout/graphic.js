/**
 * Drawable Object
 */

function Drawable(x, y, width, height) {

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.velocity = {
		x : 0,
		y : 0,
		a : 0 // acceleration
	};
}

Drawable.prototype.color = 'black';
Drawable.prototype.x = 0;
Drawable.prototype.y = 0;
Drawable.prototype.width = 0;
Drawable.prototype.height = 0;
Drawable.prototype.parent = null;
Drawable.prototype.velocity = null;

Drawable.prototype.paint = function(canvas) {
};

Drawable.prototype.animate = function() {
};

Drawable.prototype.setParent = function(parent) {
	this.parent = parent;
};

/**
 * Board Object
 */

function Board(canvas, x, y, width, height) {

	Drawable.call(this, x, y, width, height);

	this.canvas = canvas;
	this.items = new Array();
}

Board.prototype = new Drawable();
Board.prototype.constructor = Board;
Board.prototype.items = null;
Board.prototype.canvas = null;

Board.prototype.add = function(item) {
	if (item instanceof Drawable && this.items.indexOf(item) == -1) {
		item.setParent(this);
		this.items.push(item);
	}
	return item;
};

Board.prototype.paint = function() {

	this.canvas.clearRect(this.x, this.y, this.width, this.height);
	this.canvas.fillStyle = this.color;
	this.canvas.fillRect(this.x, this.y, this.width, this.height);

	for ( var i in this.items) {
		this.items[i].paint(this.canvas);
	}
};

Board.prototype.animate = function() {
	for ( var i in this.items) {
		this.items[i].animate();
	}
};

/**
 * Circle Object
 */
function Circle(x, y, radius) {

	Drawable.call(this, x, y, radius * 2, radius * 2);

	this.radius = radius;
}

Circle.prototype = new Drawable();
Circle.prototype.constructor = Circle;
Circle.prototype.radius = 0;

Circle.prototype.paint = function(canvas) {

	canvas.fillStyle = this.color;
	canvas.beginPath();
	canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);	
	canvas.fill();
};

Circle.prototype.animate = function() {
	this.x += this.velocity.x;
	this.y += this.velocity.y;
};

/**
 * Bar Object
 */

function Bar(x, y, width, height) {

	Drawable.call(this, x, y, width, height);
}

Bar.prototype = new Drawable();
Bar.prototype.constructor = Bar;

Bar.prototype.paint = function(canvas) {

	canvas.fillStyle = this.color;
	canvas.fillRect(this.x, this.y, this.width, this.height);
};
