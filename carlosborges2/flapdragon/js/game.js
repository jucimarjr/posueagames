
var assets = "assets/";

var KEY_BACKGROUND = 'background';
var KEY_DRAGON = 'dragon';

var MAX_NUM_DRAGON = 10;

window.onload = function() {

//	var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create });
	var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	var dragons, arrayDragon = [];
//	var macaco;
	
	function preload () {
		game.load.image(KEY_BACKGROUND, assets + 'background_960-600.png');
		game.load.image(KEY_DRAGON, assets + 'dragon_480-90.png');
		
//		game.load.spritesheet('macaco', assets + '/macaco_44-62-6.png', 45, 62); // 44x62 eh o tamanho do frame da sprite
		
		// init array
		for(var count = 0; count < MAX_NUM_DRAGON; count++) {
			arrayDragon[count] = null;
		}
		
	}

	function create () {
		
		game.add.sprite(0, 0, KEY_BACKGROUND); // background
		
		
		dragons = game.add.group();
		dragons.enableBody = true;
		
		setTimeout(createDragon, 1000);
		
		//createDragon();
		
		
//		plataformas.enableBody = true;
//		
//		base = plataformas.create(0, 550, 'base');
//		base.body.immovable = true; // deixa o bloco imovivel
//		
//		
//		var barra = plataformas.create(game.world.centerX, 415, 'barra');
//		barra.anchor.setTo(0.5, 0.5);
//		barra.body.immovable = true; // deixa o bloco imovivel
//		
//		barra = plataformas.create(game.world.centerX, 115, 'barra');
//		barra.anchor.setTo(0.5, 0.5);
//		barra.body.immovable = true; // deixa o bloco imovivel
//		
//		barra = plataformas.create(game.world.centerX - 300, 265, 'barra');
//		barra.anchor.setTo(0.5, 0.5);
//		barra.body.immovable = true; // deixa o bloco imovivel
//		
//		barra = plataformas.create(game.world.centerX + 300, 265, 'barra');
//		barra.anchor.setTo(0.5, 0.5);
//		barra.body.immovable = true; // deixa o bloco imovivel
		
		
//		boneco = game.add.sprite(game.world.centerX, 500, 'boneco');
//		boneco.anchor.setTo(0.5, 0.5);
//		game.physics.enable(boneco, Phaser.Physics.ARCADE);
//		boneco.body.gravity.y = 500;
//		boneco.body.drag.x = 100;
//		boneco.body.collideWorldBounds = true; // para no limite da tela
//		boneco.body.acceleration.y = 150;
		
		
//		macaco = game.add.sprite(game.world.centerX, 500, 'macaco');
//		macaco.anchor.setTo(0.5, 0.5);
//		macaco.animations.add('walk', [1, 2, 3, 4, 5], 8, true); /// key, frames, speed, loop
//		//dinoSprite.animations.add('jump', [3,4,5], 4, false);
//		game.physics.enable(macaco, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
//		macaco.body.gravity.y = 500;
//		macaco.body.drag.x = 2000;
//		macaco.body.collideWorldBounds = true; // para no limite da tela
//		macaco.body.acceleration.y = 150;
	}
	
	function update() {
		
		
		moveDragons();
		
	}
	
	function moveDragons() {
		
		// move dragons
		for(var count = 0; count < MAX_NUM_DRAGON; count++) {
			
			if(arrayDragon[count] != null) {
				arrayDragon[count].body.velocity.x = -200;
				
				if( (arrayDragon[count].body.x + arrayDragon[count].body.width) < 0 ) {
					arrayDragon[count].kill();
					arrayDragon[count] = null;
				}
			}
		}
		
	}
	
//	function update() {
//		
//		// cria uma barreira que o sprite pode pisar
//		game.physics.arcade.collide(macaco, plataformas);
//		
//		// PEGA A ENTRADA (tecla pressionada):	
//		if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
//			
//			macaco.body.velocity.x = -200;
//			macaco.scale.x = -1; // espelha se antes -1
//			macaco.animations.play('walk');
//		}
//		else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita
//			
//			macaco.body.velocity.x = 200;
//			macaco.scale.x = +1;  // espelha se antes 1
//			macaco.animations.play('walk');
//		}
//		else {
//			
//			macaco.animations.stop();
//			macaco.frame = 0;
//		}
//		
//		if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima
//			
//			macaco.body.velocity.y = -300;
////			boneco.animations.play('jump');
//		}
//		
//		
//		
//	}
	
	function createDragon() {
		
		// get random y
		var y = game.rnd.integerInRange(20, 500);
		
		// create a dragon in first free array item
		for(var count = 0; count < MAX_NUM_DRAGON; count++) {
			
			if(arrayDragon[count] == null) {
				arrayDragon[count] = dragons.create(game.world.bounds.width, y, KEY_DRAGON);
				break;
			}
		}
		
		setTimeout(createDragon, 1000);
	}
	
};