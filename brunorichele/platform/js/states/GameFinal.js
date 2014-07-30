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
		this.sprite = this.game.add.sprite(GameFinalProperties.x, GameFinalProperties.y, 'game-final'); // Carregar bg
		this.sprite.alpha = 0;		
		
		var button = this.game.add.button(Config.button.back.x, Config.button.back.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.button.back.anchor.x, Config.button.back.anchor.y);
		
		var button2 = this.game.add.button(Config.button.init.x, Config.button.init.y, 'button-init', this.onNext, this, 1, 0, 1, 0);
		button2.anchor.setTo(Config.button.init.anchor.x, Config.button.init.anchor.y);		
		
		var style = { font: "40px Helvetica", fill: "#ffffff" };
        this.text1 = game.add.text(500, 850, 'Finalmente uma saída, há luz muito forte vindo dela...', style);
		this.text1.alpha = 0;		
        this.text2 = game.add.text(700, 900, 'Talvez eu consiga alguma ajuda...', style);
		this.text2.alpha = 0;		
		
		game.add.tween(this.sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text1).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text2).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();			
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
			game.state.start('Phase3');
		});
		FadeOut.start();		
		game.add.tween(this.text1).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text2).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();			
	},
	onNext: function () {
		"use strict";
		var FadeOut = game.add.tween(this.sprite).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None);
		FadeOut.onComplete.add(function(){
			game.state.start('Menu');
		});
		FadeOut.start();		
		game.add.tween(this.text1).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text2).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();			
	}	
};