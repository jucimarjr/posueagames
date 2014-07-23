State.Phase2 = function(game) {
    this.game = game;
    this.player = new Player(game);
}

State.Phase2.prototype = {
    preload : function() {
    },
    create : function() {
        Phase2.World.create();
    },
    update : function() {
    }
}