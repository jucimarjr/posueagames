Level = function(game) {
	this.game = game;
	this.ground;
	this.barriers;
}

Level.prototype = {
	preload : function() {
		console.log('level -> preload');
		this.game.load.image('bg', 'assets/bg.png');
		this.game.load.image('ground', 'assets/ground.png');
	},

	create : function() {
		console.log('level -> create');
		this.game.add.sprite(0, 0, 'bg');
		this.ground = this.game.add.tileSprite(0, this.game.world.height - 90,
				this.game.world.width, 90, 'ground');
		this.ground.autoScroll(-200, 0);
	},

	update : function() {

	}
}