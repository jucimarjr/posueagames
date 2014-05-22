//Menu.js
var menuState = { 
	
	imageLogoMenu: PATH_ASSETS + 'splash_1067-600.png',
	soundOpening: PATH_SOUND + 'dbz_opening.mp3',
	style: { font: "30px Arial", fill: "#ffffff" },
	
	preload: function(){
		game.load.image(this.imageLogoMenu, this.imageLogoMenu);
		game.load.audio(this.soundOpening, this.soundOpening);

	},
	create: function() {
		
		// play menu audio
		this.audioMenu = game.add.audio(this.soundOpening, 1, true);
		this.audioMenu.play('', 0, 1, true);
		
		var spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceBar.onDown.add(this.start, this);
		
		game.add.sprite(0, 0, this.imageLogoMenu);
		
		// menu text
		var text = this.game.add.text(game.world.width/2 - 180, 0, "Pressione barra!", this.style);
		game.add.tween(text).to( { y: this.game.world.height/2}, 2400, Phaser.Easing.Bounce.In, true);
	},
	
	start: function() {
		
		this.audioMenu.stop();
		
		this.game.state.start(STATE_PLAY);
	}
	
};