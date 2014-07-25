State.Phase3 = function(game) {
    this.game = game;
    this.player = new Player(game);
}

State.Phase3.prototype = {
    preload : function() {
    },
    create : function() {
        Phase3.World.createBackground();
        this.player.create(500, 750);
        this.player.player.body.mass = 100;
        //Phase3.World.createForeground();

        Phase3.World.collision(this.player.player);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.control = new Control(this.game, this.player, this.cursors);
    },
    update : function() {
        this.control.update();
    }
}