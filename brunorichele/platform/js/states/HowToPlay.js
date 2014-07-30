var HowToPlayProperties = {
	background: 'assets/images/tutorial_1920-1080.jpg',
	x: 0,
	y: 0
};

HowToPlay = function (game) {
	"use strict";
	this.game = game;
};
HowToPlay.prototype = {
	init: function(){
		this.game.load.image('how-to-play', HowToPlayProperties.background);	
	},
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		this.background = this.game.add.sprite(HowToPlayProperties.x, HowToPlayProperties.y, 'how-to-play');
		this.background.alpha = 0;
		
		var button = this.game.add.button(Config.button.back.x, Config.button.back.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.button.back.anchor.x, Config.button.back.anchor.y);
		
		game.add.tween(this.background).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
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
	}
};
State.HowToPlay = HowToPlay;