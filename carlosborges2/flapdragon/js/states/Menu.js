//Menu.js

var audioMenu = null;

function audioStopFunc() {
	
	console.log("audioStopFunc");
	
	audioMenu.stop();
	
}

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
		audioMenu = game.add.audio(this.soundOpening, 1, true);
		audioMenu.play('', 0, 1, true);
		
		var spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceBar.onDown.add(this.start, this);
		
		game.add.sprite(0, 0, this.imageLogoMenu);
		
		// menu text
		var text = this.game.add.text(game.world.centerX, 50, "Pressione barra!", this.style);
		text.anchor.setTo(0.5, 0.5);
		game.add.tween(text).to( { y: this.game.world.height/2}, 2400, Phaser.Easing.Bounce.In, true);
	},
	
	start: function() {
		
		setTimeout(audioStopFunc, 1000);
		
//		audioMenu.stop();
		
		this.game.state.start(STATE_PLAY);
	},
	
};