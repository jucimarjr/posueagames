/**
 * Drawable Class
 */

function Drawable(x, y, width, height) {

	this.parent;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.velocity = {
		speed : 0,		
		x : 0,
		y : 0,
		a : 0
	};
	this.color = 'black';
	this.elapsedTime = 0;
	this.delay = 0;
	this.canCollide = true;
}

Drawable.prototype.setSpeed = function (speed, degree) {

	this.velocity.x = speed * Math.cos(Math.PI * (degree / 180));
	this.velocity.y = speed * Math.sin(Math.PI * (degree / 180));
	this.velocity.speed = speed;
};



Drawable.prototype.coordIsWithin = function(x, y) {

	return x >= this.x && x <= this.x + this.width && y >= this.y
			&& y <= this.y + this.height;

};

Drawable.prototype.paint = function(canvas) {
};

Drawable.prototype.animate = function(delta) {
};

Drawable.prototype.calcSpeed = function(delta, pixelsPerSec) {
	return ((pixelsPerSec * delta) / 1000);
};

/**
 * Board Class
 */

function Board(canvas, x, y, width, height) {

	Drawable.call(this, x, y, width, height);

	this.canvas = canvas;
	this.items = new Array();
}

Board.prototype = new Drawable();
Board.prototype.constructor = Board;

Board.prototype.add = function(item) {
	if (item instanceof Drawable && this.items.indexOf(item) == -1) {
		item.parent = this;
		this.items.push(item);
	}
	return item;
};

Board.prototype.del = function(item) {

	var index = this.items.indexOf(item);

	if (index >= 0) {
		this.items.splice(index, 1);		
	}

};

Board.prototype.paint = function() {

	this.canvas.globalAlpha = 1.5;
	this.canvas.clearRect(this.x, this.y, this.width, this.height);
	this.canvas.fillStyle = this.color;
	this.canvas.fillRect(this.x, this.y, this.width, this.height);

	for ( var i in this.items) {
		this.items[i].paint(this.canvas);
	}
};

Board.prototype.animate = function(delta) {
	for ( var i in this.items) {
		this.items[i].animate(delta);
	}
};

/**
 * Circle Class
 */
function Circle(x, y, radius) {

	Drawable.call(this, x, y, radius * 2, radius * 2);

	this.radius = radius;
}

Circle.prototype = new Drawable();
Circle.prototype.constructor = Circle;

Circle.prototype.paint = function(canvas) {

	canvas.fillStyle = this.color;
	canvas.beginPath();
	canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	canvas.fill();
};

/**
 * Rectangle Class
 */

function Rectangle(x, y, width, height) {

	Drawable.call(this, x, y, width, height);
}

Rectangle.prototype = new Drawable();
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.paint = function(canvas) {

	canvas.fillStyle = this.color;
	canvas.fillRect(this.x, this.y, this.width, this.height);
};

/**
 * Text Class
 */

 function Text(x, y, font, text) {
 	Drawable.call(this, x, y, 0, 0);	
 	this.font = font;
 	this.text = text;
 	this.color = "white";
 	this.align = "start";
 	this.canCollide = false;
 	this.oldText;
 	this.oldFont;
 }

Text.prototype = new Drawable();
Text.prototype.constructor = Text;

Text.prototype.paint = function(canvas) {

	canvas.fillStyle = this.color;
	canvas.font = this.font;      
	canvas.textAlign = this.align;  	
    canvas.fillText(this.text, this.x, this.y);

    if (this.text != this.oldText || this.font != this.oldFont) {    	
    	var metrics = canvas.measureText(this.text);
    	this.width = metrics.width;
    	this.height = parseInt(this.font);    	
    	this.oldText = this.text;
    	this.oldFont = this.font;
    }
};
