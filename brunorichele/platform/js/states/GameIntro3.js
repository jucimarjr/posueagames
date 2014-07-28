/*global setTimeout, State, Config, Phaser*/
var GameIntro3Properties = {
	background: 'assets/images/introgamefase2_1920-1080.jpg',
	x: 0,
	y: 0
};

State.GameIntro3 = function (game) {
	"use strict";
	this.game = game;
};
State.GameIntro3.prototype = {
	preload: function () {
		"use strict";
		var sprite = this.game.add.sprite(GameIntro3Properties.x, GameIntro3Properties.y, 'game-intro3'); // Carregar bg
		
		var button = this.game.add.button(Config.button.back.x, Config.button.back.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.button.back.anchor.x, Config.button.back.anchor.y);
		
		var button2 = this.game.add.button(Config.button.next.x, Config.button.next.y, 'button-next', this.onNext, this, 1, 0, 1, 0);
		button2.anchor.setTo(Config.button.next.anchor.x, Config.button.next.anchor.y);		
		
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
		this.game.state.start('Phaser1');
	},
	onNext: function () {
		"use strict";
		GameOverProperties.Phase = 'Phase2';
		this.game.state.start('Phase2');
	}	
};