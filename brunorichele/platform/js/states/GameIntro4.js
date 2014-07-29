/*global setTimeout, State, Config, Phaser*/
var GameIntro4Properties = {
	background: 'assets/images/introgamefase3_1920-1080.jpg',
	x: 0,
	y: 0
};

State.GameIntro4 = function (game) {
	"use strict";
	this.game = game;
};
State.GameIntro4.prototype = {
	preload: function () {
		"use strict";
		var sprite = this.game.add.sprite(GameIntro4Properties.x, GameIntro4Properties.y, 'game-intro4'); // Carregar bg
		
		var button = this.game.add.button(Config.button.back.x, Config.button.back.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.button.back.anchor.x, Config.button.back.anchor.y);
		
		var button2 = this.game.add.button(Config.button.next.x, Config.button.next.y, 'button-next', this.onNext, this, 1, 0, 1, 0);
		button2.anchor.setTo(Config.button.next.anchor.x, Config.button.next.anchor.y);		
		
		var style = { font: "40px Helvetica", fill: "#ffffff" };
        game.add.text(330, 800, 'Corredores que não acabam mais e esse medo que me consome.', style);
        game.add.text(620, 850, 'Para onde eu devo seguir? Como encontrarei respostas?', style);                          
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
		this.game.state.start('Phase2');
	},
	onNext: function () {
		"use strict";
		GameOverProperties.Phase = 'Phase3';
		this.game.state.start('Phase3');
	}	
};