/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
        this.map = null;
};
State.GamePlay.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('gameplay-bg',  Config.gamePlay.dir);
		this.game.load.tilemap('map', 'assets/mapaVertical.json', null, Phaser.Tilemap.TILED_JSON);
	        this.game.load.image('tileset','assets/images/tileset2.png');
	},
	create: function () {
		"use strict";
		var background; 
		background = this.game.add.tileSprite(Config.gamePlay.x, Config.gamePlay.y, 600, 900, 'gameplay-bg');
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tileset','tileset');
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	clickPlay: function () {
		"use strict";
		this.game.state.start('GamePlay');
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
