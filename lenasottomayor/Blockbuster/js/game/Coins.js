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
		this.tilemap.map.createFromObjects(Config.coins.name, Config.coins.gid, 'coin', Config.coins.frame,true,false,this.group);
		this.group.forEach(function (coin){ coin.body.allowGravity = false;}, this);
	}
};