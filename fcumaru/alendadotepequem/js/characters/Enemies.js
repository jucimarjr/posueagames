var ENEMY_BOSS = "ENEMY_BOSS";
var ENEMY_BAT = "ENEMY_BAT";

var LEFT = 0;
var RIGHT = 1;

Enemies = function(game) {
	"use strict";
	this.game = game;
	this.values = new Array();

	var enemy = new EnemyBoss(this.game);
	this.values.push(enemy);
};

Enemies.prototype = {
	preload : function() {
		for (var i = 0; i < this.values.length; i++) {
			this.values[i].preload();
		}
	},
	create : function() {
		"use strict";

		for (var i = 0; i < this.values.length; i++) {
			this.values[i].create();
		}
	},
	update : function(layer, heroes) {
		"use strict";

		for (var i = 0; i < this.values.length; i++) {
			this.values[i].update(layer, heroes);
		}
	},
	pop : function() {
		var enemy = new EnemyBoss(this.game);
		this.values.push(enemy);

		enemy.create();
	},
	checkCollision : function(hero) {
		for (var i = 0; i < this.values.length; i++) {
			this.values[i].checkCollision(hero);
		}
	},
	checkDistanceFromEnemy : function(x, y) {
		distance = Math.sqrt((x - this.values[0].getSprite().body.x) ^ 2
				+ (this.values[0].getSprite().body.y - y) ^ 2);
		return distance;
	},
	
	Attacked : function(boolean) {
		if (boolean) {
			this.values[0].getSprite().kill();
		}
	}

};