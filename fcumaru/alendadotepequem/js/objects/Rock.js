Rock = function(game, index, x, y) {
	"use strict";
	this.game = game;
	this.direction = Math.round(Math.random());

	this.x = x;
	this.y = y;

	this.index = index;
	this.key = 'rock';
	this.asset = 'assets/rock_120-120.png';
	this.walk = 150;
};

Rock.prototype = {
	getSprite : function() {
		return this.rock;
	},
	create : function() {
		"use strict";

		this.rock = this.game.add.sprite(this.x, this.y, this.key, 3);
		// permite que a sprite tenha um corpo fisico
		this.game.physics.enable(this.rock, Phaser.Physics.ARCADE);

		this.rock.body.acceleration.y = 100;

		// para no limite inferio da tela
		this.rock.body.collideWorldBounds = true;
		// diminui o espaco do deslocamento do espelhamento
		this.rock.anchor.setTo(.5, .5);
		this.rock.body.gravity.y = 150;
	},
	update : function(layer) {
		"use strict";
		this.game.physics.arcade.collide(layer, this.rock);
	},
	checkCollision : function(hero) {
		this.game.physics.arcade.collide(this.rock, hero, this.heroCollision);
	},
	heroCollision : function(rock, hero) {
		rock.body.velocity.x = 0;
		
		// Only hero of power can move the rock
		if (hero.type != HERO_OF_POWER) {
			return;
		}

		// Only can move the rock when the hero on floor
		if (!hero.body.onFloor()) {
			return;
		}

		if (this.rock.body.blocked.right || this.rock.body.blocked.left) {
			rock.body.velocity.x = hero.body.velocity.x;
		}
	}
};

Rocks = function(game) {
	"use strict";
	this.game = game;
	this.values = new Array();
};

Rocks.prototype = {
	preload : function() {
		this.game.load.image('rock', 'assets/rock_120-120.png', 120, 120);
	},
	create : function() {
		"use strict";

		// Do nothing
	},
	update : function(layer) {
		"use strict";

		for (var i = 0; i < this.values.length; i++) {
			this.values[i].update(layer);
		}
	},
	pop : function(x, y) {
		var rock = new Rock(game, this.values.length, x, y);
		this.values.push(rock);

		rock.create();
	},
	checkCollision : function(hero) {
		for (var i = 0; i < this.values.length; i++) {
			this.values[i].checkCollision(hero);
		}
	}
};