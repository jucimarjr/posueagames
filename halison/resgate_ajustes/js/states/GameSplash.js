/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};

State.GameSplash.prototype = {
		
	preload: function () {
		"use strict";
		var progressBar = this.game.add.sprite(0, 500, 'progress-bar');
		this.game.load.setPreloadSprite(progressBar);
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-opening', Config.menu.buttonOpening.dir, Config.menu.buttonOpening.width, Config.menu.buttonOpening.height);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.width, Config.menu.buttonPlay.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.width, Config.menu.buttonCredits.height);
		this.game.load.spritesheet('button-how-to-play', Config.menu.buttonHowToPlay.dir, Config.menu.buttonHowToPlay.width, Config.menu.buttonHowToPlay.height);
		this.game.load.onLoadComplete.add(function () {
			setTimeout(function () {this.game.state.start('Menu');
		}, Config.gameSplash.millis);}, this);
		
//		Credits
		this.game.load.image('credits', Config.credits.dir);
		
//		HowToPlay
		this.game.load.image('how-to-play', Config.howToPlay.dir);
		//Game
	},
	create: function () {
		"use strict";
		var txt = "Universidade do Estado do Amazonas\nEscola Superior de Tecnologia\nEspecializacao em Desenvolvimento de Jogos Eletronicos\nIntroducao a Programacao de Jogos Eletronicos\n";
		var text;
		text = game.add.text(game.world.centerX, game.world.centerY, txt, {
	        font: "35px Arial",
	        fill: "#ffff00",
	        align: "center",
	        strokeThickness: 3 
	    });
	    text.anchor.setTo(0.5, 0.5);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};