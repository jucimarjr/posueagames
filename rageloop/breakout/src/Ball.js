function Ball(x, y, radius, image) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 1;
    this.angle = 0;
    this.speed = 0;
    this.directionUp = false;
    this.image = image || null; 
}

Ball.prototype.draw = function (context) {
    context.save();

    if (this.image) {
        var side_size = this.radius * 2;
        context.drawImage(this.image, this.x, this.y, side_size, side_size);
    } else {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = '#fff';
        context.fill();
    }
    
    context.restore();
};