State.Phase1 = function(game) {
    this.game = game,
    this.player = new Player(game),
    this.door = new Door(game),
    this.hands = new Hands(game);
}

State.Phase1.prototype = {
    preload : function() {
    },
    create : function() {
        Phase1.World.createWorld();
        Phase1.World.createBackground();
        this.player.create(50, 1600);
        this.player.player.body.mass = 100;
        this.hands.create(Phase1.World.mymap);
        this.door.create(this, 2670, 140);
        Phase1.Trap.createTrap(Phase1.World.mymap);
        Phase1.World.createForeground();
		if(GameOverProperties.StopMusic == null){
			GameOverProperties.StopMusic = Phase1.World.createSound();
		}

        Phase1.World.collision();

        this.cursors = this.game.input.keyboard.createCursorKeys();
		this.KeyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.control = new Control(this.game, this.player, this.cursors, this.KeyA);
		
		game.add.tween(Phase1.World.background).to( { alpha: 1 }, 6000, Phaser.Easing.Linear.None).start();
    },
    update : function() {
        this.control.update();
        this.hands.update(this.player);
        this.door.update(this.player, 3000, 0);
        Phase1.Trap.update(this.player);
		Phase1.World.collisionFloor(this.player);
    },
    changeLevel : function() {
		this.porta = this.game.add.audio('music-porta');
		this.porta.play();		
		Phase1.World.bgmusic.stop();		

		var FadeOut = game.add.tween(Phase1.World.background).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None);
		FadeOut.onComplete.add(function(){
			GameOverProperties.StopMusic = null;
        	this.game.state.start('GameIntro3');
		});
		FadeOut.start();
    }
}