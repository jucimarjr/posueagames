State.Phase3 = function(game) {
    this.game = game,
    this.player = new Player(game),
    this.worms = worm,
    this.finalDoor = new FinalDoor(game),
    this.spikes = new Spikes(game);
}

State.Phase3.prototype = {
    preload : function() {
    },
    create : function() {
        Phase3.World.createWorld();
        Phase3.World.createBackground();
        this.player.create(500/*7140*/, 750/*240*/);
        this.player.player.body.mass = 100;
        this.spikes.create(Phase3.World.mymap, SpikeState.TWEEN);
        this.worms.create(Phase3.World.mymap);
        this.finalDoor.create(this, 7450, 280);
        Phase3.World.createObjects();
        Phase3.World.createForeground();
		if(GameOverProperties.StopMusic == null){
			GameOverProperties.StopMusic = Phase3.World.createSound();
		}

        Phase3.World.collision();

        this.cursors = this.game.input.keyboard.createCursorKeys();
		this.KeyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.control = new Control(this.game, this.player, this.cursors, this.KeyA);
		
		game.add.tween(Phase3.World.background).to( { alpha: 1 }, 6000, Phaser.Easing.Linear.None).start();		
    },
    update : function() {
        this.control.update();
        this.spikes.update(this.player);
        this.worms.update(this.player);
        this.finalDoor.update(this.player, 7320, 240);
    },
    changeLevel : function() {
			this.porta = this.game.add.audio('music-porta');
        	this.porta.play();
			Phase3.World.bgmusic.stop();

		var FadeOut = game.add.tween(Phase3.World.background).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None);
		FadeOut.onComplete.add(function(){
			document.getElementById('game').style.display = 'none';
			document.getElementById('container_video').style.display = 'block';	
			var video = document.getElementById('example_video_1');		
			video.onended = function(e) {
    			game.state.start('Menu');
				document.getElementById('game').style.display = 'block';
				document.getElementById('container_video').style.display = 'none';	
    		};	
			video.play();
		});
		FadeOut.start();					
	}
}