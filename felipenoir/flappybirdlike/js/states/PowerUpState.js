PowerUpState = function(){
	
}

PowerUpState.prototype = {
	
	preload : function(){
	
	},
	create : function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.world.setBounds(0, 0, 600, game.cache.getImage('mountains').width);

		var audioMenu = game.add.audio('audioMenu', 1, true);
		audioMenu.play('', 0, 1, true);

		level.create();
		player.create(audioMenu);
		coins.create();
		coins.velocityX = -400;
		game.camera.follow(player.sprite);
	},
	update : function(){
		level.update();
		coins.update();
		score.update();
		player.update()

		if(score.count > 50){
			game.state.start('play');
		}
	}
}