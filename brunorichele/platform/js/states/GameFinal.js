/*global setTimeout, State, Config, Phaser*/
var GameFinalProperties = {
	background: 'assets/images/finalgame_1920-1080.jpg',
	x: 0,
	y: 0
};

State.GameFinal = function (game) {
	"use strict";
	this.game = game;
};
State.GameFinal.prototype = {
	preload: function () {
		"use strict";
		var sprite = this.game.add.sprite(GameFinalProperties.x, GameFinalProperties.y, 'game-final'); // Carregar bg
		
		var button = this.game.add.button(Config.menu.buttonBack.x, Config.menu.buttonBack.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.menu.buttonBack.anchor.x, Config.menu.buttonBack.anchor.y);
		
		var button2 = this.game.add.button(Config.menu.buttonInit.x, Config.menu.buttonInit.y, 'button-init', this.onNext, this, 1, 0, 1, 0);
		button2.anchor.setTo(Config.menu.buttonInit.anchor.x, Config.menu.buttonInit.anchor.y);		
		
		var style = { font: "40px Helvetica", fill: "#ffffff" };
        game.add.text(500, 850, 'Finalmente uma saída, há luz muito forte vindo dela...', style);
        game.add.text(700, 900, 'Talvez eu consiga alguma ajuda...', style);
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.screen.resize(this.game);
	},
	onBack: function () {
		"use strict";
		this.game.state.start('Game');
	},
	onNext: function () {
		"use strict";
		this.game.state.start('Menu');
	}	
};