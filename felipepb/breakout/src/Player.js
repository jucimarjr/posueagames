BreakoutGame.Player = function () {
    GameFramework.Sprite.call(this, GameFramework.SpriteFactory.loadedTextures["images/player_racket_block.png"]);
    
    this.glow = GameFramework.SpriteFactory.spriteFromTexture("images/player_racket_glow.png");
};

BreakoutGame.Player.prototype = new GameFramework.Sprite();

BreakoutGame.Player.prototype.init = function () {
    GameFramework.Sprite.prototype.init.apply(this);
    this.glow.init();
};

BreakoutGame.Player.prototype.update = function (time) {
    GameFramework.Sprite.prototype.update.apply(this, [time]);
	
    this.glow.transform = this.transform;
    this.glow.update(time);
};

BreakoutGame.Player.prototype.render = function (time, context2D, debugDraw) {
    this.glow.render(time, context2D, false);
    GameFramework.Sprite.prototype.render.apply(this, [time, context2D, debugDraw]);
};

BreakoutGame.Player.prototype.dispose = function () {
    GameFramework.Sprite.prototype.dispose();
    this.glow.dispose();
};
