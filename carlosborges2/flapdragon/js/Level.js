
var BG_SKY = PATH_ASSETS + 'bg_sky_1500-338.png';
var BG_BEACH = PATH_ASSETS + 'bg_beach_1500-320.png';
var BG_GROUND = PATH_ASSETS + 'bg_ground_1500-40.png';

//var BG_SKY = PATH_ASSETS + 'skyday_960-600.png';
//var BG_GROUND = PATH_ASSETS + 'mountains_1280-150.png';
//var BG_BIGCITY = PATH_ASSETS + 'bg_city_1000-350..png';

Level = function(/*game*/) {
	
//	this.game = game;
	this.ground;
	this.bgSky;
	this.bigcity;

	this.preload = function() {
		
		console.log('level -> preload');
		
		game.load.image(BG_SKY, BG_SKY);
		game.load.image(BG_BEACH, BG_BEACH);
		game.load.image(BG_GROUND, BG_GROUND);
	};

	this.create = function() {
		// sky
		this.bgSky = game.add.tileSprite(0, 0, 1500, 338, BG_SKY);
		this.bgSky.autoScroll(-1, 0);
//		this.bgSky = game.add.sprite(0, 0, BG_SKY);
		
		// beach
		this.beach = game.add.tileSprite(0, 240, 1500, 320, BG_BEACH);
		this.beach.autoScroll(-30, 0);
		
		// ground
		this.ground = game.add.tileSprite(0, game.world.height - 40, 1500, 40, BG_GROUND);
		this.ground.autoScroll(-100, 0);
		
		// physics
		game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.ground.body.immovable = true;
	};

};