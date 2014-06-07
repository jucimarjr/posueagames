ENEMY_TYPE_1 = function() {
	this.key = 'enemy1';
	this.asset = 'assets/bola_de_fogo.png';
	this.walk = 150;
	this.life = 3;
};
ENEMY_TYPE_2 = function() {
	this.key = 'enemy2';
	this.asset = 'assets/magma_40-40-4.png';
	this.walk = 200;
	this.life = 3;
};
ENEMY_TYPE_3 = function() {
	this.key = 'enemy3';
	this.asset = 'assets/magma_40-40-4.png';
	this.walk = 100;
	this.life = 4;
};

var LEFT = 0;
var RIGHT = 1;

Enemy = function(game, type) {
	"use strict";
	this.game = game;
	this.direction = Math.round(Math.random());

	this.key = type.key;
	this.asset = type.asset;
	this.walk = type.walk;
	this.life = type.life;
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
	},
	checkCollision : function(hero) {
		this.game.physics.arcade.collide(this.enemy, hero, this.heroCollision);
	},
	heroCollision : function(enemy, hero) {
		hero.damage(1);
	}
};

Enemies = function(game) {
	"use strict";
	this.game = game;
	this.values = new Array();

	this.type1 = new ENEMY_TYPE_1();
	this.type2 = new ENEMY_TYPE_2();
	this.type3 = new ENEMY_TYPE_3();
};

Enemies.prototype = {
	preload : function() {
		this.game.load.spritesheet(this.type1.key, this.type1.asset, 40, 40, 6);
		this.game.load.spritesheet(this.type2.key, this.type2.asset, 40, 40, 4);
		this.game.load.spritesheet(this.type3.key, this.type3.asset, 40, 40, 4);
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
	pop : function() {
		var enemy = new Enemy(game, this.type1);
		this.values.push(enemy);

		enemy.create();
	},
	checkCollision : function(hero) {
		for (var i = 0; i < this.values.length; i++) {
			this.values[i].checkCollision(hero);
		}
	},
	close : function() {
		this.game.time.events.remove(this.timer);
	}
};