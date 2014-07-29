State.Phase3 = function(game) {
    this.game = game;
    this.player = new Player(game);
}

State.Phase3.prototype = {
    preload : function() {
    },
    create : function() {
        Phase3.World.createWorld();
        Phase3.World.createBackground();
        this.player.create(/*500*/7140, 750);
        this.player.player.body.mass = 100;
        Phase3.World.createObjects();
        Phase3.World.createForeground();
		GameOverProperties.StopMusic = Phase3.World.createSound();

        Phase3.World.collision();

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.control = new Control(this.game, this.player, this.cursors);
    },
    update : function() {
        this.control.update();
		Phase3.World.collisionHole(this.player,Phase3.World.bgmusic);//Gambi: modificar se possível
    },
    changeFinal : function() {
		Phase3.World.bgmusic.stop();
    }
}