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

		if (!this.rock.body.touching.right && !this.rock.body.touching.left) {
			this.rock.body.velocity.x = 0;
		}
	},
	checkCollision : function(hero) {
		this.game.physics.arcade.collide(this.rock, hero, this.heroCollision);
	},
	heroCollision : function(rock, hero) {
		rock.body.moves = false;

		// Only hero of power can move the rock
		if (hero.heroType == HERO_OF_POWER &&
		// Only can move the rock when the hero on floor
		hero.body.onFloor() &&
		// Only can move the rock when collide by side
		(rock.body.touching.right || rock.body.touching.left)) {
			rock.body.moves = true;
			rock.body.velocity.x = hero.body.velocity.x * (-1 / 6);
			hero.isPushing = true;
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

		this.pop(1680, 2220);
		this.pop(2520, 2160);
		this.pop(3720, 1800);
		this.pop(660, 420);
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
	checkCollision : function(heroes) {
		for (var i = 0; i < this.values.length; i++) {
			for (var j = 0; j < heroes.size(); j++) {
				this.values[i].checkCollision(heroes.getHero(j));
			}
		}
	}
};