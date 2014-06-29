/*global setTimeout, State, Config, Phaser*/
var GameIntro2Properties = {
	background: 'assets/images/introgame2_1920-1080.jpg',
	x: 0,
	y: 0
};

State.GameIntro2 = function (game) {
	"use strict";
	this.game = game;
};
State.GameIntro2.prototype = {
	preload: function () {
		"use strict";
		var sprite = this.game.add.sprite(GameIntro2Properties.x, GameIntro2Properties.y, 'game-intro2'); // Carregar bg
		
		/*var style = { font: "40px Helvetica", fill: "#ffffff" };
        game.add.text(330, 850, 'Um homem foi encontrado morto após seu veículo atingir um caminhão', style);
        game.add.text(620, 900, 'na manhã deste sábado (29/06/2014).', style);*/
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};