BasicGame.Obstacle = function(gameManager, group, x, y, gapHeight) {
    this.gameManager = gameManager;
    this.topSprite;
    this.bottomSprite;
    this.group = group;

    this.x = x;
    this.y = y;
    this.gapHeight = gapHeight;
}

BasicGame.Obstacle.prototype = {
    create: function() {

        // this.topSprite = this.group.create(this.x, this.y, 'clumsy');
        var spriteHeight = this.gameManager.cache.getImage('pipe').height;
        this.topSprite = this.group.create(this.x, this.y - this.gapHeight / 2.0 - spriteHeight / 2.0, 'pipe');
        this.topSprite.anchor.setTo(0.5, 0.5);
        this.bottomSprite = this.group.create(this.x, this.y + this.gapHeight / 2.0 + spriteHeight / 2.0, 'pipe');
        this.bottomSprite.anchor.setTo(0.5, 0.5);
        this.bottomSprite.angle = 180;
    },

    update: function() {

    }
}