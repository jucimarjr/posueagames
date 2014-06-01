var gameoverState = {

	preload : function() {
		game.load.image('gameover', 'assets/gameover.png');
		game.load.image('blink', 'assets/gameover_blink.png');
	},

	create : function() {
		game.add.sprite(0, 0, 'gameover');
		var blink = game.add.sprite(game.world.centerX,
				game.world.centerY + 28, 'blink');
		blink.alpha = 0;
		blink.anchor.set(.5, .5);
		game.add.tween(blink).to({
			alpha : 1
		}, 500, Phaser.Easing.Linear.None, true, 0, 2000, true);

		blink.inputEnabled = true;
		blink.events.onInputDown.add(this.play, this);

		var style = {
			font : '36px Arial',
			fill : '#000000'
		};
		var points = game.add.text(635, 313, score.count || '0', style);
		points.anchor.setTo(.5, .5);
	},

	update : function() {
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.play();
		}
	},

	play : function() {
		game.state.start('play');
	}
}