// Main game state

State.Game = function (game){
    "use strict";
    this.game = game;
}

State.Game.prototype = {
    preload: function () {
        "use strict"; 
    },
    create: function() {
        "use strict";
        var map = game.add.tilemap('tilemap');
        // ordem correta: nome do tileset no Tiled, nome do asset no Phaser
        // nesse caso o nome do tileset é texturebreakout, e o nome do assed é tileset
        map.addTilesetImage('texturebreakout', 'tileset');
        var layer = map.createLayer('Camada de Tiles 1');
        layer.resizeWorld();
    },
    update: function(){
        "use strict";
        Config.global.screen.resize(this.game);
    }
}