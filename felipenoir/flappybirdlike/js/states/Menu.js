
var audioMenu;
var style = { font: "30px Arial", fill: "#ffffff" };
//Menu.js
var menuState = { 
	
	
	
	preload: function(){
		game.load.image('logoMenu', 'assets/tela inicial.png');
		game.load.audio('audioMenu', 'assets/song_menu_otimizada.mp3');

	},
    create: function() {
		var spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceBar.onDown.add(this.start,this);
		
		//Toca audio do menu
		audioMenu = game.add.audio('audioMenu',1,true);
		audioMenu.play('',0,1,true);
		
		var spriteLogoMenu =  game.add.sprite(0, 0, 'logoMenu');
		//Texto do menu
		var text = this.game.add.text(game.world.width/2 - 180, 0, "Press Space To Start", style);
		//text.anchor.setTo(0.5, 0.5);
		game.add.tween(text).to( { y: this.game.world.height/2}, 2400, Phaser.Easing.Bounce.Out, true);
    },
	
    start: function() {
		audioMenu.stop();
        this.game.state.start('play');
    }
};