var gameoverState = {

	preload : function() {
		this.style = {
			fill : '#ffffff'
		};
	},

	create : function() {
		text = game.add.text(game.world.centerX, game.world.centerY,
				"vc perdeu!!!", this.style);
		text.anchor.set(0.5);
	},
	
	update : function() {
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('play');
		}
	}
}