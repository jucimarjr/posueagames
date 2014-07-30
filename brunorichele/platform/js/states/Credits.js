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
		this.background = this.game.add.sprite(CreditsProperties.x, CreditsProperties.y, 'credits');
		this.background.alpha = 0;
				
		var button = this.game.add.button(Config.button.back.x, Config.button.back.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.button.back.anchor.x, Config.button.back.anchor.y);
		
		var style = { font: "40px Helvetica", fill: "#ffffff" };
		this.text1 = game.add.text(880, 200, 'Créditos', style);
		this.text1.alpha = 0;
        this.text2 = game.add.text(590, 300, 'Universidade do Estado do Amazonas', style);
		this.text2.alpha = 0;
        this.text3 = game.add.text(650, 350, 'Escola Superior de Tecnologia', style);	
		this.text3.alpha = 0;
		this.text4 = game.add.text(450, 400, 'Especialização em Desenvolvimento de Jogos Eletrônicos', style);
		this.text4.alpha = 0;
		
        game.add.text(880, 500, 'Design', style);
		game.add.text(830, 550, 'Bruno Richele', style);	
		
        game.add.text(850, 650, 'Programação', style);
		game.add.text(860, 700, 'Diego Nobu', style);
		game.add.text(830, 750, 'Raymundo Junior', style);
		
		this.text5 = game.add.text(850, 850, 'Orientação', style);
		this.text5.alpha = 0;
		this.text6 = game.add.text(650, 900, 'Prof.Dr. Jucimar Maia da Silva Jr', style);		
		this.text6.alpha = 0;	
		
		game.add.tween(this.background).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();		
		game.add.tween(this.text1).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();	
		game.add.tween(this.text2).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();	
		game.add.tween(this.text3).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text4).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text5).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text6).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();			
	},
	update: function () {
		"use strict";
		Config.screen.resize(this.game);
	},
	onBack: function () {
		"use strict";
		var FadeOut = game.add.tween(this.background).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None);
		FadeOut.onComplete.add(function(){
			game.state.start('Menu');
		});
		FadeOut.start();
		game.add.tween(this.text1).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();	
		game.add.tween(this.text2).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();	
		game.add.tween(this.text3).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text4).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text5).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text6).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();		
	}	
};

State.Credits = function (game) {
	"use strict";
	this.game = game;
};
State.Credits.prototype = Credits.prototype;