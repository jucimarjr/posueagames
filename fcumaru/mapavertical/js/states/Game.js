State.Game = function(game) {
	"use strict";
	this.game = game;
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
		this.game.load.image('fundo', 'assets/fundo_960_1200.png');
		this.game.load.image('tileset', 'assets/grama2.png');
		this.game.load.spritesheet('dino', 'assets/dinossauro_40-32-6.png', 40,
				32, 6);
		this.game.load.image('fat_vein', 'assets/backgroundmask_960-490.png',
				500, 190);
	},
	create : function() {
		"use strict";
		game.physics.startSystem(Phaser.Game.ARCADE);
		game.physics.arcade.gravity.y = 800;

		var bg = game.add.tileSprite(0, 0, 1920, 600, 'fundo');
		bg.fixedToCamera = true;

		map = game.add.tilemap('mapa');
		map.addTilesetImage('tileset', 'tileset');

		layer = map.createLayer('Camada de Tiles 1');
		layer.resizeWorld(); // seta o mundo com as alterações feitas
		map.setCollisionBetween(0, 1, true, 'Camada de Tiles 1'); // 0 espaco

		dino = game.add.sprite(10, 500, 'dino', 3);
		dino.animations.add('walk', [ 1, 2 ], 6, true);
		dino.animations.add('jump', [ 3, 4, 5 ], 4, true);
		game.physics.enable(dino, Phaser.Physics.ARCADE); // permite que a
		// sprite
		// tenha um corpo fisico

		// gorduras e veias
		this.fatVein = this.game.add.tileSprite(0, 57, game.stage.bounds.width,
				game.cache.getImage('fat_vein').height, 'fat_vein');
		this.fatVein.autoScroll(-30, 0);
		
		dino.body.acceleration.y = 100;

		dino.body.collideWorldBounds = true; // para no limite inferio da
		// tela
		dino.body.drag.x = 100; // desloca 100 e para, só desloca de novo se
		// clicada alguma tecla e quanto maior for seu
		// valor, menos desloca
		dino.anchor.setTo(.5, .5); // diminui o espaco do deslocamento do
		// espelhamento
		dino.body.gravity.y = 150;
		game.camera.follow(dino);

		var style = {
			font : "20px Courier",
			fill : "#000000"
		};
		posicao = game.add.text(10, 550, Math.floor(dino.x) + " "
				+ Math.floor(dino.y), style);
		posicao.fixedToCamera = true;

		score = game.add.text(500, 550, "Tempo : " + timerSecond, style);
		score.fixedToCamera = true;
		startTimer();

	},
	update : function() {

		"use strict";
		game.physics.arcade.collide(layer, dino);
		game.physics.arcade.overlap(group, dino, eatCoxa, null, this);
		posicao.setText(Math.floor(dino.x) + " " + Math.floor(dino.y));
		score.setText("Tempo : " + timerSecond);

		// PEGA A ENTRADA (tecla pressionada):
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { // vai para
			// esquerda
			dino.body.velocity.x = -100;
			dino.animations.play('walk');
			dino.scale.x = -1; // espelha se antes -1
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { // vai
			// para
			// direita
			dino.body.velocity.x = 100;
			dino.scale.x = +1; // espelha se antes 1
			dino.animations.play('walk');
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) { // vai
			// para
			// cima

			dino.body.velocity.y = -100;
			dino.animations.play('jump');
		} else {
			dino.animations.stop();
			dino.frame = 0;
		}
	}
};

function printPosition() {
	posicao.content = Math.floor(dino.x) + " " + Math.floor(dino.y);
}
function eatCoxa(dino, coxa) {
	coxa.kill();
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