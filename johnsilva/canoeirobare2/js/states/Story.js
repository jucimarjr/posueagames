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
		var story1 = this.game.add.sprite(Config.story.x, Config.story.y, 'story1');

		this.game.add.tween(story1).to({alpha:0}, 
			Config.story.millis, Phaser.Easing.Linear.None).start().onComplete.add(function() {

		    var story2 = this.game.add.sprite(Config.story.x, Config.story.y, 'story2');
		    this.game.add.tween(story2).to({alpha:0}, Config.story.millis, 
				Phaser.Easing.Linear.None).start().onComplete.add(function() {
					this.gamePlay();
			}, this);
		}, this);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},

	gamePlay: function(){
		this.game.state.start('GamePlay');
	}
};