Level = function(game) {
	this.game = game;
	this.ground;
	this.bg;
}

Level.prototype = {

	preload : function() {
		console.log('level -> preload');
		this.game.load.image('ground', 'assets/ground.png');
		this.game.load.image('bg', 'assets/bg.png');
	},

	create : function() {
		// background
		this.bg = this.game.add.tileSprite(0, 0, game.stage.bounds.width,
				game.cache.getImage('bg').height, 'bg');

		// ground
		this.ground = this.game.add.tileSprite(0, this.game.world.height - 90,
				this.game.world.width, 90, 'ground');
		this.ground.autoScroll(-200, 0);

		// physics
		this.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.ground.body.immovable = true;
	},

}