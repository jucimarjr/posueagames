BasicGame.Obstacle = function(gameManager, group, x, y, gapHeight) {
    this.gameManager = gameManager;
    this.topSprite;
    this.bottomSprite;
    this.group = group;

    this._x = x;
    this._y = y;
    this.gapHeight = gapHeight;
    this._spriteWidth = this.gameManager.cache.getImage('pipe').width;
};

BasicGame.Obstacle.velocity = -2;

BasicGame.Obstacle.prototype = {
    create: function() {

        // this.topSprite = this.group.create(this.x, this.y, 'clumsy');
        var spriteHeight = this.gameManager.cache.getImage('pipe').height;
        this.topSprite = this.group.create(this._x, this._y - this.gapHeight / 2.0 - spriteHeight / 2.0, 'pipe');
        this.topSprite.anchor.setTo(0.5, 0.5);
        this.bottomSprite = this.group.create(this._x, this._y + this.gapHeight / 2.0 + spriteHeight / 2.0, 'pipe');
        this.bottomSprite.anchor.setTo(0.5, 0.5);
        this.bottomSprite.angle = 180;
    },

    update: function() {
        var velocity = BasicGame.Obstacle.velocity;
        this.topSprite.x += velocity;
        this.bottomSprite.x += velocity;
    },
    
    x: function (value) {
        if (value === undefined)
            return this.topSprite.x;
        this.topSprite.x = value;
        this.bottomSprite.x = value;
    },
    
    y: function (value) {
        if (value === undefined)
            return this.topSprite.y;
        this.topSprite.y = value;
        this.bottomSprite.y = value;
    },
    
    spriteWidth: function () {
        return this._spriteWidth;
    }
};