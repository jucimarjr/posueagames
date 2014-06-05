State.Game = function(game) {
	"use strict";
	this.game = game;
	this.heroes = new Heroes(game);
};

var dino, layer, group, map, posicao;

State.Game.prototype = {
	preload : function() {
		this.game.load.tilemap('mapa', 'assets/mapa_vertical.json', null,
				Phaser.Tilemap.TILED_JSON);
		this.game.load.image('fundo', 'assets/fundo_960_1200.png');
		this.game.load.image('tileset', 'assets/grama2.png');
		this.heroes.preload();
	},
	create : function() {
		"use strict";
		this.game.physics.startSystem(Phaser.Game.ARCADE);
		this.game.physics.arcade.gravity.y = 800;

		var bg = this.game.add.tileSprite(0, 0, 1920, 600, 'fundo');
		bg.fixedToCamera = true;

		map = this.game.add.tilemap('mapa');
		map.addTilesetImage('tileset', 'tileset');

		layer = map.createLayer('Camada de Tiles 1');
		layer.resizeWorld(); // seta o mundo com as alterações feitas
		map.setCollisionBetween(0, 1, true, 'Camada de Tiles 1'); // 0 espaco

		this.heroes.create();
		this.game.camera.follow(this.heroes.getCurrent());

		var style = {
			font : "20px Courier",
			fill : "#000000"
		};
		posicao = this.game.add.text(10, 550, Math.floor(dino.x) + " "
				+ Math.floor(dino.y), style);
		posicao.fixedToCamera = true;
	},
	update : function() {
		"use strict";
		this.game.physics.arcade.collide(layer, dino);

		this.heroes.update(layer);
	}
};

function printPosition() {
	posicao.content = Math.floor(dino.x) + " " + Math.floor(dino.y);
}