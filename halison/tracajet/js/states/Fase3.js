
State.Fase3= function (game) {
	"use strict";
	this.game = game;
	this.map;
};


State.Fase3.prototype = {

	preload: function () {
		game.load.tilemap('mapa3',Config.game.fase3.background,null,Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tracajet', Config.game.tracajet.dir, Config.game.tracajet.width,Config.game.tracajet.height);
		game.load.spritesheet('frutas', Config.game.fase3.frutas,24,30);
		game.load.image('bg3',Config.game.fase3.background);
		game.load.image('tilesetPlataforma3',Config.game.fase3.nuvens);
	
	},

	create: function () {
	    game.stage.backgroundColor = '#2d2d2d';
	    var bg3 = game.add.tileSprite(0, 0, game.stage.bounds.width,game.cache.getImage('bg3').height, 'bg3');
	    game.physics.startSystem(Phaser.Game.ARCADE);
	    this.map = game.add.tilemap('mapa3'); 
		this.map.addTilesetImage('nuvens_120-40-4','tilesetPlataforma3' );
		this.layer = this.map.createLayer('Camada de Tiles 1');
		this.layer.resizeWorld(); 
		this.map.setCollisionBetween(1,12, true,'Camada de Tiles 1'); // 0 espaco vazio 1 em diante os tiles do tileset
		this.tracajet = game.add.sprite(100, 100, 'tracajet');
		this.tracajet.animations.add('walk',[0,1,2,1],6,false);
		this.tracajet.animations.add('swim',[5,6,7],6,false);
		this.tracajet.animations.add('startSwim',[3,4],4,true);
		game.physics.enable(this.tracajet, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		this.tracajet.body.acceleration.y = 20;
		this.tracajet.body.collideWorldBounds = true;
		this.tracajet.anchor.setTo(.5,.5);
	    game.camera.follow(this.tracajet);
	},


	update: function () {
		game.physics.arcade.collide(this.tracajet, this.layer);
	}

};


