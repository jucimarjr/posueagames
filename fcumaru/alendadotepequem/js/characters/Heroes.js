var GOAL_X = 420;
var GOAL_Y = 400;
var GOAL_WIDTH = 80;
var GOAL_HEIGHT = 80;

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
