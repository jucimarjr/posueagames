/*global Config, Phaser*/

var Level1 = function (game) {
	"use strict";
	this.game = game;
	this.background = null;
};
Level1.prototype = {
	create: function () {
		"use strict";
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = Config.game.gravity;
		this.game.stage.smoothed = false;
		this.game.world.setBounds(Config.level1.worldBounds.xi, Config.level1.worldBounds.yi, Config.level1.worldBounds.xf, Config.level1.worldBounds.yf);
		this.game.physics.arcade.checkCollision.up = false;
		this.background = this.game.add.tileSprite(Config.level1.x, Config.level1.y, Config.global.screen.width, Config.global.screen.height, 'game-background');
		this.background.fixedToCamera = true;
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};