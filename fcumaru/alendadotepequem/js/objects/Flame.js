Flame = function(game, index, x, y, direction) {
	"use strict";
	this.game = game;
	this.direction = direction;

	this.x = x;
	this.y = y;

	this.index = index;
	this.key = 'flame';
	this.asset = 'assets/flame_60-60-8.png';
};

Flame.prototype = {
	getSprite : function() {
		return this.flame;
	},
	create : function() {
		"use strict";

		this.flame = this.game.add.sprite(this.x, this.y, this.key, 3);
		this.flame.animations.add('burn', [ 0, 1, 2, 3, 4, 5, 6, 7 ], 10,
				true);

		// permite que a sprite tenha um corpo fisico
		this.game.physics.enable(this.flame, Phaser.Physics.ARCADE);
		this.flame.body.allowGravity = false;

		// para no limite inferio da tela
		this.flame.body.collideWorldBounds = true;
		// diminui o espaco do deslocamento do espelhamento
		this.flame.anchor.setTo(.5, .5);
	},
	update : function(layer) {
		"use strict";

		//this.game.physics.arcade.overlap(layer, this.flame);

		this.flame.animations.play('burn');
	},
	checkCollision : function(hero) {
		if (hero.active) {
			this.game.physics.arcade.overlap(this.flame, hero,
					this.heroCollision);
		}
	},
	heroCollision : function(flame, hero) {
		hero.life--;
	}
};

Flames = function(game) {
	"use strict";
	this.game = game;
	this.values = new Array();
};

Flames.prototype = {
	preload : function() {
		this.game.load.spritesheet('flame', 'assets/flame_60-60-8.png',
				60, 60, 8);
	},
	create : function() {
		"use strict";
		
		this.pop(1770, 1770);
		this.pop(1830, 1770);
		this.pop(1890, 1770);
		this.pop(1950, 1770);
		
		this.pop(2730, 1710);
		this.pop(2790, 1710);
		this.pop(2850, 1710);
		this.pop(2910, 1710);
	},
	update : function(layer) {
		"use strict";

		for (var i = 0; i < this.values.length; i++) {
			this.values[i].update(layer);
		}
	},
	pop : function(x, y, direction) {
		var flame = new Flame(game, this.values.length, x, y, direction);
		this.values.push(flame);

		flame.create();
	},
	checkCollision : function(heroes) {
		for (var i = 0; i < this.values.length; i++) {
			for (var j = 0; j < heroes.size(); j++) {
				this.values[i].checkCollision(heroes.getHero(j));
			}
		}
	}
};