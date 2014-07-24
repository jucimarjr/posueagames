State.Phase2 = function(game) {
    this.game = game;
    this.player = new Player(game);
}

State.Phase2.prototype = {
    preload : function() {
    },
    create : function() {
        Phase2.World.createBackground();
        this.player.create(150, 870);
        this.player.player.body.mass = 100;
        Phase2.World.createForeground();

        Phase2.World.collision(this.player.player);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.control = new Control(this.game, this.player, this.cursors);
    },
    update : function() {
        this.control.update();
    }
}