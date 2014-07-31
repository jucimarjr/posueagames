function HeroOfPower(game) {
	"use strict";
	var that = new Hero(game);

	// Default parameters
	that.type = HERO_OF_POWER;
	that.key = 'hero1';
	that.asset = 'assets/heroofpower_120-120-34.png';
	that.jump = 450;
	that.walk = 200;
	that.life = 1;
	that.maxJump = 3;
	that.initX = 0;
	that.initY = 2580;
	that.state = "idle";

	that.preload = function() {
		"use strict";

		this.game.load.spritesheet(this.key, this.asset, 120, 120, 34);
	};

	that.create = function() {
		"use strict";

		this.hero = this.game.add.sprite(this.initX, this.initY, this.key, 34);
		this.hero.animations.add('walk', [ 7, 1, 2, 3 ], 10, true);
		this.hero.animations.add('jump', [ 4, 5, 6, 5 , 4 ], 8, false);
		this.hero.animations.add('power', [ 8, 9, 10, 11 ], 5, true);
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

		// Add extra params
		this.hero.heroType = this.type;
		this.hero.isPushing = false;
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
				if(this.hero.body.onFloor()) {
					if(this.hero.isPushing) this.hero.animations.play('power');
					else this.hero.animations.play('walk');
				}
				this.hero.scale.x = -1; // espelha se antes -1
				this.state = "walking";
				this.facingLeft = true;
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				// vai para direita
				this.hero.body.velocity.x = this.walk;
				this.hero.scale.x = +1; // espelha se antes 1
				if(this.hero.body.onFloor()){
					if(this.hero.isPushing) this.hero.animations.play('power');
					else this.hero.animations.play('walk');
				}
				this.state = "walking";
				this.facingLeft = false;
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
			this.hero.isPushing = false;
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