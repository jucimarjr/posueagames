function Life(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
}

Life.prototype.draw = function (context) {
    context.save();
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
};