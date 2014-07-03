var CreditsProperties = {
	background: 'assets/images/creditos_1920-1080.jpg',
	x: 0,
	y: 0
};

function Credits(game) {
    this.game = game
};

Credits.prototype = {
	init : function(){
		this.game.load.image('credits', CreditsProperties.background);	
	},
	preload: function () {
		"use strict";	
	},
	create: function () {
		"use strict";
		var background = this.game.add.sprite(CreditsProperties.x, CreditsProperties.y, 'credits');
		var button = this.game.add.button(Config.menu.buttonBack.x, Config.menu.buttonBack.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.menu.buttonBack.anchor.x, Config.menu.buttonBack.anchor.y);
		
		var style = { font: "40px Helvetica", fill: "#ffffff" };
		game.add.text(880, 200, 'Créditos', style);
        game.add.text(590, 300, 'Universidade do Estado do Amazonas', style);
        game.add.text(650, 350, 'Escola Superior de Tecnologia', style);	
		game.add.text(450, 400, 'Especialização em Desenvolvimento de Jogos Eletrônicos', style);
		
        game.add.text(880, 500, 'Design', style);
		game.add.text(830, 550, 'Bruno Richele', style);	
		
        game.add.text(850, 650, 'Programação', style);
		game.add.text(860, 700, 'Diego Nobu', style);
		game.add.text(830, 750, 'Raymundo Junior', style);
		
		game.add.text(850, 850, 'Orientação', style);
		game.add.text(650, 900, 'Prof.Dr. Jucimar Maia da Silva Jr', style);								
	},
	update: function () {
		"use strict";
		Config.screen.resize(this.game);
	},
	onBack: function () {
		"use strict";
		this.game.state.start('Menu');
	}	
};

State.Credits = function (game) {
	"use strict";
	this.game = game;
};
State.Credits.prototype = Credits.prototype;