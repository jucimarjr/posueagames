/*global Config*/

var Thorns = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.group = null;
};
Thorns.prototype = {
	create: function () {
		"use strict";
		this.group = game.add.group();
		this.group.enableBody = true;
		this.tilemap.map.createFromObjects(Config.tilemap.tiles.thorn.name, Config.tilemap.tiles.thorn.gid, 'thorn', Config.tilemap.tiles.thorn.frame,true,false,this.group);
		this.group.forEach(function (thorn){ thorn.body.allowGravity = false; thorn.body.immovable = true;}, this);
	}
};