function HeroOfPower(game) {
	"use strict";
	var that = new Hero(game);

	// Default parameters
	that.type = HERO_OF_POWER;
	that.key = 'hero1';
	that.asset = 'assets/heroofpower_120-120-34.png';
	that.jump = 450;
	that.walk = 300;
	that.life = 1;
	that.maxJump = 3;
	that.initX = 20;
	that.initY = 1000;

	that.preload = function() {
		"use strict";

		this.game.load.spritesheet(this.key, this.asset, 120, 120, 34);
	};

	that.create = function() {
		"use strict";

		this.hero = this.game.add.sprite(this.initX, this.initY, this.key, 34);
		this.hero.animations.add('walk', [ 0, 1, 2, 3 ], 4, true);
		this.hero.animations.add('jump', [ 4, 5, 6, 8 ], 4, true);
		this.hero.animations.add('power', [ 9, 10, 11, 12 ], 4, true);
		this.hero.animations.add('down', [ 13, 14 ], 2, true);
		this.hero.animations.add('died', [ 15, 16, 17 ], 3, true);
		// permite que a sprite tenha um corpo fisico
		this.game.physics.enable(this.hero, Phaser.Physics.ARCADE);
		this.hero.body.setSize(60, 120, -15, 0);
		this.hero.body.acceleration.y = 100;

		// para no limite inferio da tela
		this.hero.body.collideWorldBounds = true;
		// desloca 100 e para, so desloca de novo se clicada alguma tecla e
		// quanto maior for seu valor, menos desloca
		this.hero.body.drag.x = 600;
		// diminui o espaco do deslocamento do espelhamento
		this.hero.anchor.setTo(.25, .5);
		this.hero.body.gravity.y = 150;

		this.hero.health = this.life;

		this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.jumpKey.onDown.add(this.jumpCheck, this);
	};

	that.update = function(layer, enemies) {
		"use strict";
		this.game.physics.arcade.collide(layer, this.hero);
		enemies.checkCollision(this.hero);

		// PEGA A ENTRADA (tecla pressionada):
		var keyPressed = false;
		// apenas processar movimento se estiver ativo
		if (this.active) {
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				// vai para esquerda
				this.hero.body.velocity.x = -this.walk;
				this.hero.animations.play('walk');
				this.hero.scale.x = -1; // espelha se antes -1
				keyPressed = true;
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				// vai para direita
				this.hero.body.velocity.x = this.walk;
				this.hero.scale.x = +1; // espelha se antes 1
				this.hero.animations.play('walk');
				keyPressed = true;
			}
		}
		// executar a animacao para para cima
		if (this.jumpCount > 0) {
			this.hero.animations.play('jump');

			// resetando o contador de pulo quando votlar ao ch�o
			if (this.hero.body.onFloor()) {
				this.jumpCount = 0;
			}
			keyPressed = true;
		}
		if (!keyPressed) {
			this.hero.animations.stop();
			this.hero.frame = 0;
		}
	};

	return that;
}