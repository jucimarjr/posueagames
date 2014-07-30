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
		this.sprite = this.game.add.sprite(GameOverProperties.x, GameOverProperties.y, 'game-over'); // Carregar bg
		this.sprite.alpha = 0;
		
		var button = this.game.add.button(Config.button.back.x, Config.button.back.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.button.back.anchor.x, Config.button.back.anchor.y);
		
		var button2 = this.game.add.button(Config.button.init.x, Config.button.init.y, 'button-init', this.onNext, this, 1, 0, 1, 0);
		button2.anchor.setTo(Config.button.init.anchor.x, Config.button.init.anchor.y);		
		
		var style = { font: "40px Helvetica", fill: "#ffffff" };
        this.text1 = game.add.text(220, 850, 'Um homem foi encontrado morto..após seu veículo ser atingido por um caminhão...', style);
		this.text1.alpha = 0;
				
		game.add.tween(this.sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text1).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();		
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
		var FadeOut = game.add.tween(this.sprite).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None);
		FadeOut.onComplete.add(function(){
			game.state.start(GameOverProperties.Phase);
		});
		FadeOut.start();		
		game.add.tween(this.text1).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
	},
	onNext: function () {
		"use strict";
		GameOverProperties.StopMusic.stop();	

		var FadeOut = game.add.tween(this.sprite).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None);
		FadeOut.onComplete.add(function(){
			game.state.start('Menu');
		});
		FadeOut.start();
		game.add.tween(this.text1).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();				
	}	
};