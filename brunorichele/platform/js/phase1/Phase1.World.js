var Phase1 = {};
Phase1.World = {
	bgImage : "assets/phase1/images/bg1_3000-2000.jpg",
	//bgImage : "assets/phase1/images/cenariogameguia.jpg",
	bgImageAlpha : "assets/phase1/images/bg2_3000-2000.png",
	bgAudio : "assets/phase1/audio/light_the_way_mixdown.mp3",	 											
	weith : 3000,
	height : 2000,
	x : 0,
	y : 0,
	background : null,
	backgroundAlpha : null,
	bgmusic : null,	
	init : function(){
		this.game.load.image('bgphase1', this.bgImage);
		this.game.load.image('bgphase1-alpha', this.bgImageAlpha);
		this.game.load.audio('bgmusic', this.bgAudio);
		this.game.load.physics('physicsDataTraps', 'assets/phase1/map/traps.json');
		this.game.load.physics('physicsDataRocks', 'assets/phase1/map/rocks.json');		
	},
	createBg : function(){
		this.game.world.setBounds(0, 0, this.weith, this.height);
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.gravity.y = 850;
		this.game.physics.p2.restitution = 0;
		
		game.physics.p2.setImpactEvents(true);

		this.background = this.game.add.tileSprite(this.x, this.y, this.weith, this.height, 'bgphase1');
		
		return this.background;	
	},	
	createBgAlpha : function(){
		this.backgroundAlpha = this.game.add.sprite(this.x, this.y, 'bgphase1-alpha');
		
		return this.backgroundAlpha;	
	},	
	createSound : function(){
		this.bgmusic = this.game.add.audio('bgmusic');
        this.bgmusic.play('', 0, 1, true);	
		
		return this.bgmusic;
	}			
};