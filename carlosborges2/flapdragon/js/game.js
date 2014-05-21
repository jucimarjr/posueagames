
var assets = "assets/";

var KEY_BG_SKY = 'sky_960-600.jpg';
var KEY_BG_MOUNTAIN = 'mountain_1366-500.png';
var KEY_BG_CITY = 'bg_city_1000-350..png';
var KEY_BACKGROUND = 'background';
var KEY_DRAGON = 'dragon_480-90.png';
var KEY_DRAGON_SHEET = 'dragon_sheet_vert_480-90-3.png';

var MAX_NUM_DRAGON = 10;

var BG_MOUNTAIN_Y = 190;
var BG_CITY_Y = 350;

var VEL_MOUNTAIN = -20;
var VEL_CITY = -100;
var VEL_DRAGON = -200;

var ANIM_DRAGON_FLY = 'ANIM_DRAGON_FLY';

window.onload = function() {

//	var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create });
	var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	var dragons, arrayDragon = [];
//	var macaco;
	
	var mountainGroup = null;
	var arrayMountain = [];
	
	var cityGroup = null;
	var arrayCity = [];
	
	function preload () {
		game.load.image(KEY_BG_SKY, assets + KEY_BG_SKY);
		game.load.image(KEY_BG_MOUNTAIN, assets + KEY_BG_MOUNTAIN);
		game.load.image(KEY_BG_CITY, assets + KEY_BG_CITY);
		game.load.image(KEY_BACKGROUND, assets + 'background_960-600.png');
		game.load.image(KEY_DRAGON, assets + KEY_DRAGON);
		
		game.load.spritesheet(KEY_DRAGON_SHEET, assets + KEY_DRAGON_SHEET, 480, 90); // 44x62 eh o tamanho do frame da sprite
		
		// init array
		for(var count = 0; count < MAX_NUM_DRAGON; count++) {
			arrayDragon[count] = null;
		}
		
	}

	function create () {
		
		game.add.sprite(0, 0, KEY_BG_SKY); // background
		
		// creating mountains
		mountainGroup = game.add.group();
		
		arrayMountain[0] = mountainGroup.create(0, BG_MOUNTAIN_Y, KEY_BG_MOUNTAIN);
		arrayMountain[1] = mountainGroup.create(arrayMountain[0].x + arrayMountain[0].width, BG_MOUNTAIN_Y, KEY_BG_MOUNTAIN);
		
		game.physics.enable(arrayMountain[0], Phaser.Physics.ARCADE);
		game.physics.enable(arrayMountain[1], Phaser.Physics.ARCADE);
		
		arrayMountain[0].body.velocity.x = VEL_MOUNTAIN;
		arrayMountain[1].body.velocity.x = VEL_MOUNTAIN;
		
		
		// creating cities
		cityGroup = game.add.group();
		
		arrayCity[0] = cityGroup.create(0, BG_CITY_Y, KEY_BG_CITY);
		arrayCity[1] = cityGroup.create(arrayCity[0].x + arrayCity[0].width, BG_CITY_Y, KEY_BG_CITY);
		
		game.physics.enable(arrayCity[0], Phaser.Physics.ARCADE);
		game.physics.enable(arrayCity[1], Phaser.Physics.ARCADE);
		
		arrayCity[0].body.velocity.x = VEL_CITY;
		arrayCity[1].body.velocity.x = VEL_CITY;
		
		
		
		
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
		
		moveMountains();
		moveCities();
		
		
		moveDragons();
		
	}
	
	function moveCities() {
		
//		console.log("arrayMountain: "+arrayMountain[0].body.x);
		
		// move dragons
		for(var count = 0; count < 2; count++) {
			
			if(arrayCity[count] != null) {
				
				if( arrayCity[count].body.x < -arrayCity[count].body.width ) {
					
					// getting other image index
					var otherIndex = 0;
					if(count == 0) {
						otherIndex = 1;
					} 
					
					arrayCity[count].body.x = arrayCity[otherIndex].body.x + arrayCity[otherIndex].body.width;
					
				}
			}
		}

	}
	function moveMountains() {

//		console.log("arrayMountain: "+arrayMountain[0].body.x);

		// move dragons
		for(var count = 0; count < 2; count++) {

			if(arrayMountain[count] != null) {

				if( arrayMountain[count].body.x < -arrayMountain[count].body.width ) {

					// getting other image index
					var otherIndex = 0;
					if(count == 0) {
						otherIndex = 1;
					} 

					arrayMountain[count].body.x = arrayMountain[otherIndex].body.x + arrayMountain[otherIndex].body.width;

				}
			}
		}

	}

	function moveDragons() {
		
		// move dragons
		for(var count = 0; count < MAX_NUM_DRAGON; count++) {
			
			if(arrayDragon[count] != null) {
				
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
				arrayDragon[count] = dragons.create(game.world.bounds.width, y, KEY_DRAGON_SHEET);
				
				arrayDragon[count].body.velocity.x = VEL_DRAGON;
				
				arrayDragon[count].animations.add(ANIM_DRAGON_FLY, [0, 1, 2], 8, true); /// key, frames, speed, loop
				
				arrayDragon[count].animations.play(ANIM_DRAGON_FLY);
				
				break;
			}
		}
		
		setTimeout(createDragon, 1000);
	}
	
};