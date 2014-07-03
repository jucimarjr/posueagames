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
		
		var button = this.game.add.button(Config.menu.buttonBack.x, Config.menu.buttonBack.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.menu.buttonBack.anchor.x, Config.menu.buttonBack.anchor.y);
		
		var button2 = this.game.add.button(Config.menu.buttonNext.x, Config.menu.buttonNext.y, 'button-next', this.onNext, this, 1, 0, 1, 0);
		button2.anchor.setTo(Config.menu.buttonNext.anchor.x, Config.menu.buttonNext.anchor.y);
		
		var style = { font: "40px Helvetica", fill: "#ffffff" };
        game.add.text(330, 800, 'Acordei em um lugar estranho e agora estou em busca de socorro...', style);
        game.add.text(620, 850, 'mas meu corpo todo está escuro e...', style);
		game.add.text(800, 900, '...Quem sou eu?', style);
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
		this.game.state.start('GameIntro1');
	},
	onNext: function () {
		"use strict";
		this.game.state.start('Game');
	}	
};