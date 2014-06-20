Game.GateController = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y + 2, 'main_sprite_atlas', 'gate_32-96.png');

	this.anchor.setTo(0.0, 1.0);
};

Game.GateController.prototype = Object.create(Phaser.Sprite.prototype);
Game.GateController.prototype.constructor = Game.GateController;

Game.GateController.prototype.update = function () {
	if (PhysicsConsts.debugDraw && this.body)
        this.game.debug.body(this);
};

Game.GateController.prototype.onGateOpenned = function (callback, ctxt) {
	this.emitter = this.game.add.emitter(this.x, this.y, 200);
	this.emitter.x += this.width / 2.0;
	this.emitter.y -= this.height / 2.0 + 14;
    this.emitter.makeParticles('spark_particle_medium');
    // this.emitter.width = 1;
    // this.emitter.height = 1;
    this.emitter.minParticleSpeed.setTo(-50, 50);
    this.emitter.maxParticleSpeed.setTo(50, -50);
    this.emitter.setRotation(0, 0);
    this.emitter.gravity = -PhysicsConsts.gravity;
    this.emitter.setScale(1.0, 0.0, 1.0, 0.0, 1000, Phaser.Easing.Cubic.In);
    this.emitter.start(true, 1000, null, 20);

	var tween = this.game.add.tween(this);
    tween.to({ alpha: 0.0 }, 1000, Phaser.Easing.Cubic.In, true, 1000);
    tween.onComplete.add(callback, ctxt);
};
