var gameoverState = {

	preload : function() {
		game.load.image('gameover', 'assets/gameover.png');
		game.load.image('blink', 'assets/gameover_blink.png');
	},

	create : function() {
		game.add.sprite(0, 0, 'gameover');
		var blink = game.add.sprite(0, 0, 'blink');
		blink.alpha = 0;
		game.add.tween(blink).to({
			alpha : 1
		}, 500, Phaser.Easing.Linear.None, true, 0, 2000, true);
	},

	update : function() {
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('play');
		}
	}
}