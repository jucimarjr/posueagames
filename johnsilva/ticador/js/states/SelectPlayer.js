/*global State, Config*/

SelectPlayer = function (game) {
	"use strict";
	this.game = game;
};

SelectPlayer.prototype = {
	show: function () {
	},
	restart: function(){
		this.game.state.start('GamePlay');
	}
};