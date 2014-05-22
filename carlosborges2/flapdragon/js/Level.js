
var BG_SKY = PATH_ASSETS + 'sky_960-600.png';
var BG_GROUND = PATH_ASSETS + 'mountain_1366-500.png';

Level = function(/*game*/) {
	
//	this.game = game;
	this.ground;
	this.bgSky;

	this.preload = function() {
		
		console.log('level -> preload');
		
		game.load.image(BG_SKY, BG_SKY);
		game.load.image(BG_GROUND, BG_GROUND);
		
	};

	this.create = function() {
		// background
		this.bgSky = game.add.sprite(0, 0, BG_SKY);
		
		// ground
		this.ground = game.add.tileSprite(0, game.world.height - 90, game.world.width, 90, BG_GROUND);
		this.ground.autoScroll(-200, 0);
		
		// physics
		game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.ground.body.immovable = true;
	};

};