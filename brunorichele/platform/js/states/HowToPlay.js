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
		var background = this.game.add.sprite(HowToPlayProperties.x, HowToPlayProperties.y, 'how-to-play');
		var button = this.game.add.button(Config.button.back.x, Config.button.back.y, 'button-back', this.onBack, this, 1, 0, 1, 0);
		button.anchor.setTo(Config.button.back.anchor.x, Config.button.back.anchor.y);
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
State.HowToPlay = HowToPlay;