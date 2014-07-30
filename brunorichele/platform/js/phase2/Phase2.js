State.Phase2 = function(game) {
    this.game = game,
    this.player = new Player(game),
    this.skull = skull,
    this.spikes = new Spikes(game),
    this.door = new Door(game);
}

State.Phase2.prototype = {
    preload : function() {
    },
    create : function() {
        Phase2.World.createWorld();
        Phase2.World.createBackground();
        this.player.create(450, 808/*14000, 790*/);
        this.player.player.body.mass = 100;
        this.skull.create(Phase2.World.mymap);
        this.spikes.create(Phase2.World.mymap);
        this.door.create(this, 14555, 700);
        Phase2.World.createObjects();
        Phase2.World.createForeground();
		if(GameOverProperties.StopMusic == null){
			GameOverProperties.StopMusic = Phase2.World.createSound();
		}

        Phase2.World.collision();

        this.cursors = this.game.input.keyboard.createCursorKeys();
		this.KeyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.control = new Control(this.game, this.player, this.cursors, this.KeyA);
		
		game.add.tween(Phase2.World.background).to( { alpha: 1 }, 6000, Phaser.Easing.Linear.None).start();
    },
    update : function() {
        this.control.update();
        this.skull.update(this.player);
        this.spikes.update(this.player);
        this.door.update(this.player, 15000, 0);
    },
    changeLevel : function() {
		this.porta = this.game.add.audio('music-porta');
        this.porta.play();
		Phase2.World.bgmusic.stop();
				
		var FadeOut = game.add.tween(Phase2.World.background).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None);
		FadeOut.onComplete.add(function(){
			GameOverProperties.StopMusic = null;
			this.game.state.start('GameIntro4');
		});
		FadeOut.start();					
    }
}