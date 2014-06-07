/*global Config*/

var Coins = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.group = null;
};
Coins.prototype = {
	create: function () {
		"use strict";
		this.group = game.add.group();
		this.group.enableBody = true;
		this.tilemap.map.createFromObjects(Config.tilemap.tiles.coins.name, Config.tilemap.tiles.coins.gid, 'coin', Config.tilemap.tiles.coins.frame,true,false,this.group);
		this.group.forEach(function (coin){ coin.body.allowGravity = false;}, this);
	}
};