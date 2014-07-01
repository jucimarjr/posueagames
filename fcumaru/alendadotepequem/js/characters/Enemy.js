function Enemy(game) {
	"use strict";
	this.game = game;

	// Default parameters
	this.type = ENEMY_BOSS;
	this.key = 'enemy1';
	this.asset = 'assets/boss_120-120-20.png';
	this.walk = 300;
	this.life = 1;

	this.currAnimRef = null;

	this.direction = RIGHT;// Math.round(Math.random());

	this.initX = 20;
	this.initY = 1000;
}

Enemy.method('getSprite', function() {
	return this.enemy;
});

Enemy.method('preload', function() {
	this.game.load.spritesheet(this.key, this.asset, 120, 120, 20);
});

Enemy.method('create', function() {
	"use strict";

	this.enemy = this.game.add.sprite(this.initX, this.initY, this.key, 3);
	this.enemy.animations.add('walk', [ 0, 1, 2, 3 ], 10, true);
	// permite que a sprite tenha um corpo fisico
	this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);

	this.enemy.body.acceleration.y = 100;

	// para no limite inferio da tela
	this.enemy.body.collideWorldBounds = true;
	// desloca 100 e para, so desloca de novo se clicada alguma tecla e
	// quanto maior for seu valor, menos desloca
	this.enemy.body.drag.x = 600;
	// diminui o espaco do deslocamento do espelhamento
	this.enemy.anchor.setTo(.5, .5);
	this.enemy.body.gravity.y = 150;

	this.enemy.health = this.life;
});

Enemy.method('update', function(layer, heroes) {
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
			this.enemy.scale.x = -1; // espelha se antes -1
		} else {
			// vai para direita
			this.enemy.body.velocity.x = this.walk;
			this.enemy.scale.x = 1; // espelha se antes 1
		}
	}
});

Enemy.method('checkCollision', function(hero) {
	"use strict";

	// TODO
});
