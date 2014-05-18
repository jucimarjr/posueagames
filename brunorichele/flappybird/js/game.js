var FlappyBird = {
	preload : function(){
		game.load.image('star', 'assets/star.png');
		game.load.image('background', 'assets/sky.png');
		game.load.image('plataforma', 'assets/platform.png');
	},	
	
	create : function(){
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.background = game.add.sprite(0,0, 'background');
		this.plataforma = game.add.group();
		this.plataforma.enableBody = true;
		
		var ground = plataforma.create( 0 , game.world.height - 64, 'ground');
		
		var ledge = platforms.create(400, 400, 'ground');
		
		ledge = platforms.create(-150, 250, 'ground');
		
		//ground.scale.setTo(2, 2);
		
		
	},
	
	update : function(){
		
	}
		
};



