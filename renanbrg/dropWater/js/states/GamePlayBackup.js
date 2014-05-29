State.Gameplay = function (game) {
	"use strict";
	this.game = game;
    this.bg = null;
    this.map = null;
    this.layer = null;
    this.player = null;

};
State.Gameplay.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('gameplay-bg',  Config.gamePlay.dir);
		
	},
	create: function () {
		"use strict";
		var background; 
		background = this.game.add.image(Config.gamePlay.x, Config.gamePlay.y, 'gameplay-bg');
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	clickPlay: function () {
		"use strict";
		//this.game.state.start('Game');
	},
	clickHowToPlay: function () {
		"use strict";
		this.game.state.start('HowToPlay');
	},
	clickCredits: function () {
		"use strict";
		this.game.state.start('Credits');
	}
};