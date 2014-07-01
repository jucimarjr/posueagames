function Hero(game) {
	"use strict";
	this.game = game;

	// Default parameters
	this.key = 'hero1';
	this.asset = 'assets/tmp1.png';
	this.jump = 450;
	this.walk = 150;
	this.life = 1;
	this.maxJump = 3;
	this.initX = 20;
	this.initY = 2520;

	this.jumpCount = 0;
}

Hero.method('getSprite', function() {
	return this.hero;
});

Hero.method('collide', function() {
	this.hero.damage(1);
});

Hero.method('isAlive', function() {
	return this.hero.health > 0;
});

Hero.method('preload', function() {
	this.game.load.image(this.key, this.asset, 120, 120);
});

Hero.method('create', function() {
	"use strict";

	this.hero = this.game.add.sprite(this.initX, this.initY, this.key, 3);
	this.hero.animations.add('walk', [ 1, 0 ], 6, true);
	this.hero.animations.add('jump', [ 2 ], 4, true);
	// permite que a sprite tenha um corpo fisico
	this.game.physics.enable(this.hero, Phaser.Physics.ARCADE);

	this.hero.body.acceleration.y = 100;

	// para no limite inferio da tela
	this.hero.body.collideWorldBounds = true;
	// desloca 100 e para, so desloca de novo se clicada alguma tecla e
	// quanto maior for seu valor, menos desloca
	this.hero.body.drag.x = 600;
	// diminui o espaco do deslocamento do espelhamento
	this.hero.anchor.setTo(.5, .5);
	this.hero.body.gravity.y = 150;

	this.hero.health = this.life;
	this.hero.jumpCount = this.jumpCount;

	this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.jumpKey.onDown.add(this.jumpCheck, this);
});

Hero.method('update', function(layer, enemies) {
	"use strict";
	this.game.physics.arcade.collide(layer, this.hero);
	enemies.checkCollision(this.hero);

	// PEGA A ENTRADA (tecla pressionada):
	var keyPressed = false;
	// apenas processar movimento se estiver ativo
	if (this.hero.active) {
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
	if (this.hero.jumpCount > 0) {
		this.hero.animations.play('jump');

		// resetando o contador de pulo quando votlar ao ch�o
		if (this.hero.body.onFloor()) {
			this.hero.jumpCount = 0;
		}
		keyPressed = true;
	}
	if (!keyPressed) {
		this.hero.animations.stop();
		this.hero.frame = 0;
	}
});

Hero.method('jumpCheck', function() {
	// apenas processar pulo se estiver ativo
	if (this.hero.active && this.hero.jumpCount < this.maxJump) {
		this.hero.body.velocity.y = -this.jump;
		this.hero.jumpCount++;
	}
});

Hero.method('reset', function() {
});