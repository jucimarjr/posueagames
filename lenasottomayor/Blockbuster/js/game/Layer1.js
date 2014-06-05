/*global Config*/

var Layer1 = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.mainLayer = null;
};
Layer1.prototype = {
	create: function () {
		"use strict";
		this.tilemap.map.addTilesetImage(Config.layer.tileset, 'tiles');
		this.mainLayer = this.tilemap.map.createLayer(Config.layer.name);
		this.tilemap.map.setCollision([13,22],true, Config.layer.name);
		//this.tilemap.map.setCollisionBetween(25,30, true, Config.layer.name);
		//this.mainLayer.resizeWorld();
	}
};