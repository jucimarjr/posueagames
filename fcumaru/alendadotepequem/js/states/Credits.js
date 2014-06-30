/*global State, Config, Phaser*/

State.Credits = function (game) {
	"use strict";
	this.game = game;
};
State.Credits.prototype = {
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		var background = this.game.add.sprite(Config.menu.x, Config.menu.y, 'menu-background');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);
		
		var text = "Universidade do Estado do Amazonas\n" +
					"Escola Superior de Tecnologia\n" +
					"Especialização em Desenvolvimento de Jogos Eletrônicos\n" +
					"\n" +
					"Designer:\n" +
					"Antonio Felipe Cumaru\n" +
					"\n" +
					"Programadores:\n" +
					"Bruno Araújo\n" +
					"Cristina Araújo\n" +
					"Daniel Frazão\n" +
					"Gustavo Miyamoto\n" +
					"\n" +
					"Orientador:\n" + 
					"Prof.Dr. Jucimar Maia da Silva Jr";
	    var style = { font: "16px Arial", fill: "#ffffff", align: "center" };

		var t = game.add.text(game.world.centerX - 200, game.world.centerY - 50, text, style);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.game.state.start('Menu');
		}
	},
	onClick: function () {
		"use strict";
		this.game.state.start('Menu');
	}
};
