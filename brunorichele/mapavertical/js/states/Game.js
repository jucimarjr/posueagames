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
        map.addTilesetImage('tileset', 'tileset');

        var layer = map.createLayer('Camada de Tiles 1');
        layer.resizeWorld();
    },
    update: function(){
        "use strict";
        Config.global.screen.resize(this.game);
    }
}