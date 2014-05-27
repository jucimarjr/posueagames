var creditsState = {

	preload : function() {
		game.load.image('credits', 'assets/credits.png');
	},

	create : function() {
		game.add.sprite(0, 0, 'credits');
		var back = game.input.keyboard.addKey(Phaser.Keyboard.B);
		back.onDown.add(this.backScreen, this);
	},

	backScreen : function() {
		this.game.state.start('menu');
	}

}