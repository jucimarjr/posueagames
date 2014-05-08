BreakoutGame.Brick = function (index) {
    if (index === undefined) {
        console.error("index not defined");
    } else {
        if (index > 18)
            index = 18;
    }
    
    GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedSpriteSheets["images/bricks.png"]);
    
    this.glow = GameFramework.SpriteFactory.spriteFromSpriteSheet("images/bricksGlow.png");
    this._spriteIndex = index;
};

BreakoutGame.Brick.prototype = new GameFramework.Sprite();

BreakoutGame.Brick.prototype.glowIndex = function (brickIndex) {
    if (brickIndex < 4) {
        return 0;
    } else if (brickIndex < 8) {
        return 1;
    } else if (brickIndex < 12) {
        return 3;
    } else if (brickIndex < 19) {
        return 4;
    }
    return 5;
};

BreakoutGame.Brick.prototype.init = function () {
    GameFramework.Sprite.prototype.init.apply(this);
    this.glow.init();
};

BreakoutGame.Brick.prototype.spriteIndex = function(index) {
    GameFramework.Sprite.prototype.spriteIndex.apply(this, [index]);
    this.glow.spriteIndex(this.glowIndex(index));
};

BreakoutGame.Brick.prototype.update = function (time) {
    GameFramework.Sprite.prototype.update.apply(this, [time]);
    
    this._timeInCurrentIndex += time.deltaTime;
    
    // this.spriteIndex((this.spriteIndex() + 1) % this._maxIndex);
    
    this.glow.transform = this.transform;
    this.glow.update(time);
};

BreakoutGame.Brick.prototype.render = function (time, context2D, debugDraw) {
    this.glow.render(time, context2D, false);
    GameFramework.Sprite.prototype.render.apply(this, [time, context2D, debugDraw]);
};

BreakoutGame.Brick.prototype.dispose = function () {
    GameFramework.Sprite.prototype.dispose();
    this.glow.dispose();
};
