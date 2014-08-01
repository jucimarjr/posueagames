
State.Game = function (game) {
	"use strict";
	this.game = game;	
	this.player = new Curumim.Player(game);
	this.phase = new Curumim.Phase1(game, this.endOfPhaseEvent);
	
};
State.Game.prototype = {
	preload: function () {
		"use strict";
		
	},

	create: function () {
		"use strict";

		this.game.physics.startSystem(Phaser.Game.ARCADE);
 		this.game.physics.arcade.gravity.y = Config.game.gravity;

 		this.phase.create();
		this.player.create();
	},

	update: function () {
		"use strict";		

		Config.global.screen.resize(this.game);
		
		this.phase.update();
		this.player.update();
	},

	endOfPhaseEvent: function(phaseNumber) 
	{
		alert(phaseNumber);
	}
};