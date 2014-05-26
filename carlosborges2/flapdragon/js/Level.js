
var BG_SKY = PATH_ASSETS + 'fundo_1500-600.png';
var BG_GROUND = PATH_ASSETS + 'dragao_1500-90.png';

var BG_GROUND_COLLIDER = PATH_ASSETS + 'ground_collider_960-40.png';

var BG_GAME_OVER = PATH_ASSETS + 'gameover_292x196px.png';

var BG_SOUND = PATH_SOUND + 'dragon_ballz_opening_instrumental.mp3';

Level = function() {
	
	this.groundCoolide;
	this.ground;
	this.bgSky;
	this.bigcity;
	
	this.txt;
	this.hud;
	
	this.audioBg;

	this.preload = function() {
		
		console.log('level -> preload');
		
		game.load.image(BG_SKY, BG_SKY);
		game.load.image(BG_GROUND, BG_GROUND);
		game.load.image(BG_GROUND_COLLIDER, BG_GROUND_COLLIDER);
		game.load.image(BG_GAME_OVER, BG_GAME_OVER);
		
		game.load.audio(BG_SOUND, BG_SOUND);
	};

	this.create = function() {
		
		this.audioBg = game.add.audio(BG_SOUND, 1, true);
		this.audioBg.play('', 0, 0.5, true);
		
		// sky
		this.bgSky = game.add.tileSprite(0, 0, 1500, 600, BG_SKY);
		this.bgSky.autoScroll(-50, 0);
//		this.bgSky = game.add.sprite(0, 0, BG_SKY);
		
		// ground
		this.ground = game.add.tileSprite(0, game.world.height - 87, 1500, 87, BG_GROUND);
		this.ground.autoScroll(-100, 0);
		
		this.groundCoolide = game.add.sprite(0, game.world.height - 40, BG_GROUND_COLLIDER);
		
		// physics
		game.physics.enable(this.groundCoolide, Phaser.Physics.ARCADE);
		this.groundCoolide.body.immovable = true;
		
		// Info para jogar & Score
		this.txt = game.add.text(game.world.centerX, game.world.centerY, '', {font: "24px Arial", fill: "black" , align: "center"});
		this.txt.anchor.setTo(0.5, 0.5);
		this.txt.text = 'Pressione barra para voar!';
		
		this.hud = game.add.text(game.world.centerX, 35, 0, { font: "28px Arial", fill: "#ffffff" , align: "center" });
		this.hud.anchor.setTo(0.5, 0.5);
	};
	
	this.updatePlayStation = function(score) {
		
		this.hud.text = 'Score: '+score;
	};
	
	this.initLevel = function() {
		this.txt.text = '';
	};
	
	this.stopLevel = function() {
		
		this.bgSky.autoScroll(0, 0);
		this.ground.autoScroll(0, 0);
		
		this.audioBg.stop();
		
	};
	
	this.showGameOver = function(score) {
		
		this.gameOverBg = game.add.sprite(game.world.centerX, game.world.centerY, BG_GAME_OVER);
		this.gameOverBg.anchor.setTo(0.5, 0.5);
		
		var txtScore = game.add.text(game.world.centerX, game.world.centerY + 25, '', {font: "30px Arial", fill: "black" , align: "center"});
		txtScore.anchor.setTo(0.5, 0.5);
		txtScore.text = 'Score: ' + score;
		
		var txtRestart = game.add.text(game.world.centerX, 450, '', {font: "30px Arial", fill: "black" , align: "center"});
		txtRestart.anchor.setTo(0.5, 0.5);
		txtRestart.text = 'Pressione \'R\' para reiniciar';
		
	};

};