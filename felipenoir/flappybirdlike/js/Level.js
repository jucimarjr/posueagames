Level = function(game) {
	this.game = game;
	this.objects;
	this.ground;
	this.barriers;
	this.barrierGenerator;
	this.bg;
}

Level.prototype = {
	preload : function() {
		console.log('level -> preload');
		this.game.load.spritesheet('char1','assets/char_121-134.png', 121, 134);
		this.game.load.image('bg', 'assets/bg.png');
		this.game.load.image('ground', 'assets/ground.png');
		this.game.load.image('tallbarrier', 'assets/tallbarrier.png');
		this.game.load.image('shortbarrier', 'assets/shortbarrier.png');
	},

	create : function() {
		
		// background
		this.bg = this.game.add.tileSprite(0, 0,game.stage.bounds.width,game.cache.getImage('bg').height,'bg');
		this.objects = this.game.add.group();
		this.objects.enableBody = true;
		
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
	}
	,
	generateBarrier : function() {
		console.log('level -> generateBarrier');
		var barrier = this.objects.create(this.game.world.width,
				this.game.world.height - 224, 'char1');
		this.game.physics.arcade.enableBody(barrier);
		barrier.body.allowGravity = false;
		barrier.body.immovable = true;
		barrier.body.velocity.x = -200;
	}
}