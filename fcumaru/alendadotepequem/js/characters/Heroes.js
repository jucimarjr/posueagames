var HERO_OF_POWER = "HERO_OF_POWER";
var HERO_OF_ROPE = "HERO_OF_ROPE";
var HERO_OF_STICK = "HERO_OF_STICK";

Heroes = function(game) {
	"use strict";
	this.game = game;
	this.index = 0;

	this.heroes = new Array();

	var hero1 = new HeroOfPower(game);
	this.heroes.push(hero1);

	var hero2 = new HeroOfRope(game);
	this.heroes.push(hero2);

	var hero3 = new HeroOfStick(game);
	this.heroes.push(hero3);
};

Heroes.prototype = {
	getHero : function(index) {
		return this.heroes[index].hero;
	},
	getCurrent : function() {
		return this.heroes[this.index].hero;
	},
	getSelectedHero : function (){
		return this.heroes[this.index];
	},
	setCurrentIndex : function(index) {
		this.index = index;
	},
	size : function() {
		return this.heroes.length;
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
		this.heroes[this.index].hero.active = true;
		this.switchKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
		this.switchKey.onDown.add(this.switchHero, this);
	},
	update : function(layer, enemies) {
		"use strict";
		for (var i = 0; i < this.heroes.length; i++) {
			this.heroes[i].update(layer, enemies);
		}
	},
	switchHero : function() {
		this.heroes[this.index].hero.active = false;
		this.index++;
		if (this.index >= this.heroes.length) {
			// Reset value
			this.index = 0;
		}
		this.heroes[this.index].hero.active = true;
		this.game.camera.follow(this.heroes[this.index].hero);
	},

	isAlive : function() {
		return this.heroes[this.index].hero.life > 0;
	}
};
