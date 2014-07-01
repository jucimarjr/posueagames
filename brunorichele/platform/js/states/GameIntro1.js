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
		
		var button = this.game.add.button(Config.menu.buttonBack.x, Config.menu.buttonBack.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.menu.buttonBack.anchor.x, Config.menu.buttonBack.anchor.y);
		
		var button2 = this.game.add.button(Config.menu.buttonNext.x, Config.menu.buttonNext.y, 'button-next', this.onNext, this, 1, 0, 1, 0);
		button2.anchor.setTo(Config.menu.buttonNext.anchor.x, Config.menu.buttonNext.anchor.y);		
		
		var style = { font: "40px Helvetica", fill: "#ffffff" };
        game.add.text(500, 850, 'Foi tudo muito rápido: Um carro apareceu do nada,', style);
        game.add.text(400, 900, 'tentei desviar para a calçada e depois do choque tudo ficou escuro.', style);
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	onBack: function () {
		"use strict";
		this.game.state.start('Menu');
	},
	onNext: function () {
		"use strict";
		this.game.state.start('GameIntro2');
	}		
};