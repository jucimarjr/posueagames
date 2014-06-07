/*global Config*/

var Jason = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.jasons = null;
};
Jason.prototype = {
	create: function () {
		"use strict";
		this.jasons = game.add.group();
		this.jasons.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.jason.name, Config.enemy.jason.walk.gid, 'jason', Config.enemy.jason.walk.frame,true,false,this.jasons);
		this.tilemap.map.createFromObjects(Config.enemy.jason.name, Config.enemy.jason.jump.gid, 'jason', Config.enemy.jason.jump.frame,true,false,this.jasons);
		this.jasons.forEach(function (jason){ jason.body.allowGravity = false;}, this);
	}
};