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
