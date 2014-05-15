
function HUD(params) {

    //distance to top;
    this.top = params.top || 0;

    //score info
    this.score = 0;

    //life info
    this.amountOfLifes = params.amountOfLifes || 5;
    this.lifes = [];
    this.lifeImage = params.lifeImage || null;
    this.lifeWidth = 20;
    this.lifeHeight = 20;
}

HUD.prototype.updateScore = function(value) {

    if (typeof value !== 'number') {
        return -1;
    }

    this.score += value;
};

HUD.prototype.updateLifes = function(value) {

    if (typeof value !== 'number') {
        return -1;
    }

    this.amountOfLifes += value;

};

HUD.prototype.getLifes = function() {

    return this.amountOfLifes;
};

HUD.prototype.draw = function(context) {

    if (!context) {
        return -1;
    }

    this.drawScore(context);
    this.drawLifes(context);
};

HUD.prototype.drawScore = function(context) {

    var score = this.score;

    if (this.score < 10) {
        score = '0' + this.score;
    }

    context.font = '24pt Tr2n';
    context.fillStyle = '#00bfff';
    context.fillText(score.toString(), this.top, 40);

};

HUD.prototype.drawLifes = function(context) {

    var width = this.lifeWidth;
    var height = this.lifeHeight;
    var right_margin = 5;

    for (var i = 1, amount = this.amountOfLifes+1; i < amount; i++) {
        this.drawLife({
            'context': context,
            'x': SCREEN_WIDTH - (i * (width + right_margin)),
            'y': this.top, 
            'width': this.lifeWidth,
            'height': this.lifeHeight
        });
    }
};

HUD.prototype.drawLife = function(params) {

    var context = params.context;

    context.save();

    if (this.lifeImage) {
        context.drawImage(this.lifeImage, params.x, params.y, params.width, params.height);
    } else {
        context.fillStyle = "white";
        context.fillRect(params.x, params.y, params.width, params.height);
    }

    context.restore();
}
