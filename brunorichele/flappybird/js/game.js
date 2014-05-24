// Wrapping classes in a high-level class for Phaser
var PirarucuDreams = {
    preload : function(){
        preload.init();
    },
    create : function(){
        create.init();
    },
    update : function(){
        update.update();
    }
}

var game = new Phaser.Game(
    960,
    600,
    Phaser.AUTO,
    'phaser-game'
);

game.state.add('menu', menu);
game.state.add('game', PirarucuDreams);
game.state.add('creditos', creditos);
game.state.start('menu');