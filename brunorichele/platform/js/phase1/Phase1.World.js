var Phase1 = {};
Phase1.World = {
	bgImage : "assets/phase1/images/bg1_3000-2000.jpg",
	//bgImage : "assets/phase1/images/cenariogameguia.jpg",
	bgImageAlpha : "assets/phase1/images/bg2_3000-2000.png",
	bgAudio : "assets/phase1/audio/In_my_own_place.mp3",	 											
	weith : 3000,
	height : 2000,
	x : 0,
	y : 0,
	background : null,
	backgroundAlpha : null,
	bgmusic : null,	
	init : function(game){
		game.load.image('bgphase1', this.bgImage);
		game.load.image('bgphase1-alpha', this.bgImageAlpha);
		game.load.audio('bgmusic', this.bgAudio);
	},
	createBg : function(game){
		game.world.setBounds(0, 0, this.weith, this.height);
        game.physics.startSystem(Phaser.Game.ARCADE);
		
		this.background = game.add.tileSprite(this.x, this.y, this.weith, this.height, 'bgphase1');
		
		return this.background;	
	},	
	createBgAlpha : function(game){
		this.backgroundAlpha = game.add.sprite(this.x, this.y, 'bgphase1-alpha');
		
		return this.backgroundAlpha;	
	},	
	createSound : function(game){
		this.bgmusic = game.add.audio('bgmusic');
        this.bgmusic.play('', 0, 1, true);	
		
		return this.bgmusic;
	}			
};