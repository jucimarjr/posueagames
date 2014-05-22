BasicGame.Obstacle = function(gameManager, group) {
    this.gameManager = gameManager;
    this.topSprite;
    this.bottomSprite;
    this.group = group;

    this._spriteWidth = this.gameManager.cache.getImage('pipe').width;
    this._spriteHeight = this.gameManager.cache.getImage('pipe').height;
};

BasicGame.Obstacle.velocity = -2;

BasicGame.Obstacle.prototype = {
    create: function() {
        this.topSprite = this.group.create(0, 0, 'pipe');
        this.bottomSprite = this.group.create(0, 0, 'pipe');
        this.topSprite.anchor.setTo(0.5, 0.5);
        this.bottomSprite.anchor.setTo(0.5, 0.5);
        this.bottomSprite.angle = 180;
    },
    
    setGap: function (x, y, gapHeight) {
        this.topSprite.x = x;
        this.topSprite.y = y - gapHeight / 2.0 - this._spriteHeight / 2.0;
        
        this.bottomSprite.x = x;
        this.bottomSprite.y = y + gapHeight / 2.0 + this._spriteHeight / 2.0;
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