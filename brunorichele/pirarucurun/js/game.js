var PirarucuRun = {
		preload : function(){
			game.load.image('background', 'assets/river.png');
		},
		
		create : function(){
			game.physics.startSystem(Phaser.Physics.ARCADE);
			this.background = game.add.sprite(0,0, 'background');
		},
		
		update : function(){},
		
};