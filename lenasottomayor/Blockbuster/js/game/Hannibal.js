/*global Config*/

var Hannibal = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.hannibals = null;
};
Hannibal.prototype = {
	create: function () {
		"use strict";
		this.hannibals = game.add.group();
		this.hannibals.enableBody = true;
		this.tilemap.map.createFromObjects(Config.enemy.hannibal.name, Config.enemy.hannibal.walk.gid, 'hannibal', Config.enemy.hannibal.walk.frame,true,false,this.hannibals);
		this.tilemap.map.createFromObjects(Config.enemy.hannibal.name, Config.enemy.hannibal.jump.gid, 'hannibal', Config.enemy.hannibal.jump.frame,true,false,this.hannibals);
		this.hannibals.forEach(function (hannibal){ hannibal.body.allowGravity = false;}, this);
	}
};