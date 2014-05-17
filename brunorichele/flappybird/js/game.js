var Aquaman = {
	preload : function(){
		game.load.image('dinossauro', 'assets/phaser.png');
	},	
	
	create : function(){
		this.dinossauro = game.add.sprite(0, 0, 'dinossauro');
		
		// game.physics.enable(this.dinossauro, Phaser.Physics.ARCADE);
		
	},
	
	update : function(){
		
	}
		
};



