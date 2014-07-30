var Phase3 = {}

Phase3.World = {
    mymap : null,
    background : null,
    foreground : null,
    init : function() {
        this.game.load.image('bg1fase3', 'assets/phase3/map/bg1fase3_8000-1080.jpg');
        this.game.load.image('bg2fase3', 'assets/phase3/map/bg2fase3_8000-1080.png');
        this.game.load.tilemap('map3', 'assets/phase3/map.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.audio('musicphase3', "assets/audio/Hospital.mp3");
    },
    createWorld : function() {
        this.game.world.setBounds(0, 0, 8000, 1080);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1000;
        this.game.physics.p2.restitution = 0;
        this.game.world.enableBodySleeping=true;
		
		this.verify = null;

        this.mymap = this.game.add.tilemap('map3');
        mapLayer = this.mymap.createLayer('map');
    },
    createBackground : function() {
        this.background = this.game.add.sprite(0, 0, 'bg1fase3');
		this.background.alpha = 0;
        //this.game.stage.backgroundColor = '#007236';
    },
    createForeground : function() {
        this.foreground = this.game.add.sprite(0, 0, 'bg2fase3');
    },
	createSound : function(){
		this.bgmusic = this.game.add.audio('musicphase3');
        this.bgmusic.play('', 0, 1, true);	
		
		return this.bgmusic;
	},
    createObjects : function() {
    },
    collision : function() {
        groundLayer = this.game.physics.p2.convertCollisionObjects(this.mymap, 'ground');
    },
    collisionHole : function(player, music){
        if (player.player.x > 7397 && (player.player.y > 230 && player.player.y < 360) && this.verify == null){
			this.verify = "entrou";
			console.log("entrou")
			player.player.kill();
			this.porta = this.game.add.audio('music-porta');
        	this.porta.play();
			music.stop();
			document.getElementById('game').style.display = 'none';
			document.getElementById('container_video').style.display = 'block';	
			var video = document.getElementById('example_video_1');		
			video.onended = function(e) {
    			game.state.start('Menu');
				document.getElementById('game').style.display = 'block';
				document.getElementById('container_video').style.display = 'none';	
    		};	
			video.play();
        }
    }
}