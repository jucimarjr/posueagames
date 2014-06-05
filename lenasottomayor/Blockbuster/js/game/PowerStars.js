/*global Config*/

var PowerStars = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.group = null;
};
PowerStars.prototype = {
	create: function () {
		"use strict";
		this.group = game.add.group();
		this.group.enableBody = true;
		this.tilemap.map.createFromObjects(Config.tilemap.tiles.powerstars.name, Config.tilemap.tiles.powerstars.gid, 'powerstar', Config.tilemap.tiles.powerstars.frame,true,false,this.group);
		this.group.forEach(function (powerstar){ powerstar.body.allowGravity = false;}, this);
	}
};