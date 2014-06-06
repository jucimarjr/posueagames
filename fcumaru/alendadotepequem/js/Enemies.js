var ENEMY_TYPE_1 = 0;
var ENEMY_TYPE_2 = 1;
var ENEMY_TYPE_3 = 2;

var LEFT = 0;
var RIGHT = 1;

Enemy = function(game, type) {
	"use strict";
	this.game = game;
	this.direction = LEFT;

	switch (type) {
	case ENEMY_TYPE_2:
		this.key = 'enemy2';
		this.asset = 'assets/magma_40-40-4.png';
		this.walk = 200;
		this.life = 5;

		break;

	case ENEMY_TYPE_3:
		this.key = 'enemy3';
		this.asset = 'assets/magma_40-40-4.png';
		this.walk = 100;
		this.life = 6;

		break;

	default:
		this.key = 'enemy1';
		this.asset = 'assets/magma_40-40-4.png';
		this.walk = 150;
		this.life = 5;

		break;
	}
};

Enemy.prototype = {
	getSprite : function() {
		return this.enemy;
	},
	preload : function() {
		this.game.load.spritesheet(this.key, this.asset, 40, 40, 4);
	},
	create : function() {
		"use strict";

		var x = game.world.randomX;
		var y = 500;

		this.enemy = this.game.add.sprite(x, y, this.key, 3);
		this.enemy.animations.add('walk', [ 1, 2, 3, 4 ], 6, true);
		// permite que a sprite tenha um corpo fisico
		this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);

		this.enemy.body.acceleration.y = 100;

		// para no limite inferio da tela
		this.enemy.body.collideWorldBounds = true;
		// diminui o espaco do deslocamento do espelhamento
		this.enemy.anchor.setTo(.5, .5);
		this.enemy.body.gravity.y = 150;

		this.enemy.health = this.life;
	},
	update : function(layer) {
		"use strict";
		this.game.physics.arcade.collide(layer, this.enemy);

		this.enemy.animations.play('walk');

		if (this.enemy.body.onFloor()) {
			if (this.enemy.body.blocked.left) {
				this.direction = RIGHT;
				this.enemy.damage(1);
			} else if (this.enemy.body.blocked.right) {
				this.direction = LEFT;
				this.enemy.damage(1);
			}

			if (this.direction == LEFT) {
				// vai para esquerda
				this.enemy.body.velocity.x = -this.walk;
			} else {
				// vai para direita
				this.enemy.body.velocity.x = this.walk;
			}
		}
	}
};

Enemies = function(game) {
	"use strict";
	this.enemies = new Array();

	var enemy = new Enemy(game, ENEMY_TYPE_1);
	this.enemies.push(enemy);
};

Enemies.prototype = {
	pop : function() {
		var enemy = new Enemy(game, ENEMY_TYPE_1);
		this.enemies.push(enemy);
	},
	preload : function() {
		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].preload();
		}
	},
	create : function() {
		"use strict";
		// pop();

		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].create();
		}
	},
	update : function(layer) {
		"use strict";
		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].update(layer);
		}
	}
};