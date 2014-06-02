/*global State, Config, Phaser*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
	preload: function () {
		"use strict";
		this.load.tilemap('stage', Config.game.mapLevel1.dir, null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tiles', Config.game.mapLevel1.tileset);
	},
	create: function () {
		"use strict";
		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = Config.game.gravity;
		
		this.map = this.game.add.tilemap('stage');
		this.map.addTilesetImage('world 1-1','tiles');
	
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
	},
	update: function () {
		"use strict";
	}
};