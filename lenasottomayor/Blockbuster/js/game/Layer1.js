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
		this.tilemap.map.addTilesetImage(Config.tilemap.tiles.thorn.name, 'thorn');
		
		this.platform = this.tilemap.map.createLayer(Config.tilemap.tiles.tileset.platform);
		this.thorn = this.tilemap.map.createLayer(Config.tilemap.tiles.thorn.thorns);
		
		this.platform.resizeWorld();
		this.thorn.resizeWorld();

		this.tilemap.map.setCollision([2,20,47],true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(5,7, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(10,18, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(22,27, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(31,33, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(35,42, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(49,52, true, Config.tilemap.tiles.tileset.platform);
		this.tilemap.map.setCollisionBetween(55,61, true, Config.tilemap.tiles.tileset.platform);

		this.tilemap.map.setCollision([114],true, Config.tilemap.tiles.thorn.thorns);
	}
};