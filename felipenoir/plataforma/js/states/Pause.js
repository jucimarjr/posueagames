//Pause
var Pause = function(game){
	this.game = game;
	this.imageMenu = 'assets/images/menu.png';
	this.menu;
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
		var moduloPosition = this.game.world.position.x < 0?(-1)*this.game.world.position.x : this.game.world.position.x; 
		this.menu = game.add.sprite(moduloPosition + this.game.width/2, this.game.height/2, 'menu');
		this.menu.anchor.setTo(0.5, 0.5);
	},
	resumeGame : function (event){
		console.log(event.game);
		if(this.game.paused){
			this.menu.destroy();
			this.game.paused = false;
		}
	}
};