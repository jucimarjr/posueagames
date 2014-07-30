var Phase1 = {};

Phase1.World = {
    mymap : null,
    background : null,
    foreground : null,
    alpha : null,
    smoke : null,
    init : function() {
        this.game.load.image('bg1fase1_test', 'assets/phase1/images/bg1fase1_3000-2000.jpg');
        this.game.load.image('bg2fase1_test', 'assets/phase1/images/bg2fase1_3000-2000.png');
        this.game.load.image('bg3fase1_test', 'assets/phase1/images/bg3fase1_3000-2000.png');
        this.game.load.spritesheet('smoke_test', 'assets/phase1/images/smoke_12000-300-4.png', 3000, 300);
        this.game.load.tilemap('map1_test', 'assets/phase1/map.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.audio('musicphase1', "assets/audio/Spiral.mp3");
    },
    createWorld : function() {
        this.game.world.setBounds(0, 0, 3000, 2000);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1000;
        this.game.physics.p2.restitution = 0;
        this.game.world.enableBodySleeping=true;

        this.mymap = this.game.add.tilemap('map1_test');
    },
    createBackground : function() {
        this.background = this.game.add.sprite(0, 0, 'bg1fase1_test');
		this.background.alpha = 0;
    },
    createForeground : function() {
        this.foreground = this.game.add.sprite(0, 0, 'bg2fase1_test');

        this.alpha = this.game.add.sprite(0, 0, 'bg2fase1_test');
		
        this.smoke = this.game.add.sprite(0, 1700, 'smoke_test');
        this.smoke.animations.add('show', [0, 1, 2, 3], 5, true);
        this.smoke.animations.play('show');
    },
	createSound : function(){
		this.bgmusic = this.game.add.audio('musicphase1');
        this.bgmusic.play('', 0, 1, true);	
		
		return this.bgmusic;
	},	
    createObjects : function() {
    },
    collision : function(player) {
        groundLayer = this.game.physics.p2.convertCollisionObjects(this.mymap, 'ground');
    },
    collisionFloor : function(player){
        if (player.player.y > 1800){
			this.game.state.start('GameOver');		
        }
    },	
    update : function(player) {
    }
}