
var assets = "assets/";

window.onload = function() {

//	var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create });
	var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	var plataformas;
	var base;
	var macaco;
	
	function preload () {
		game.load.image('background', assets + 'background_960-600.png');
		game.load.image('barra', assets + 'barra_250-30.png');
		game.load.image('base', assets + 'base_960-50.png');
//		game.load.image('boneco', assets + 'boneco_80-100.png');
		
		game.load.spritesheet('macaco', assets + '/macaco_45-62-7.png', 45, 62); // 44x62 eh o tamanho do frame da sprite
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
		
		
//		boneco = game.add.sprite(game.world.centerX, 500, 'boneco');
//		boneco.anchor.setTo(0.5, 0.5);
//		game.physics.enable(boneco, Phaser.Physics.ARCADE);
//		boneco.body.gravity.y = 500;
//		boneco.body.drag.x = 100;
//		boneco.body.collideWorldBounds = true; // para no limite da tela
//		boneco.body.acceleration.y = 150;
		
		
		macaco = game.add.sprite(game.world.centerX, 500, 'macaco');
		macaco.anchor.setTo(0.5, 0.5);
		macaco.animations.add('walk', [1, 2, 3, 4, 5], 8, true); /// key, frames, speed, loop
		//dinoSprite.animations.add('jump', [3,4,5], 4, false);
		game.physics.enable(macaco, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		macaco.body.gravity.y = 500;
		macaco.body.drag.x = 2000;
		macaco.body.collideWorldBounds = true; // para no limite da tela
		macaco.body.acceleration.y = 150;
	}
	
	function update() {
		
		// cria uma barreira que o sprite pode pisar
		game.physics.arcade.collide(macaco, plataformas);
		
		// PEGA A ENTRADA (tecla pressionada):	
		if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
			
			macaco.body.velocity.x = -200;
			macaco.scale.x = -1; // espelha se antes -1
			macaco.animations.play('walk');
		}
		else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita
			
			macaco.body.velocity.x = 200;
			macaco.scale.x = +1;  // espelha se antes 1
			macaco.animations.play('walk');
		}
		else {
			
			macaco.animations.stop();
			macaco.frame = 0;
		}
		
		if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima
			
			macaco.body.velocity.y = -300;
//			boneco.animations.play('jump');
		}
		
		
		
	}
	
};