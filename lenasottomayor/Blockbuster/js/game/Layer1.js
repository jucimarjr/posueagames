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
		this.tilemap.map.setCollision([2,10,12,20,22,25,27,47,49,51,60],true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(5,7, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(12,13, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(17,18, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(31,33, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(35,42, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(55,58, true, Config.tilemap.tiles.tileset.platform);

		this.tilemap.map.setCollision([53],true, Config.tilemap.tiles.tileset.thorn);
	}
};