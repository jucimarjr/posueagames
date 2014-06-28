State.Game = function(game) {
	"use strict";
	this.game = game;
	this.heroes = new Heroes(game);
	this.enemies = new Enemies(game);
	this.rocks = new Rocks(game);
	this.trees = new Trees(game);
};

var map;

var now = 0;
var nowSecond = 0;
var startSecond = 0;

var timerHour = 0;
var timerMinutes = 0;
var timerSecond = 0;

State.Game.prototype = {
	preload : function() {
		this.game.load.tilemap('map', 'assets/map.json', null,
				Phaser.Tilemap.TILED_JSON);
		// this.game.load.image('fundo', 'assets/bg_tepequem_4320-2700.png');
		this.game.load.image('map', 'assets/map.png');

		// this.game.load.image('clouds', 'assets/nuvem.png');
		// this.game.load.image('faiscas', 'assets/efeito-faisca.png');
		// this.game.load.image('entrada', 'assets/entrada.png');

		this.heroes.preload();
		this.enemies.preload();
		this.rocks.preload();
		this.trees.preload();
	},
	create : function() {
		"use strict";
		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = 800;

		this.bg = game.add.tileSprite(0, 0, 4320, 2700, 'fundo');
		this.bg.fixedToCamera = false;

		map = this.game.add.tilemap('map');

		map.addTilesetImage('map', 'map');
		this.layer = map.createLayer('map');
		game.physics.enable(this.layer);

		this.layer.resizeWorld(); // seta o mundo com as altera��es feitas
		map.setCollisionBetween(1, 22, true, 0); // 0 espaco

		// entrada
		this.entrada = this.game.add.image(GOAL_X, GOAL_Y, 'entrada');

		// // clouds
		// this.clouds = this.game.add.tileSprite(0, 0, 4320, 2700, 'clouds');
		// this.clouds.autoScroll(-30, 0);
		//
		// // faisca
		// this.faisca = this.game.add.tileSprite(0, 0, game.stage.bounds.width,
		// game.cache.getImage('faiscas').height, 'faiscas');
		// this.faisca.autoScroll(25, 80);

		this.heroes.create();
		this.game.camera.follow(this.heroes.getCurrent());

		this.enemies.create();
		this.rocks.create();
		this.rocks.pop(1680, 2220);
		this.rocks.pop(2520, 2160);
		this.rocks.pop(3720, 1800);
		this.rocks.pop(660, 420);
		this.trees.create();
		this.trees.pop(1710, 1320);
		this.trees.pop(2670, 1260);
	},
	update : function() {
		"use strict";
		this.heroes.update(this.layer, this.enemies);
		this.enemies.update(this.layer, this.heroes);
		this.trees.update(this.layer);
		this.rocks.update(this.layer);
		this.rocks.checkCollision(this.heroes);
		this.trees.checkCollision(this.heroes.getCurrent());
		if (this.heroes.heroes[this.heroes.index].type === HERO_OF_ROPE) {
			this.trees.ropeCollision(this.heroes.heroes[this.heroes.index]
					.getRope(),
					this.heroes.heroes[this.heroes.index].facingLeft);
		}
		if (!this.heroes.isAlive()) {
			this.game.state.start('GameOver');

		}

	},

	render : function() {
		// debug settings
		// this.game.debug.spriteBounds(this.heroes.getCurrent());
		// this.game.debug.body(this.heroes.getCurrent());
		// this.game.debug.body(this.trees.values[0].tree);
		// game.debug.spriteInfo(this.heroes.getCurrent(), 32, 32);
		// game.debug.inputInfo(400, 32);
	}
};

function showScore() {
	var style = {
		font : "20px Arial",
		fill : "#ffcc99",
		align : "center"
	};

	this.score = this.game.add.text(10, 550, "00", style);
	this.score.fixedToCamera = true;
}