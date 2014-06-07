/*global Config*/

var Cruella = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.cruellas = null;
};
Cruella.prototype = {
	create: function () {
		"use strict";
		this.cruellas = game.add.group();
		this.cruellas.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.cruella.name, Config.enemy.cruella.walk.gid, 'cruella', Config.enemy.cruella.walk.frame,true,false,this.cruellas);
		this.tilemap.map.createFromObjects(Config.enemy.cruella.name, Config.enemy.cruella.jump.gid, 'cruella', Config.enemy.cruella.jump.frame,true,false,this.cruellas);
		this.cruellas.forEach(function (cruella){ cruella.body.allowGravity = false;}, this);
	}
};