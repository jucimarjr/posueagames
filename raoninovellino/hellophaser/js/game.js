
var assets = "assets/";

window.onload = function() {

	var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	var plataformas;
	var base;
	var boneco;
	
	function preload () {
		game.load.image('background', assets + 'background_960-600.png');
		game.load.image('barra', assets + 'barra_250-30.png');
		game.load.image('base', assets + 'base_960-50.png');
		game.load.image('boneco', assets + 'boneco_80-100.png');
	}

	function create () {
		
		game.add.sprite(0, 0, 'background'); // background
		
		
		
		plataformas = game.add.group();
		plataformas.enableBody = true;
		
		base = plataformas.create(0, 550, 'base');
		base.body.immovable = true; // deixa o bloco imovivel
		
		
		var barra = plataformas.create(game.world.centerX, 415, 'barra');
		barra.anchor.setTo(0.5, 0.5);
		barra.body.immovable = true; // deixa o bloco imovivel
		
		barra = plataformas.create(game.world.centerX, 115, 'barra');
		barra.anchor.setTo(0.5, 0.5);
		barra.body.immovable = true; // deixa o bloco imovivel
		
		barra = plataformas.create(game.world.centerX - 300, 265, 'barra');
		barra.anchor.setTo(0.5, 0.5);
		barra.body.immovable = true; // deixa o bloco imovivel
		
		barra = plataformas.create(game.world.centerX + 300, 265, 'barra');
		barra.anchor.setTo(0.5, 0.5);
		barra.body.immovable = true; // deixa o bloco imovivel
		
		
		boneco = game.add.sprite(game.world.centerX, 500, 'boneco');
		boneco.anchor.setTo(0.5, 0.5);
		game.physics.enable(boneco, Phaser.Physics.ARCADE);
		boneco.body.gravity.y = 500;
		boneco.body.drag.x = 100;
		boneco.body.collideWorldBounds = true; // para no limite da tela
		boneco.body.acceleration.y = 150;
	}
	
	function update() {
		
		// cria uma barreira que o sprite pode pisar
		game.physics.arcade.collide(boneco, plataformas);
		
		// PEGA A ENTRADA (tecla pressionada):	
		if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda

			boneco.body.velocity.x = -200;
			boneco.scale.x = -1; // espelha se antes -1
//			boneco.animations.play('walk');
		}

		else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita

			boneco.body.velocity.x = 200;
			boneco.scale.x = +1;  // espelha se antes 1
//			boneco.animations.play('walk');
		}

		if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

			boneco.body.velocity.y = -300;
//			boneco.animations.play('jump');
		}
		
	}
	
};