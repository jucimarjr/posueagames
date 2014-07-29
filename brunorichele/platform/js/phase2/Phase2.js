State.Phase2 = function(game) {
    this.game = game;
    this.player = new Player(game);
    this.door = new Door(game);
}

State.Phase2.prototype = {
    preload : function() {
    },
    create : function() {
        Phase2.World.createWorld();
        Phase2.World.createBackground();
        this.player.create(/*450, 808*/14000, 790);
        this.player.player.body.mass = 100;
        this.door.create(this, 14555, 700);
        Phase2.World.createObjects();
        Phase2.Enemy.createEnemy(Phase2.World.mymap);
        Phase2.World.createForeground();
		GameOverProperties.StopMusic = Phase2.World.createSound();

        Phase2.World.collision();

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.control = new Control(this.game, this.player, this.cursors);
    },
    update : function() {
        this.control.update();
        this.door.update(this.player, 15000, 0);
    },
    changeLevel : function() {
        this.game.state.start('GameIntro4');
		Phase2.World.bgmusic.stop();		
    }
}