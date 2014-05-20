
var audioMenu;
 var style = { font: "30px Arial", fill: "#ffffff" };
//Menu.js
var menuState = { 
	
	
	
	preload: function(){
		game.load.image('logoMenu', 'assets/phaser2.png');
		game.load.audio('audioMenu', 'assets/song_menu_otimizada.mp3');

	},
 
    create: function() {
		var spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceBar.onDown.add(this.start,this);
		
		//Toca audio do menu
		audioMenu = game.add.audio('audioMenu',1,true);
		audioMenu.play('',0,1,true);
		
		//Animacao do menu
		var spriteLogoMenu =  game.add.sprite(this.game.world.width/2, -50, 'logoMenu', 0);
		spriteLogoMenu.anchor.setTo(0.5, 0.5);
		game.add.tween(spriteLogoMenu).to( { y: this.game.world.height/2 - 50}, 2400, Phaser.Easing.Bounce.Out, true);
		
		var text = this.game.add.text(game.world.width/2 , game.world.height/2 + 150, "Press space to start", style);
		text.anchor.setTo(0.5, 0.5);
    },
	
    start: function() {
		audioMenu.stop();
        this.game.state.start('play');
    }
};