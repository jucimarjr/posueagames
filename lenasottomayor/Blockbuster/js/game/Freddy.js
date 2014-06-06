/*global Config*/

var Freddy = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.freddys = null;
};
Freddy.prototype = {
	create: function () {
		"use strict";
		this.freddys = game.add.group();
		this.freddys.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.freddy.name, Config.enemy.freddy.walk.gid, 'freddy', Config.enemy.freddy.walk.frame,true,false,this.freddys);
		this.tilemap.map.createFromObjects(Config.enemy.freddy.name, Config.enemy.freddy.jump.gid, 'freddy', Config.enemy.freddy.jump.frame,true,false,this.freddys);
		this.freddys.forEach(function (freddy){ freddy.body.allowGravity = false;}, this);
	}
};