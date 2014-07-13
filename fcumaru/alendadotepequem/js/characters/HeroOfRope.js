function HeroOfRope(game) {
	"use strict";
	var that = new Hero(game);

	// Default parameters
	that.type = HERO_OF_ROPE;
	that.key = 'hero2';
	that.asset = 'assets/heroofrope_120-120-34.png';
	that.jump = 500;
	that.walk = 200;
	that.maxJump = 2;
//	that.initX = 200;
//	that.initY = 2580;
	that.initX = 3020;
	that.initY = 1620;
	that.numSegmentsRope = 19;
	that.facingLeft = false;
	that.state = "idle";

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
		this.hero.animations.add('walk', [ 0, 1, 2, 3 ], 10, true);
		this.hero.animations.add('jump', [ 4 ], 4, true);
		this.hero.animations.add('down', [ 4, 5, 6, 7 ], 8, false);
		this.hero.animations.add('died', [ 14, 15, 16 ], 3, true);

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
		// verificar morte
		if(this.state === "dead") return;
		if(this.state === "dying") {
			this.hero.animations.play('died');
			this.state = "dead"; // no more actions from this point
			console.log("e morreu: " + this.state);
			return;
		}
		
		// apenas processar movimento se estiver ativo
		if (this.hero.active && !this.ropeActive) {
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

		if(this.ropeActive){
			this.hero.frame = 9;
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

		if (this.hero.body.onFloor()) {
			this.hero.body.allowGravity = false;
		} else {
			this.hero.body.allowGravity = true;
		}
	};

	that.useRope = function(){
		if(!this.hero.active || this.ropeActive || !this.hero.body.onFloor()) return;
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
			this.ropeSegments[i].y = this.hero.y - 10;
		}
		this.ropeSegments[0].x = this.ropeStartX;
		// can't chain directly because of onComplete(); must use verbose mode
		var ropeAnimP1 = this.game.add.tween(this.ropeSegments[0]).to({x: this.ropeStartX + this.ropeDisplacement}, 700);
		var ropeAnimP2 = this.game.add.tween(this.ropeSegments[0]).to({x: this.ropeStartX}, 700);
		ropeAnimP1.chain(ropeAnimP2);
		ropeAnimP2.onComplete.add(this.killRope, this);
		ropeAnimP1.start();
	};

	that.killRope = function(){
		for(var i = 0; i < this.numSegmentsRope; i++){
			this.ropeSegments[i].kill();
		}
		this.ropeActive = false;
	};

	that.jumpCheck = function() {
		// apenas processar pulo se estiver ativo e não estiver usando a corda
		if (this.hero.active && this.hero.jumpCount < this.maxJump && !this.ropeActive) {
			this.hero.body.velocity.y = -this.jump;
			this.hero.jumpCount++;
		}
	};

	that.getRope = function() {
		return this.ropeSegments[0];
	};

	return that;
}