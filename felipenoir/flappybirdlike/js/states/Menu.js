var audioMenu;

var menuState = {

	preload : function() {
		game.load.image('title', 'assets/menu_title.png')
		game.load.image('bg', 'assets/menu_bg.png');
		game.load.image('options', 'assets/menu_options.png');
		game.load.audio('audioMenu', 'assets/song_menu_otimizada.mp3');
	},

	create : function() {
		// Toca audio do menu
		audioMenu = game.add.audio('audioMenu', 1, true);
		audioMenu.play('', 0, 1, true);

		var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.S);
		spaceBar.onDown.add(this.start, this);

		var creditsButton = game.input.keyboard.addKey(Phaser.Keyboard.C);
		creditsButton.onDown.add(this.credits, this);

		game.add.sprite(0, 0, 'bg');
		var title = game.add.sprite(game.world.centerX, -250, 'title');
		title.anchor.set(.5, 0);

		options = game.add.sprite(0, game.world.height + 82, 'options');

		titleEffect = game.add.tween(title);
		titleEffect.to({
			y : 0
		}, 1000, Phaser.Easing.Bounce.Out);
		titleEffect.onComplete.add(this.showOptions, this);
		titleEffect.start();
	},

	showOptions : function() {
		optionsEffect = game.add.tween(options);
		optionsEffect.to({
			y : game.world.height - 82
		}, 1000, Phaser.Easing.Bounce.Out);
		optionsEffect.start();
	},

	start : function() {
		audioMenu.stop();
		game.state.start('play');
	},

	credits : function() {
		audioMenu.stop();
		console.log('credits');
		game.state.start('credits');
	}
};