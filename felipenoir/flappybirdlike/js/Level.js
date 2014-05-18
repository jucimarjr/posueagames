Level = function(game) {
	this.game = game;
	this.ground;
	this.barriers;
	this.barrierGenerator;
}

Level.prototype = {
	preload : function() {
		console.log('level -> preload');
		this.game.load.image('bg', 'assets/bg.png');
		this.game.load.image('ground', 'assets/ground.png');
		this.game.load.image('tallbarrier', 'assets/tallbarrier.png');
		this.game.load.image('shortbarrier', 'assets/shortbarrier.png');
	},

	create : function() {
		console.log('level -> create');

		// background
		this.game.add.sprite(0, 0, 'bg');

		// ground
		this.ground = this.game.add.tileSprite(0, this.game.world.height - 90, this.game.world.width, 90, 'ground');
		this.ground.autoScroll(-200, 0);
		
		// physics
		this.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.ground.body.immovable = true;

		// barriers
		this.barrierGenerator = this.game.time.events.loop(
				Phaser.Timer.SECOND * 2, this.generateBarrier, this);
		this.barrierGenerator.timer.start();
	},

	generateBarrier : function() {
		console.log('level -> generateBarrier');
		var barrier = this.game.add.sprite(this.game.world.width,
				this.game.world.height - 300, 'tallbarrier');
		this.game.physics.arcade.enableBody(barrier);
		barrier.body.allowGravity = false;
		barrier.body.immovable = true;
		barrier.body.velocity.x = -200;
	}
}