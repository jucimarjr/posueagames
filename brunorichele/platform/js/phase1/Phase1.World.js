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
	init : function(){
		this.game.load.image('bgphase1', this.bgImage);
		this.game.load.image('bgphase1-alpha', this.bgImageAlpha);
		this.game.load.audio('bgmusic', this.bgAudio);
	},
	createBg : function(){
		this.game.world.setBounds(0, 0, this.weith, this.height);
		this.game.physics.startSystem(Phaser.Physics.NINJA);
		
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