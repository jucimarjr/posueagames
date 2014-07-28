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
        this.game.load.spritesheet('door', 'assets/phase1/images/door_4320-255-32.png', 135, 255);
        this.game.load.spritesheet('smoke_test', 'assets/phase1/images/smoke_12000-300-4.png', 3000, 300);
        this.game.load.tilemap('map1_test', 'assets/phase1/map.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.audio('bgmusic', "assets/audio/light_the_way_mixdown.mp3");
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
    },
    createForeground : function() {
        this.foreground = this.game.add.sprite(0, 0, 'bg2fase1_test');

        this.alpha = this.game.add.sprite(0, 0, 'bg2fase1_test');
		
        /*this.smoke = this.game.add.sprite(0, 1700, 'smoke_test');
        this.smoke.animations.add('show', [0, 1, 2, 3], 10, true);
        this.smoke.animations.play('show');*/
    },
	createSound : function(){
		this.bgmusic = this.game.add.audio('bgmusic');
        this.bgmusic.play('', 0, 1, true);	
		
		return this.bgmusic;
	},	
    createObjects : function() {
        door = this.game.add.sprite(2670, 140, 'door');
        door.animations.add('default', [0, 1, 2, 3, 4, 5]);
        finishAnim = door.animations.add('finish', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
        finishAnim.onStart.add(this.finishAnimStart, this);
        finishAnim.onComplete.add(this.finishAnimComplete, this);

        door.animations.play('default', 6, true);
    },
    collision : function(player) {
        groundLayer = this.game.physics.p2.convertCollisionObjects(this.mymap, 'ground');
    },
    update : function(player) {
        if (this.checkFinish(player.player, door)) {
            console.log('terminou!!!');
            player.player.kill();
            player.player.reset(3000, 0);
            door.animations.stop();
            door.animations.play('finish', 6, true);
        }
    },
    checkFinish : function(player, door) {
        var playerBounds = player.getBounds();
        var doorBounds = door.getBounds();
        return Phaser.Rectangle.intersects(playerBounds, doorBounds);
    },
    finishAnimStart : function(sprite, animation) {
        animation.loop = false;
    },
    finishAnimComplete : function(sprite, animation) {
        console.log('muda de fase');
    }
}