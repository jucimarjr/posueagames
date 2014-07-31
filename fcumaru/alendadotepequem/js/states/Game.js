State.Game = function(game) {
	"use strict";
	this.game = game;
	this.heroes = new Heroes(game);
	this.enemies = new Enemies(game);
	this.flames = new Flames(game);
	this.rocks = new Rocks(game);
	this.trees = new Trees(game);
	this.portal = new Portal(game);
	this.reset = false;
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
		this.heroes.preload();
		this.enemies.preload();
		this.flames.preload();
		this.rocks.preload();
		this.trees.preload();
		this.portal.preload();
	},
	init : function(){
		// ajustando estado dos herois
		if(this.reset){
			this.heroes.heroes[0].state = "idle";
			this.heroes.heroes[0].hero.life = 1;
			this.heroes.heroes[1].state = "idle";
			this.heroes.heroes[1].hero.life = 1;
			this.heroes.heroes[2].state = "idle";
			this.heroes.heroes[2].hero.life = 1;
			console.log("reseted");
		}
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

		//Som do background
		this.game.bgmusic = game.add.audio('bgmusic');
		this.game.bgmusic.play('', 0, 1, true);

//		 // clouds
//		 this.clouds = this.game.add.tileSprite(0, 0, 4320, 2700, 'clouds');
//		 this.clouds.autoScroll(-30, 0);
//		
//		 // faisca
//		 this.faisca = this.game.add.tileSprite(0, 0, game.stage.bounds.width,
//		 game.cache.getImage('faiscas').height, 'faiscas');
//		 this.faisca.autoScroll(25, 80);

		this.heroes.create();
		this.game.camera.follow(this.heroes.getCurrent());

		this.enemies.create();
		this.flames.create();
		this.rocks.create();
		this.trees.create();
		this.portal.create();
		this.reset = true; // resetar tudo da próxima vez que carregar o estado
	},
	update : function() {
		"use strict";
		this.heroes.update(this.layer, this.enemies);
		this.enemies.update(this.layer, this.heroes);
		this.trees.update(this.layer);
		this.flames.update(this.layer);
		this.flames.checkCollision(this.heroes);
		this.rocks.update(this.layer);
		this.rocks.checkCollision(this.heroes);
		this.trees.checkCollision(this.heroes.getCurrent());
		if (this.heroes.heroes[this.heroes.index].type === HERO_OF_ROPE) {
			this.trees.ropeCollision(this.heroes.heroes[this.heroes.index]
					.getRope(),
					this.heroes.heroes[this.heroes.index].facingLeft);
		}
		if (!this.heroes.isAlive()) {
			var selected = this.heroes.getSelectedHero();
			if(selected.state === "dead") return;
			selected.state = "dying";
			setTimeout(this.gameOver, 2000);
		}
	},

	gameOver : function () {
		this.game.bgmusic.stop();
		this.game.state.start('GameOver');
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
