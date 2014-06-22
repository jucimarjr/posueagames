function EnemyBoss(game) {
	"use strict";
	var that = new Enemy(game);

	// Default parameters
	that.type = ENEMY_BOSS;
	that.key = 'enemy1';
	that.asset = 'assets/boss_120-120-20.png';
	that.walk = 150;
	that.life = 1;
	
	that.initX = 620;
	that.initY = 1000;

	that.preload = function() {
		"use strict";

		this.game.load.spritesheet(this.key, this.asset, 120, 120, 20);
	};

	that.create = function() {
		"use strict";

		this.enemy = this.game.add.sprite(this.initX, this.initY, this.key, 34);
		this.enemy.animations.add('walk', [ 0, 1, 2, 3 ], 10, true);
		this.enemy.animations.add('down', [ 6, 7, 8, 9 ], 6, false);

		// permite que a sprite tenha um corpo fisico
		this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
		this.enemy.body.setSize(60, 120, -15, 0);
		this.enemy.body.acceleration.y = 100;

		// para no limite inferio da tela
		this.enemy.body.collideWorldBounds = true;
		// desloca 100 e para, so desloca de novo se clicada alguma tecla e
		// quanto maior for seu valor, menos desloca
		this.enemy.body.drag.x = 600;
		// diminui o espaco do deslocamento do espelhamento
		this.enemy.anchor.setTo(.25, .5);

		this.enemy.body.gravity.y = 150;

		this.enemy.health = this.life;
	};

	that.update = function(layer, enemies) {
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
	};

	return that;
}