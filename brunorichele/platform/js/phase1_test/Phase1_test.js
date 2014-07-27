State.Phase1_test = function(game) {
    this.game = game;
    this.player = new Player(game);
}

State.Phase1_test.prototype = {
    preload : function() {
    },
    create : function() {
        Phase1_test.World.createWorld();
        Phase1_test.World.createBackground();
        this.player.create(50, 1600);
        this.player.player.body.mass = 100;
        Phase1_test.World.createObjects();
        Phase1_test.Trap.createTrap(Phase1_test.World.mymap)
        Phase1_test.World.createForeground();

        Phase1_test.World.collision();

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.control = new Control(this.game, this.player, this.cursors);
    },
    update : function() {
        this.control.update();
    }
}