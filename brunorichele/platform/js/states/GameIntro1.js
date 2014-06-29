/*global setTimeout, State, Config, Phaser*/
var GameIntro1Properties = {
	background: 'assets/images/introgame1_1920-1080.jpg',
	x: 0,
	y: 0
};

State.GameIntro1 = function (game) {
	"use strict";
	this.game = game;
};
State.GameIntro1.prototype = {
	preload: function () {
		"use strict";
		var sprite = this.game.add.sprite(GameIntro1Properties.x, GameIntro1Properties.y, 'game-intro1'); // Carregar bg
		
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