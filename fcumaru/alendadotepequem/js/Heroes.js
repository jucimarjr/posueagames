HERO_TYPE_1 = function() {
	this.key = 'hero1';
	//this.asset = 'assets/india.png';
	this.asset = 'assets/tmp1.png';
	this.jump = 450;
	this.walk = 150;
	this.life = 1;
	this.maxJump = 3;
	this.initX = 20;
	this.initY = 1000;
};
HERO_TYPE_2 = function() {
	this.key = 'hero2';
	//this.asset = 'assets/dinossauro_40-32-6.png';
	this.asset = 'assets/tmp2.png';
	this.jump = 500;
	this.walk = 200;
	this.life = 1;
	this.maxJump = 2;
	this.initX = 200;
	this.initY = 1000;

};
HERO_TYPE_3 = function() {
	this.key = 'hero3';
	//this.asset = 'assets/dinossauro_40-32-6.png';
	this.asset = 'assets/tmp3.png';
	this.jump = 400;
	this.walk = 100;
	this.life = 2;
	this.maxJump = 2;
	this.initX = 400;
	this.initY = 1000;
};

var GOAL_X = 420;
var GOAL_Y = 400;
var GOAL_WIDTH = 80;
var GOAL_HEIGHT = 80;

Hero = function(game, type) {
	"use strict";
	this.game = game;
	this.type = type;

	this.key = type.key;
	this.asset = type.asset;
	this.jump = type.jump;
	this.walk = type.walk;
	this.life = type.life;
	this.maxJump = type.maxJump;
	this.initX = type.initX;
	this.initY = type.initY;

	this.jumpCount = 0;
	this.active = false;
};

Hero.prototype = {
	getSprite : function() {
		return this.hero;
	},
	collide : function() {
		this.hero.damage(1);
	},
	isAlive : function() {
		return this.hero.health > 0;
	},
	preload : function() {
		this.game.load.image(this.key, this.asset, 120, 120);
	},
	create : function() {
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
	},
	update : function(layer, enemies) {
		"use strict";
		this.game.physics.arcade.collide(layer, this.hero);
		enemies.checkCollision(this.hero);

		// PEGA A ENTRADA (tecla pressionada):
		var keyPressed = false;
		// apenas processar movimento se estiver ativo
		if(this.active) {
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
	},

	jumpCheck : function() {
		// apenas processar pulo se estiver ativo
		if (this.active && this.jumpCount < this.maxJump) {
			this.hero.body.velocity.y = -this.jump;
			this.jumpCount++;
		}
	},

	reset : function() {
	},

	isGoalIn : function() {
		if (this.hero.body.x >= GOAL_X && this.hero.body.x <= GOAL_X + GOAL_WIDTH) {
			if (this.hero.body.y >= GOAL_Y && this.hero.body.y <= GOAL_Y + GOAL_HEIGHT) {
				return true;
			}	
		}
		return false;
	}
};

Heroes = function(game) {
	"use strict";
	this.game = game;
	this.index = 0;
	
	this.type1 = new HERO_TYPE_1();
	this.type2 = new HERO_TYPE_2();
	this.type3 = new HERO_TYPE_3();
	
	this.heroes = new Array();

	var hero1 = new Hero(game, this.type1);
	this.heroes.push(hero1);

	var hero2 = new Hero(game, this.type2);
	this.heroes.push(hero2);

	var hero3 = new Hero(game, this.type3);
	this.heroes.push(hero3);
};

Heroes.prototype = {
	getCurrent : function() {
		return this.heroes[this.index].hero;
	},
	setCurrentIndex : function(index) {
		this.index = index;
	},
	preload : function() {
		for (var i = 0; i < this.heroes.length; i++) {
			this.heroes[i].preload();
		}
	},
	create : function() {
		"use strict";
		for (var i = 0; i < this.heroes.length; i++) {
			this.heroes[i].create();
		}
		this.heroes[this.index].active = true;
		this.switchKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
		this.switchKey.onDown.add(this.switchHero, this);
	},
	update : function(layer, enemies) {
		"use strict";
		for (var i = 0; i < this.heroes.length; i++) {
			this.heroes[i].update(layer, enemies);
		}
		if (this.heroes[this.index].isGoalIn()) {
			this.game.state.start('YouWin');
		}
	},
	switchHero : function() {
		this.heroes[this.index].active = false;
		this.index++;
		if (this.index >= this.heroes.length) {
			// Reset value
			this.index = 0;
		}
		this.heroes[this.index].active = true;
		this.game.camera.follow(this.heroes[this.index].hero);
	},

	isAlive : function() {
		return this.heroes[this.index].isAlive();
	}
};
