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
		this.mainLayer.resizeWorld();
		this.tilemap.map.setCollisionByExclusion([0], Config.layer.name);
	}
};