function Bar(params) {
    this.x = params.x || 0;
    this.y = params.y || 0;
    this.width = params.width || 0;
    this.height = params.height || 0;
    this.cor = params.color;
    this.image = params.image || null;
}

Bar.prototype.collidesWithBall = function (ball) {
    return (this.x <= (ball.x + ball.radius) && (this.x + this.width) >= (ball.x - ball.radius))
        && (this.y <= (ball.y + ball.radius) && (this.y + this.height) >= (ball.y - ball.radius));
};

Bar.prototype.draw = function (context) {
    context.save();

    if (this.image) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
        context.fillStyle = this.cor;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    
    context.restore();
};