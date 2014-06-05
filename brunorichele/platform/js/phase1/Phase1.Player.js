Phase1.Player = {
	itemPlayer : "assets/phase1/images/run_640-100-8.png",
	player : null,
	init : function(game){
		game.load.spritesheet('player', this.itemPlayer, 80, 100);	
	},
	create : function(game){
		this.player = game.add.sprite(20, 1580, 'player');
		game.physics.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.velocity = 300;		
		this.player.animations.add('correr', [0, 1, 2, 3,4,5,6,7], 10, true);
        this.player.animations.play('correr');			
		game.camera.follow(this.player);
		
		return this.player;	
	}
};