function Bar(x, y, width, height, cor) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.cor = cor;
}

Bar.prototype.collidesWithBall = function (ball) {
    return (this.x <= (ball.x + ball.radius) && (this.x + this.width) >= (ball.x - ball.radius))
        && (this.y <= (ball.y + ball.radius) && (this.y + this.height) >= (ball.y - ball.radius));
};

Bar.prototype.draw = function (context) {
    context.save();
    context.fillStyle = this.cor;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
};