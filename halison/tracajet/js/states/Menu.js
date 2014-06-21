/*global State, Config*/

State.Menu = function (game) {
	"use strict";
	this.game = game;
};
State.Menu.prototype = {
	preload: function () {
		"use strict";
		game.load.tilemap('mapa','assets/1aFase/mapaFase1a.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tracajet', Config.game.tracajet.dir, Config.game.tracajet.width,Config.game.tracajet.height);
		game.load.spritesheet('folhas', "assets/1aFase/folhas_120-40.png",40,40);
		game.load.spritesheet('jacare', "assets/1aFase/jacare_spritesheet_800-160.png",80,80);
		game.load.image('bg',Config.game.fase1.background);
		game.load.image('tilesetPlataforma','assets/1aFase/assets_1.png');
		game.load.image('key_8080','assets/1aFase/chave_80-80.png');
		game.load.image('imgLife','assets/tracajet1_20-40.png',20,40);
	},
	create: function () {
		"use strict";
		var background, buttonPlay, buttonCredits, buttonHowToPlay;
		background = this.game.add.sprite(Config.menu.x, Config.menu.y, 'menu-background');
		buttonPlay = this.game.add.button(Config.menu.buttonPlay.x, Config.menu.buttonPlay.y, 'button-play', this.clickPlay, this, 0, 2, 1	);
		buttonPlay.anchor.setTo(Config.menu.buttonPlay.anchor.x, Config.menu.buttonPlay.anchor.y);
		buttonHowToPlay = this.game.add.button(Config.menu.buttonHowToPlay.x, Config.menu.buttonHowToPlay.y, 'button-how-to-play', this.clickHowToPlay, this, 0, 2, 1);
		buttonHowToPlay.anchor.setTo(Config.menu.buttonHowToPlay.anchor.x, Config.menu.buttonHowToPlay.anchor.y);
		buttonCredits = this.game.add.button(Config.menu.buttonCredits.x, Config.menu.buttonCredits.y, 'button-credits', this.clickCredits, this, 0, 2, 1);
		buttonCredits.anchor.setTo(Config.menu.buttonCredits.anchor.x, Config.menu.buttonCredits.anchor.y);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	clickPlay: function () {
		"use strict";
		this.game.state.start('Fase1');
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