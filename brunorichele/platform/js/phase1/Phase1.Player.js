Phase1.Player = {
	itemPlayer : "assets/phase1/images/player_1200-100-15.png",
	player : null,
	init : function(game){
		game.load.spritesheet('player', this.itemPlayer, 80, 100);	
	},
	create : function(game){
		this.player = game.add.sprite(20, 1580, 'player');
		game.physics.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.velocity = 300;		
		this.player.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
		this.player.animations.add('jump', [8, 9, 10, 11, 12, 13, 14], 10, false);
        this.player.animations.play('run');			
		game.camera.follow(this.player);
		
		return this.player;	
	}
};