Portal = function(game) {
	"use strict";
	this.game = game;
	this.direction = Math.round(Math.random());

	this.x = 3840;
	this.y = 480;

	this.key = 'portal';
	this.asset = 'assets/portal_240-120-6.png';
};

Portal.prototype = {
	getSprite : function() {
		return this.portal;
	},
	preload : function() {
		this.game.load.spritesheet(this.key, this.asset, 240, 120, 6);
	},
	create : function() {
		"use strict";

		this.portal = this.game.add.sprite(this.x, this.y, this.key, 3);
		this.portal.animations.add('open', [ 0, 1, 2, 3, 4, 5 ], 10, true);

		// permite que a sprite tenha um corpo fisico
		this.game.physics.enable(this.portal, Phaser.Physics.ARCADE);
		this.portal.body.acceleration.y = 100;

		// para no limite inferio da tela
		this.portal.body.collideWorldBounds = true;
		// diminui o espaco do deslocamento do espelhamento
		this.portal.anchor.setTo(.5, .5);
		this.portal.body.gravity.y = 150;
	},
	open : function() {
		"use strict";

		this.portal.animations.play('open');
	}
};