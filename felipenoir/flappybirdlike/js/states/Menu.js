var audioMenu, options, optionsBar, start, credits;

var menuState = {

	preload : function() {
		game.load.image('title', 'assets/menu_title.png')
		game.load.image('bg', 'assets/menu_bg.png');
		game.load.image('options', 'assets/menu_options.png');
		game.load.image('credits', 'assets/menu_options_credits.png');
		game.load.image('start', 'assets/menu_options_play.png');
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

		// menu group
		options = game.add.group();
		optionsBar = options.create(0, game.world.height, 'options');
		start = options.create(0, game.world.height, 'start');
		credits = options.create(game.world.centerX, game.world.height,
				'credits');

		start.inputEnabled = true;
		credits.inputEnabled = true;

		start.events.onInputDown.add(this.start, this);
		credits.events.onInputDown.add(this.credits, this);

		titleEffect = game.add.tween(title);
		titleEffect.to({
			y : 0
		}, 1000, Phaser.Easing.Bounce.Out);
		titleEffect.onComplete.add(this.showOptions, this);
		titleEffect.start();
	},

	showOptions : function() {
		game.add.tween(options).to({
			y : -82
		}, 1000, Phaser.Easing.Bounce.Out, true);
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