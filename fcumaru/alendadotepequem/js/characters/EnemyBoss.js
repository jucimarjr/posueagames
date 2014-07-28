function EnemyBoss(game) {
	"use strict";
	var that = new Enemy(game);

	// Default parameters
	that.type = ENEMY_BOSS;
	that.key = 'enemy1';
	that.asset = 'assets/boss_120-120-20.png';
	that.walk = 150;
	that.life = 1;

	that.fireballs = new FireBalls(game);

	that.initX = 2650;
	that.initY = 780;

	that.preload = function() {
		"use strict";

		this.game.load.spritesheet(this.key, this.asset, 120, 120, 20);

		this.fireballs.preload();
	};

	that.create = function() {
		"use strict";

		this.enemy = this.game.add.sprite(this.initX, this.initY, this.key, 20);
		this.enemy.animations.add('walk', [ 0, 1, 2, 3 ], 10, true);
		this.enemy.animations.add('fire', [ 5 ], 3, false);
		this.enemy.animations.add('down', [ 6, 7, 8, 9 ], 6, false);

		// permite que a sprite tenha um corpo fisico
		this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
		this.enemy.body.setSize(60, 120, -15, 0);

		this.enemy.body.allowGravity = false;

		// para no limite inferio da tela
		this.enemy.body.collideWorldBounds = true;
		// desloca 100 e para, so desloca de novo se clicada alguma tecla e
		// quanto maior for seu valor, menos desloca
		this.enemy.body.drag.x = 600;
		// diminui o espaco do deslocamento do espelhamento
		this.enemy.anchor.setTo(.25, .5);

		this.enemy.health = this.life;

		this.fireballs.create();

		// Throw fire ball event
		this.game.time.events.loop(Phaser.Timer.SECOND * 5, function() {
			"use strict";

			this.currAnimRef = this.enemy.animations.play('fire');

			var x;
			if (this.direction == LEFT) {
				x = this.enemy.body.x - 15;
			} else {
				x = this.enemy.body.x + 75;
			}
			var y = this.enemy.body.y + 60;

			this.fireballs.pop(x, y, this.direction);
		}, this);
	};

	that.update = function(layer, heroes) {
		"use strict";
		this.game.physics.arcade.collide(layer, this.enemy);
		for (var i = 0; i < heroes.size(); i++) {
			var hero = heroes.getHero(i);
			if (hero.active) {
				this.game.physics.arcade.overlap(this.enemy, hero, function(
						enemy, hero) {
					hero.life--;
				});
			}
		}

		if (this.enemy.body.onFloor()) {
			if (this.enemy.body.blocked.left) {
				this.direction = RIGHT;
				this.enemy.damage(1);
			} else if (this.enemy.body.blocked.right) {
				this.direction = LEFT;
				this.enemy.damage(1);
			}

			// if (this.direction == LEFT) {
			// // vai para esquerda
			// this.enemy.body.velocity.x = -this.walk;
			// this.currAnimRef = this.enemy.animations.play('walk');
			// this.enemy.scale.x = -1; // espelha se antes -1
			// } else if (this.direction == RIGHT) {
			// // vai para direita
			// this.enemy.body.velocity.x = this.walk;
			// this.currAnimRef = this.enemy.animations.play('walk');
			// this.enemy.scale.x = 1; // espelha se antes 1
			// }
		}

		if (this.currAnimRef == null || !this.currAnimRef.isPlaying) {
			this.enemy.animations.stop();
			this.enemy.frame = 0;
		}

		this.fireballs.update(layer);
		this.fireballs.checkCollision(heroes);
	};

	return that;
}