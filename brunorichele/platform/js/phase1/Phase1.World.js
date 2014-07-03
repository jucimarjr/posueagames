var Phase1 = {};
Phase1.World = {
	bgImage : "assets/phase1/images/bg1_3000-2000.jpg",
	//bgImage : "assets/phase1/images/cenariogameguia.jpg",
	bgImageAlpha : "assets/phase1/images/bg2_3000-2000.png",
	bgAudio : "assets/audio/light_the_way_mixdown.mp3",	 											
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
		this.game.physics.p2.gravity.y = 1000;
		this.game.physics.p2.restitution = 0;
		this.game.world.enableBodySleeping=true;
		
		game.physics.p2.setImpactEvents(true);

		this.background = this.game.add.tileSprite(this.x, this.y, this.weith, this.height, 'bgphase1');
		
		this.definePhysicElement();
		
		return this.background;	
	},	
	createBgAlpha : function(){
		this.backgroundAlpha = this.game.add.sprite(this.x, this.y, 'bgphase1-alpha');
		
		return this.backgroundAlpha;	
	},	
	definePhysicElement : function(){
		rockMaterial = game.physics.p2.createMaterial('rock');
		playerMaterial = game.physics.p2.createMaterial('player');
		enemyMaterial = game.physics.p2.createMaterial('enemy');		
		
		game.physics.p2.createContactMaterial(playerMaterial, rockMaterial, { friction: 2, restitution: 0  });
		game.physics.p2.createContactMaterial(playerMaterial, enemyMaterial, { friction: 0, restitution: 0  });		
		
		playerCG = game.physics.p2.createCollisionGroup();
		rockCG = game.physics.p2.createCollisionGroup();
		enemyCG = game.physics.p2.createCollisionGroup();		
	},
	createSound : function(){
		this.bgmusic = this.game.add.audio('bgmusic');
        this.bgmusic.play('', 0, 1, true);	
		
		return this.bgmusic;
	}			
};