var HERO_TYPE_1 = 0;
var HERO_TYPE_2 = 1;
var HERO_TYPE_3 = 2;

Hero = function(game, type) {
	"use strict";
	this.game = game;

	switch (type) {
	case HERO_TYPE_2:
		this.key = 'hero2';
		this.asset = 'assets/dinossauro_40-32-6.png';
		this.jump = 500;
		this.walk = 200;
		this.life = 1;

		break;

	case HERO_TYPE_3:
		this.key = 'hero3';
		this.asset = 'assets/dinossauro_40-32-6.png';
		this.jump = 200;
		this.walk = 50;
		this.life = 2;

		break;

	default:
		this.key = 'hero1';
		this.asset = 'assets/dinossauro_40-32-6.png';
		this.jump = 300;
		this.walk = 100;
		this.life = 1;

		break;
	}
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
		this.game.load.spritesheet(this.key, this.asset, 40, 32, 6);
	},
	create : function() {
		"use strict";

		this.hero = this.game.add.sprite(10, 500, this.key, 3);
		this.hero.animations.add('walk', [ 1, 2 ], 6, true);
		this.hero.animations.add('jump', [ 3, 4, 5 ], 4, true);
		// permite que a sprite tenha um corpo fisico
		this.game.physics.enable(this.hero, Phaser.Physics.ARCADE);

		this.hero.body.acceleration.y = 100;

		// para no limite inferio da tela
		this.hero.body.collideWorldBounds = true;
		// desloca 100 e para, só desloca de novo se clicada alguma tecla e
		// quanto maior for seu valor, menos desloca
		this.hero.body.drag.x = 100;
		// diminui o espaco do deslocamento do espelhamento
		this.hero.anchor.setTo(.5, .5);
		this.hero.body.gravity.y = 150;

		this.hero.health = this.life;
		
		this.game.camera.follow(this.hero);
	},
	update : function(layer) {
		"use strict";
		this.game.physics.arcade.collide(layer, this.hero);

		// PEGA A ENTRADA (tecla pressionada):
		var keyPressed = false;
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

		// vai para cima
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.hero.body.velocity.y = -this.jump;
			this.hero.animations.play('jump');

			keyPressed = true;
		}

		if (!keyPressed) {
			this.hero.animations.stop();
			this.hero.frame = 0;
		}
	}
};

Heroes = function(game) {
	"use strict";
	this.index = 0;
	this.heroes = new Array();
	
	var hero1 = new Hero(game, HERO_TYPE_1);
	this.heroes.push(hero1);
	
//	var hero2 = new Hero(game, HERO_TYPE_2);
//	this.heroes.push(hero2);
	
//	var hero3 = new Hero(game, HERO_TYPE_3);
//	this.heroes.push(hero3);
};

Heroes.prototype = {
	getCurrent : function() {
		return this.heroes[this.index];
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
	},
	update : function(layer) {
		"use strict";
		this.heroes[this.index].update(layer);
	}
};