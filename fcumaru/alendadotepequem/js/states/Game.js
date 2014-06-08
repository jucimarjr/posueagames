State.Game = function(game) {
	"use strict";
	this.game = game;
	this.heroes = new Heroes(game);
	this.enemies = new Enemies(game);
};

var dino, layer, group, map, posicao, score;

var now = 0;
var nowSecond = 0;
var startSecond = 0;

var timerHour = 0;
var timerMinutes = 0;
var timerSecond = 0;

State.Game.prototype = {
	preload : function() {
		this.game.load.tilemap('mapa', 'assets/mapa_.json', null,
				Phaser.Tilemap.TILED_JSON);
		this.game.load.image('fundo', 'assets/bg_tepequem_960x1800.png');
		this.game.load.image('tileset', 'assets/plataforma.png');
		this.game.load.image('clouds', 'assets/nuvem.png');
		this.game.load.image('faiscas', 'assets/efeito-faisca.png');
		this.game.load.image('entrada', 'assets/entrada.png');

		this.heroes.preload();
		this.enemies.preload();
	},
	create : function() {
		"use strict";
		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = 800;

		var bg = this.game.add.tileSprite(0, 0, 960, 1800, 'fundo');
		bg.fixedToCamera = false;

		map = this.game.add.tilemap('mapa');
		map.addTilesetImage('tileset', 'tileset');

		layer = map.createLayer('Camada de Tiles 1');
		layer.resizeWorld(); // seta o mundo com as alterações feitas
		map.setCollisionBetween(0, 10, true, 'Camada de Tiles 1'); // 0 espaco

		// entrada
		this.entrada = this.game.add.image(GOAL_X, GOAL_Y, 'entrada');

		// clouds
		this.clouds = this.game.add.tileSprite(0, 0, game.stage.bounds.width,
				game.cache.getImage('clouds').height, 'clouds');
		this.clouds.autoScroll(-30, 0);

		// faisca
		this.faisca = this.game.add.tileSprite(0, 0, game.stage.bounds.width,
				game.cache.getImage('faiscas').height, 'faiscas');
		this.faisca.autoScroll(0, 80);

		this.heroes.create();
		this.game.camera.follow(this.heroes.getCurrent());

		this.enemies.create();

		startTimer();
	},
	update : function() {
		"use strict";
		this.heroes.update(layer, this.enemies);
		this.enemies.update(layer);
		if (!this.heroes.isAlive()) {
			this.game.state.start('GameOver');

		}
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

function printPosition() {
	posicao.content = Math.floor(dino.x) + " " + Math.floor(dino.y);
}

function getTime() {
	now = new Date();
	nowSecond = now.getSeconds();

}

function timer() {
	getTime();

	if (startSecond > nowSecond) {
		timerSecond = startSecond - nowSecond;
	} else {
		timerSecond = nowSecond - startSecond;
	}

}

function startTimer() {
	date = new Date();
	nowSecond = date.getSeconds();

	setInterval("timer()", 1000);
}