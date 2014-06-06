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
	create : function() {
		"use strict";

		var x = game.world.randomX;
		var y = 100;

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
	this.game = game;
	this.values = new Array();
};

Enemies.prototype = {
	pop : function() {
		var enemy = new Enemy(game, ENEMY_TYPE_1);
		this.values.push(enemy);
		
		enemy.create();
	},
	preload : function() {
		this.game.load.spritesheet('enemy1', 'assets/magma_40-40-4.png', 40, 40, 4);
		this.game.load.spritesheet('enemy2', 'assets/magma_40-40-4.png', 40, 40, 4);
		this.game.load.spritesheet('enemy3', 'assets/magma_40-40-4.png', 40, 40, 4);
	},
	create : function() {
		"use strict";

		this.timer = this.game.time.events.loop(1500, this.pop, this);
	},
	update : function(layer) {
		"use strict";

		for (var i = 0; i < this.values.length; i++) {
			this.values[i].update(layer);
		}
	},
	checkCollision : function(hero) {
		for (var i = 0; i < this.values.length; i++) {
			this.game.physics.arcade.collide(this.values[i].enemy, hero,
					this.heroCollision);
		}
	},
	heroCollision : function(enemy, hero) {
		hero.damage(1);
	},
	close : function() {
		this.game.time.events.remove(this.timer);
	}
};