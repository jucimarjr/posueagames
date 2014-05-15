BreakoutGame.Brick = function (index) {
    if (index === undefined) {
        console.error("index not defined");
    } else {
        if (index > 23)
            index = 23;
    }
    
    GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedSpriteSheets["images/bricks.png"]);
    
    this.glow = GameFramework.SpriteFactory.spriteFromSpriteSheet("images/bricksGlow.png");
    this._spriteIndex = index;
    this._glowAnimation = new GameFramework.Animation(this.glow,
                                                      'opacity',
                                                      0.5,
                                                      1.0,
                                                      600,
                                                      GameFramework.Easing.Type.OutQuart);
};

BreakoutGame.Brick.prototype = new GameFramework.Sprite();

BreakoutGame.Brick.prototype.glowIndex = function (brickIndex) {
    if (brickIndex < 4) {
        return 0;
    } else if (brickIndex < 8) {
        return 1;
    } else if (brickIndex < 12) {
        return 2;
    } else if (brickIndex < 19) {
        return 3;
    }
    return 4;
};

BreakoutGame.Brick.prototype.init = function () {
    GameFramework.Sprite.prototype.init.apply(this);
    this.glow.init();
};

BreakoutGame.Brick.prototype.spriteIndex = function(index) {
    GameFramework.Sprite.prototype.spriteIndex.apply(this, [index]);
    this.glow.spriteIndex(this.glowIndex(index));
};

BreakoutGame.Brick.prototype.playGlowAnimation = function () {
    this._glowAnimation.begin();
},

BreakoutGame.Brick.prototype.update = function (time) {
    GameFramework.Sprite.prototype.update.apply(this, [time]);
    
    this.glow.transform = this.transform;
    this.glow.update(time);
    this._glowAnimation.update(time);
};

BreakoutGame.Brick.prototype.render = function (time, context2D, debugDraw) {
    this.glow.opacity = this.opacity;
    this.glow.render(time, context2D, false);
    GameFramework.Sprite.prototype.render.apply(this, [time, context2D, debugDraw]);
};

BreakoutGame.Brick.prototype.dispose = function () {
    GameFramework.Sprite.prototype.dispose();
    this.glow.dispose();
    this._glowAnimation.dispose();
};
