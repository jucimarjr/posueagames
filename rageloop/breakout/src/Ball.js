function Ball(x, y, radius) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 1;
    this.angle = 0;
    this.speed = 0;
    this.directionUp = false;
}

Ball.prototype.draw = function (context) {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = '#fff';
    context.fill();
    context.restore();
};