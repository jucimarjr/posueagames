/*global Config*/

var PowerLifes = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.group = null;
};
PowerLifes.prototype = {
	create: function () {
		"use strict";
		this.group = game.add.group();
		this.group.enableBody = true;
		this.tilemap.map.createFromObjects(Config.tilemap.tiles.powerlifes.name, Config.tilemap.tiles.powerlifes.gid, 'powerlife', Config.tilemap.tiles.powerlifes.frame,true,false,this.group);
		this.group.forEach(function (powerlife){ powerlife.body.allowGravity = false;}, this);
	}
};