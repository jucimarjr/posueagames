
var BG_SKY = PATH_ASSETS + 'skyday_960-600.png';
//var BG_GROUND = PATH_ASSETS + 'mountain_1366-500.png';
var BG_GROUND = PATH_ASSETS + 'mountains_1280-150.png';
var BG_BIGCITY = PATH_ASSETS + 'bg_city_1000-350..png';
Level = function(/*game*/) {
	
//	this.game = game;
	this.ground;
	this.bgSky;
	this.bigcity;

	this.preload = function() {
		
		console.log('level -> preload');
		
		game.load.image(BG_SKY, BG_SKY);
		game.load.image(BG_GROUND, BG_GROUND);
		game.load.image(BG_BIGCITY, BG_BIGCITY);
	};

	this.create = function() {
		// background
		this.bgSky = game.add.sprite(0, 0, BG_SKY);
		
		// ground
		this.ground = game.add.tileSprite(0, game.world.height - 90, game.world.width, 90, BG_GROUND);
		this.ground.autoScroll(-10, 0);
		
		//bigcity
		this.bigcity = game.add.tileSprite(0, game.world.height - 90, game.world.width, 90, BG_BIGCITY);
		this.bigcity.autoScroll(-50, 0);
		
		// physics
		game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.ground.body.immovable = true;
	};

};