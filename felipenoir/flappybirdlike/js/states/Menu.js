var audioMenu;

var menuState = {

	preload : function() {
		game.load.image('menu', 'assets/menu.png');
		game.load.image('enter_game', 'assets/enter_game.png');
		game.load.audio('audioMenu', 'assets/song_menu_otimizada.mp3');
	},

	create : function() {
		// Toca audio do menu
		audioMenu = game.add.audio('audioMenu', 1, true);
		audioMenu.play('', 0, 1, true);

		var spaceBar = this.game.input.keyboard
				.addKey(Phaser.Keyboard.SPACEBAR);
		spaceBar.onDown.add(this.start, this);

		game.add.sprite(0, 0, 'menu');

		var enterGame = game.add.sprite(0, 0, 'enter_game');
		enterGame.alpha = 0;
		game.add.tween(enterGame).to({
			alpha : 1
		}, 500, Phaser.Easing.Linear.None, true, 0, 2000, true);
	},

	start : function() {
		audioMenu.stop();
		this.game.state.start('play');
	}
};