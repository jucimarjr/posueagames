/*global Config*/

var Vader = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.vaders = null;
};
Vader.prototype = {
	create: function () {
		"use strict";
		this.vaders = game.add.group();
		this.vaders.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.vader.name, Config.enemy.vader.gid, 'vader', Config.enemy.vader.frame,true,false,this.vaders);
		this.vaders.forEach(function (vader){ vader.body.allowGravity = false;}, this);
	}
};