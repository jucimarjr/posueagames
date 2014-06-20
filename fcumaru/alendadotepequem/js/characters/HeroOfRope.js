function HeroOfRope(game) {
	"use strict";
	var that = new Hero(game);

	// Default parameters
	that.type = HERO_OF_ROPE;
	that.key = 'hero2';
	that.asset = 'assets/heroofrope_120-120-34.png';
	that.jump = 500;
	that.walk = 200;
	that.life = 1;
	that.maxJump = 2;
	that.initX = 200;
	that.initY = 1500;
	that.numSegmentsRope = 19;
	that.facingLeft = false;

	//TODO: "body" of the rope
	that.ropeTipKey = 'ropeTip';
	that.ropeTipAsset = 'assets/rope_20-10.png';
	
	that.preload = function() {
		"use strict";

		this.game.load.spritesheet(this.key, this.asset, 120, 120, 34);
		this.game.load.image(this.ropeTipKey, this.ropeTipAsset, 20, 10); // for HeroOfRope
	};

	that.create = function() {
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

		this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.jumpKey.onDown.add(this.jumpCheck, this);

		this.ropeSegments = [];
		for(var i = 0; i < this.numSegmentsRope; i++){
			var ropeSegment = this.game.add.sprite(0, 0, this.ropeTipKey);
			this.ropeSegments.push(ropeSegment);
			ropeSegment.kill();
		}
		this.ropeKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
		this.ropeKey.onDown.add(this.useRope, this);
	};

	that.update = function(layer, enemies) {
		"use strict";
		this.game.physics.arcade.collide(layer, this.hero);
		enemies.checkCollision(this.hero);
		this.game.physics.arcade.collide(this.ropeSegments[0], this.layer2, this.collisionRopeObject);

		// PEGA A ENTRADA (tecla pressionada):
		var keyPressed = false;
		// apenas processar movimento se estiver ativo
		if (this.active && !this.ropeActive) {
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				// vai para esquerda
				this.hero.body.velocity.x = -this.walk;
				this.hero.animations.play('walk');
				this.hero.scale.x = -1; // espelha se antes -1
				keyPressed = true;
				this.facingLeft = true;
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				// vai para direita
				this.hero.body.velocity.x = this.walk;
				this.hero.scale.x = +1; // espelha se antes 1
				this.hero.animations.play('walk');
				keyPressed = true;
				this.facingLeft = false;
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

		if(this.ropeActive){
			if(this.facingLeft){
				for(var i = 1; i < this.numSegmentsRope; i++){
					this.ropeSegments[i].x = this.ropeSegments[i-1].x + 20;
					if(this.ropeSegments[i].x > this.ropeStartX + this.ropeSegments[i].width)
						this.ropeSegments[i].x = this.ropeStartX + this.ropeSegments[i].width;
				}
			}
			else {
				for(var i = 1; i < this.numSegmentsRope; i++){
					this.ropeSegments[i].x = this.ropeSegments[i-1].x - 20;
					if(this.ropeSegments[i].x < this.ropeStartX)
						this.ropeSegments[i].x = this.ropeStartX;
				}
			}
		}
	};

	that.useRope = function(){
		if(!this.active || this.ropeActive || !this.hero.body.onFloor()) return;
		this.ropeActive = true;
		if(this.facingLeft) {
			this.ropeStartX = this.hero.x - Math.abs(this.hero.width/2) - this.ropeSegments[0].width;
			this.ropeDisplacement = -350;
		}
		else {
			this.ropeStartX = this.hero.x + Math.abs(this.hero.width/2) - this.ropeSegments[0].width;
			this.ropeDisplacement = 350;
		}
		for(var i = 0; i < this.numSegmentsRope; i++){
			this.ropeSegments[i].revive();
			this.ropeSegments[i].y = this.hero.y;
		}
		this.ropeSegments[0].x = this.ropeStartX;
		// can't chain directly because of onComplete(); must use verbose mode
		var ropeAnimP1 = this.game.add.tween(this.ropeSegments[0]).to({x: this.ropeStartX + this.ropeDisplacement}, 700);
		var ropeAnimP2 = this.game.add.tween(this.ropeSegments[0]).to({x: this.ropeStartX}, 700);
		ropeAnimP1.chain(ropeAnimP2);
		ropeAnimP2.onComplete.add(this.killRope, this);
		ropeAnimP1.start();
	};

	that.collisionRopeObject = function(rope, object){
		console.log("rope collided with something");
	};

	that.killRope = function(){
		for(var i = 0; i < this.numSegmentsRope; i++){
			this.ropeSegments[i].kill();
		}
		this.ropeActive = false;
	};

	that.jumpCheck = function() {
		// apenas processar pulo se estiver ativo e não estiver usando a corda
		if (this.active && this.jumpCount < this.maxJump && !this.ropeActive) {
			this.hero.body.velocity.y = -this.jump;
			this.jumpCount++;
		}
	};

	that.getRope = function() {
		return this.ropeSegments[0];
	};

	return that;
}