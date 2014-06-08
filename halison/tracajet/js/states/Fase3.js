
State.Fase3= function (game) {
	"use strict";
	this.game = game;
	this.map;
};


State.Fase3.prototype = {

	preload: function () {

	},

	create: function () {
	    game.stage.backgroundColor = '#2d2d2d';
	    this.map = game.add.tilemap();
	    //  In this case the map is 40x40 tiles in size and the tiles are 32x32 pixels in size.
	    layer1 = map.create('level1', 40, 40, 32, 32);
	    layer1.scrollFactorX = 0.5;
	    layer1.scrollFactorY = 0.5;
	    layer1.resizeWorld();
	},


	update: function () {
	}

};


