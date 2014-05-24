Level = function() {
	this.ground;
	this.bg;
}

Level.prototype = {

	preload : function() {
		game.load.image('ground', 'assets/ground.png');
		game.load.image('mountains', 'assets/mountains.png');
		game.load.image('houses', 'assets/casas.png');
	},

	create : function() {
		// background
		this.mountains = game.add.tileSprite(0, 0, game.stage.bounds.width,
				game.cache.getImage('mountains').height, 'mountains');
		this.houses = game.add.tileSprite(0, 0, game.stage.bounds.width,
				game.cache.getImage('houses').height, 'houses');

		this.mountains.autoScroll(-10, 0);
		this.houses.autoScroll(-150, 0);

		// ground
		this.ground = game.add.tileSprite(0, game.world.height - 90,
				game.world.width, 90, 'ground');
		this.ground.autoScroll(-200, 0);

		// physics
		game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.ground.body.immovable = true;
	},

	update : function() {
		this.mountains.tilePosition.x -= 1;
	}

}