function Player(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.velocidade = 15;
}

Player.prototype.moveLeft = function () {
    this.x -= this.velocidade;
};

Player.prototype.moveRight = function () {
    this.x += this.velocidade;
};

Player.prototype.draw = function (context) {
    context.save();
    context.fillStyle = '#fff';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
};

Player.prototype.collidesWithBall = function (ball) {
    return (this.x <= (ball.x + ball.radius) && (this.x + this.width) >= (ball.x - ball.radius))
        && (this.y <= (ball.y + ball.radius) && (this.y + this.height) >= (ball.y - ball.radius));
};