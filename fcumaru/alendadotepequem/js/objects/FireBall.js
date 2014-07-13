FireBall = function(game, index, x, y, direction) {
	"use strict";
	this.game = game;
	this.direction = direction;

	this.x = x;
	this.y = y;

	this.index = index;
	this.key = 'fireball';
	this.asset = 'assets/fireball_60-60-8.png';
	this.walk = 150;
};

FireBall.prototype = {
	getSprite : function() {
		return this.fireball;
	},
	create : function() {
		"use strict";

		this.fireball = this.game.add.sprite(this.x, this.y, this.key, 3);
		this.fireball.animations.add('walk', [ 0, 1, 2, 3, 4, 5, 6, 7 ], 10,
				true);

		// permite que a sprite tenha um corpo fisico
		this.game.physics.enable(this.fireball, Phaser.Physics.ARCADE);
		this.fireball.body.acceleration.y = 100;

		// para no limite inferio da tela
		this.fireball.body.collideWorldBounds = true;
		// diminui o espaco do deslocamento do espelhamento
		this.fireball.anchor.setTo(.5, .5);
		this.fireball.body.gravity.y = 150;
	},
	update : function(layer) {
		"use strict";

		this.game.physics.arcade.collide(layer, this.fireball);

		this.fireball.animations.play('walk');

		if (this.fireball.body.onFloor()) {
			if (this.fireball.body.blocked.left) {
				this.direction = RIGHT;
				this.fireball.damage(1);
			} else if (this.fireball.body.blocked.right) {
				this.direction = LEFT;
				this.fireball.damage(1);
			}

			if (this.direction == LEFT) {
				// vai para esquerda
				this.fireball.body.velocity.x = -this.walk;
				this.fireball.scale.x = -1; // espelha se antes -1
			} else {
				// vai para direita
				this.fireball.body.velocity.x = this.walk;
				this.fireball.scale.x = 1; // espelha se antes 1
			}
		}
	},
	checkCollision : function(hero) {
		if (hero.active) {
			this.game.physics.arcade.overlap(this.fireball, hero,
					this.heroCollision);
		}
	},
	heroCollision : function(fireball, hero) {
		hero.life--;
	}
};

FireBalls = function(game) {
	"use strict";
	this.game = game;
	this.values = new Array();
};

FireBalls.prototype = {
	preload : function() {
		this.game.load.spritesheet('fireball', 'assets/fireball_60-60-8.png',
				60, 60, 8);
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
	pop : function(x, y, direction) {
		var fireball = new FireBall(game, this.values.length, x, y, direction);
		this.values.push(fireball);

		fireball.create();
	},
	checkCollision : function(heroes) {
		for (var i = 0; i < this.values.length; i++) {
			for (var j = 0; j < heroes.size(); j++) {
				this.values[i].checkCollision(heroes.getHero(j));
			}
		}
	}
};