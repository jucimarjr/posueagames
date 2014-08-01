
var self;

State.Game = function (game) {
	"use strict";
	this.game = game;	
	this.player = new Curumim.Player(game);
	this.level1 = new Curumim.Level1(game, this.endOfLevelEvent);
	this.level2 = new Curumim.Level2(game, this.endOfLevelEvent);
	this.level3 = new Curumim.Level3(game, this.endOfLevelEvent);
	this.currentLevel = 0;
	this.levels = [this.level1, this.level2, this.level3];
	self = this;
};
State.Game.prototype = {
	preload: function () {
		"use strict";
		
	},

	create: function () {
		"use strict";

		this.game.physics.startSystem(Phaser.Game.ARCADE);
 		this.game.physics.arcade.gravity.y = Config.game.gravity;

 		this.level1.create();
		this.player.create();
	},

	update: function () {
		"use strict";		

		Config.global.screen.resize(this.game);
		
		this.levels[this.currentLevel].update();		
		this.player.update();
	},

	endOfLevelEvent: function(nextLevel) 
	{
		if (nextLevel < Config.game.numberOfLevels)
		{
			self.currentLevel = nextLevel;
			self.levels[nextLevel].create();		
			player.startOfLevel();
			player.bringToFront();
		}
	}
};