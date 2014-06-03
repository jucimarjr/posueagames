//Pause
var Pause = function(game){
	this.game = game;
	this.imageMenu = 'assets/images/menu.png';
	this.menu;
	this.w = 960;
	this.h = 600;
};

Pause.prototype = {
	 preload : function(){
		this.game.load.image('menu',this.imageMenu);

	},
	create : function (){
		game.input.onDown.add(this.resumeGame, this);
		
	},
	update : function (){
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			this.pauseGame();
		}
	},
	pauseGame : function (){
		this.game.paused = true;
		this.menu = game.add.sprite(this.w/2, this.h/2, 'menu');
		this.menu.anchor.setTo(0.5, 0.5);
	},
	resumeGame : function (event){
		if(this.game.paused){
			this.menu.destroy();
			this.game.paused = false;
		}
	}
};