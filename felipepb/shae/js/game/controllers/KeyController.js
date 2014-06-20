Game.KeyController = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y + 2, 'main_sprite_atlas', 'key_1_42-38.png');

	this.anchor.setTo(0.0, 1.0);

	// Create idle animation
    var idleAnimFrames = new Array();
    for (var i = 1; i <= 3; i++) {
        idleAnimFrames.push('key_' + i + '_42-38.png');
    };

    this.animations.add('idle', idleAnimFrames, 10, true);
    this.animations.play('idle');

    this.flyTween = game.add.tween(this);
    this.flyTween.to({ y: y - 4 }, 500, Phaser.Easing.Cubic.Out, true, 0, Number.MAX_VALUE, true);

    this.anchor.setTo(0.5, 0.5);
    this.x += this.width / 2.0;
    this.y -= this.width / 2.0;

    this.emitter = game.add.emitter(x, y, 10);
    this.emitter.makeParticles('spark_particle_medium');
    this.emitter.width = 20;
    this.emitter.height = 30;
    this.emitter.minParticleSpeed.setTo(0, 0);
    this.emitter.maxParticleSpeed.setTo(0, 0);
    this.emitter.setYSpeed(0, 0);
    this.emitter.setXSpeed(0, 0);
    this.emitter.setRotation(0, 0);
    this.emitter.gravity = -PhysicsConsts.gravity;
    this.emitter.setScale(0.0, 1.0, 0.0, 1.0, 1000, Phaser.Easing.Cubic.In, true);
    this.emitter.start(false, 1000, 250);

    this.collectedSFX = game.add.audio('key_collected');
};

Game.KeyController.prototype = Object.create(Phaser.Sprite.prototype);
Game.KeyController.prototype.constructor = Game.KeyController;

Game.KeyController.prototype.update = function () {
	if (PhysicsConsts.debugDraw && this.body)
        this.game.debug.body(this);

    this.emitter.x = this.x;
    this.emitter.y = this.y;
};

Game.KeyController.prototype.onCollected = function (playerSprite) {
	this.flyTween.stop();
	var collectedAnim = this.game.add.tween(this.scale);
	collectedAnim.to({ x: 0, y: 0 }, 500, Phaser.Easing.Cubic.Out, true);
	collectedAnim.onComplete.add(this.onCollectedAnimComplete, this);
    this.collectedSFX.play('', 0, 0.25);
}

Game.KeyController.prototype.onCollectedAnimComplete = function () {
	this.emitter.destroy();
	this.destroy();
}
