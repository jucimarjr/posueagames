State.SecondPhase = function (game) {
		"use strict";
		this.game = game;
};
State.SecondPhase.prototype = {
	preload: function () {
		"use strict";
		
	},
	create: function () {
		"use strict";
		
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};