/*global setTimeout, State, Config, Phaser*/
var GameOverProperties = {
	background: 'assets/images/gameover_1920-1080.jpg',
	x: 0,
	y: 0,
	Phase : null,
	StopMusic : null
};

State.GameOver = function (game) {
	"use strict";
	this.game = game;
};
State.GameOver.prototype = {
	preload: function () {
		"use strict";
		var sprite = this.game.add.sprite(GameOverProperties.x, GameOverProperties.y, 'game-over'); // Carregar bg
		
		var button = this.game.add.button(Config.button.back.x, Config.button.back.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.button.back.anchor.x, Config.button.back.anchor.y);
		
		var button2 = this.game.add.button(Config.button.init.x, Config.button.init.y, 'button-init', this.onNext, this, 1, 0, 1, 0);
		button2.anchor.setTo(Config.button.init.anchor.x, Config.button.init.anchor.y);		
		
		var style = { font: "40px Helvetica", fill: "#ffffff" };
        game.add.text(330, 850, 'Um homem foi encontrado morto..após seu veículo ser atingido por um caminhão...', style);
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
		GameOverProperties.StopMusic.stop();
		this.game.state.start(GameOverProperties.Phase);
	},
	onNext: function () {
		"use strict";
		GameOverProperties.StopMusic.stop();		
		this.game.state.start('Menu');
	}	
};