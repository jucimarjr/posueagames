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
		this.sprite = this.game.add.sprite(GameIntro1Properties.x, GameIntro1Properties.y, 'game-intro1'); // Carregar bg
		this.sprite.alpha = 0;
		
		var button = this.game.add.button(Config.button.back.x, Config.button.back.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.button.back.anchor.x, Config.button.back.anchor.y);
		
		var button2 = this.game.add.button(Config.button.next.x, Config.button.next.y, 'button-next', this.onNext, this, 1, 0, 1, 0);
		button2.anchor.setTo(Config.button.next.anchor.x, Config.button.next.anchor.y);		
		
		var style = { font: "40px Helvetica", fill: "#ffffff" };
        this.text1 = game.add.text(440, 850, 'Foi tudo muito rápido: Um caminhão apareceu do nada,', style);
		this.text1.alpha = 0;
        this.text2 = game.add.text(340, 900, 'tentei desviar para a calçada e depois do choque tudo ficou escuro.', style);
		this.text2.alpha = 0;
		
		game.add.tween(this.sprite).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text1).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text2).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None).start();			
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
			game.state.start('Menu');
		});
		FadeOut.start();		
		game.add.tween(this.text1).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text2).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();			
	},
	onNext: function () {
		"use strict";
		var FadeOut = game.add.tween(this.sprite).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None);
		FadeOut.onComplete.add(function(){
			game.state.start('GameIntro2');
		});
		FadeOut.start();		
		game.add.tween(this.text1).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
		game.add.tween(this.text2).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();		
	}		
};