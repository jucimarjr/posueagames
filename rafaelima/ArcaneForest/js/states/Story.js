/*global setTimeout, Config, Phaser*/

State.Story = function (game) {
	"use strict";
	this.game = game;
};

State.Story.prototype = {
		
	preload: function () {
		"use strict";
		
	},
	
	create: function () {
		"use strict";
		
		var sprite = this.game.add.sprite(Config.story.x, Config.story.y, Config.story.key);
		
		setTimeout(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.story.alphaTime, Phaser.Easing.Linear.None).start();
		}, Config.story.alphaWait);
		
		setTimeout(function () {
			this.game.state.start('Game');
		}, Config.story.nextStateWait);
		
	},
	
	update: function () {
		"use strict";
		
		//Config.global.screen.resize(this.game);
		
		
	}
};