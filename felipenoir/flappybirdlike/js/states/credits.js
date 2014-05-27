var creditsState = {

	preload : function() {
		game.load.image('credits', 'assets/credits_bg.png');
		game.load.image('back', 'assets/credits_back.png');
	},

	create : function() {
		game.add.sprite(0, 0, 'credits');

		back = game.add.sprite(game.world.centerX, game.world.height - 70,
				'back');
		back.anchor.set(.5, 0);
		back.inputEnabled = true;
		back.events.onInputDown.add(this.backScreen, this);

		var keyB = game.input.keyboard.addKey(Phaser.Keyboard.B);
		keyB.onDown.add(this.backScreen, this);
	},

	backScreen : function() {
		this.game.state.start('menu');
	}

}