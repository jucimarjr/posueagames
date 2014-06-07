/*global Config*/

var Joker = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.jokers = null;
};
Joker.prototype = {
	create: function () {
		"use strict";
		this.jokers = game.add.group();
		this.jokers.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.joker.name, Config.enemy.joker.walk.gid, 'joker', Config.enemy.joker.walk.frame,true,false,this.jokers);
		this.tilemap.map.createFromObjects(Config.enemy.joker.name, Config.enemy.joker.jump.gid, 'joker', Config.enemy.joker.jump.frame,true,false,this.jokers);
		this.jokers.forEach(function (joker){ joker.body.allowGravity = false;}, this);
	}
};