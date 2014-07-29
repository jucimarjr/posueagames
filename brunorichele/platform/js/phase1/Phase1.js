State.Phase1 = function(game) {
    this.game = game;
    this.player = new Player(game);
    this.door = new Door(game);
}

State.Phase1.prototype = {
    preload : function() {
    },
    create : function() {
        Phase1.World.createWorld();
        Phase1.World.createBackground();
        this.player.create(50, 1600);
        this.player.player.body.mass = 100;
        this.door.create(this, 2670, 140);
        Phase1.Trap.createTrap(Phase1.World.mymap)
        //Phase1.Enemy.createEnemy(Phase1.World.mymap);
        Phase1.World.createForeground();
		GameOverProperties.StopMusic = Phase1.World.createSound();

        Phase1.World.collision();

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.control = new Control(this.game, this.player, this.cursors);
    },
    update : function() {
        this.control.update();
        this.door.update(this.player, 3000, 0);
        Phase1.Trap.update(this.player);
		Phase1.World.collisionFloor(this.player);
    },
    changeLevel : function() {
        this.game.state.start('GameIntro3');
		Phase1.World.bgmusic.stop();
    }
}