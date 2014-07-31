function HeroOfStick(game) {
	"use strict";
	var that = new Hero(game);
	var distance;

	// Default parameters
	that.type = HERO_OF_STICK;
	that.key = 'hero3';
	that.asset = 'assets/heroofstick_120-120-34.png';
	that.jump = 400;
	that.walk = 200;
	that.life = 2;
	that.maxJump = 2;
//	that.initX = 400;
//	that.initY = 2520;
	that.initX = 2450;
	that.initY = 780;

	that.preload = function() {
		"use strict";

		this.game.load.spritesheet(this.key, this.asset, 120, 120, 34);
	};

	that.create = function() {
		"use strict";

		this.hero = this.game.add.sprite(this.initX, this.initY, this.key, 3);
		this.hero.animations.add('walk', [ 0, 1, 2, 3 ], 10, true);
		this.hero.animations.add('jump', [ 4, 5, 6, 7, 8, 9, 10 ], 8, false);
		this.hero.animations.add('attack', [ 4, 5, 6, 7, 8, 9, 10 ], 18, false);
		this.hero.animations.add('down', [ 4 ], 6, false);
		this.hero.animations.add('died', [ 14, 15, 16 ], 4, true);
		
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
		this.hero.active = false;
		this.hero.jumpCount = this.jumpCount;
		this.hero.life = 1;

		this.hero.body.allowGravity = false;

		this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.jumpKey.onDown.add(this.jumpCheck, this);
	};

	that.update = function(layer, enemies) {
		"use strict";
		this.game.physics.arcade.collide(layer, this.hero);
		enemies.checkCollision(this.hero);

		// verificar morte
		if(this.state === "dead") return;
		if(this.state === "dying") {
			this.hero.animations.play('died');
			this.state = "dead"; // no more actions from this point
			console.log("e morreu: " + this.state);
			return;
		}

		if (this.hero.active) {
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				// vai para esquerda
				this.hero.body.velocity.x = -this.walk;
				if(this.hero.body.onFloor()) this.hero.animations.play('walk');
				this.hero.scale.x = -1; // espelha se antes -1
				this.state = "walking";
				this.facingLeft = true;
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				// vai para direita
				this.hero.body.velocity.x = this.walk;
				this.hero.scale.x = +1; // espelha se antes 1
				if(this.hero.body.onFloor()) this.hero.animations.play('walk');
				this.state = "walking";
				this.facingLeft = false;
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.X)) {
				this.hero.animations.play('attack');
				this.state = "attacking";
				distance = enemies.checkDistanceFromEnemy(this.hero.x,
						this.hero.y);
				if (distance < 5.5) {
					enemies.Attacked(true);
				}
			}
			else {
				this.state = "idle";
			}
		}
		// executar a animacao para para cima
		if (this.hero.jumpCount > 0) {
			if(this.hero.body.velocity.y < 0) this.hero.animations.play('jump');
			this.state = "jumping";
			if (this.hero.body.onFloor()) {
				this.hero.jumpCount = 0;
				this.state = "idle";
			}
		}

		if (this.state === "idle") {
			this.hero.animations.stop();
			this.hero.frame = 0;
		}

		if(this.hero.body.velocity.y > 0 && this.state !== "falling"){
			this.hero.animations.play('down');
			this.state = "falling";
		}


		if (this.hero.body.onFloor()) {
			this.hero.body.allowGravity = false;
		} else {
			this.hero.body.allowGravity = true;
		}
	};

	return that;
}