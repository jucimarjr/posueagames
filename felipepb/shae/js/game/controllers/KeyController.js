Game.KeyController = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'main_sprite_atlas', 'key_1_42-38.png');

	this.anchor.setTo(0.0, 1.0);

	// Create
    var idleAnimFrames = new Array();
    for (var i = 1; i <= 3; i++) {
        idleAnimFrames.push('key_' + i + '_42-38.png');
    };

    this.animations.add('idle', idleAnimFrames, 10, true);
    this.animations.play('idle');

    this.y = y;

    var flyTween = game.add.tween(this);
    flyTween.to({ y: this.y + 2 }, 1000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
};

Game.KeyController.prototype = Object.create(Phaser.Sprite.prototype);
Game.KeyController.prototype.constructor = Game.KeyController;
