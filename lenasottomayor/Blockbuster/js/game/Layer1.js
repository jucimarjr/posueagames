/*global Config*/

var Layer1 = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.platform = null;
	this.thorn = null;
};
Layer1.prototype = {
	create: function () {
		"use strict";
		this.tilemap.map.addTilesetImage(Config.tilemap.tiles.tileset.name, 'tiles');
		
		this.platform = this.tilemap.map.createLayer(Config.tilemap.tiles.tileset.platform);
		this.thorn = this.tilemap.map.createLayer(Config.tilemap.tiles.tileset.thorn);

		this.tilemap.map.setCollisionBetween(1,52, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(54,63, true, Config.tilemap.tiles.tileset.platform);

		this.tilemap.map.setCollision([53],true, Config.tilemap.tiles.tileset.thorn);
	}
};