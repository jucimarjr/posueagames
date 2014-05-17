var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update  });
var barrasMedias;
var barrasPqnas;
var barraInicial;
var objetos;
var dinoSprite;
var plataforma;

function preload () {
	game.load.image('fundo', 'assets/fundo-960-600.png');
	game.load.image('plataforma', 'assets/larva-960-138.png');
	game.load.image('barra1', 'assets/barras/barra1-86-28.png');
	game.load.image('barra2', 'assets/barras/barra2-56-29.png');
	game.load.image('barra3', 'assets/barras/barra3-33-28.png');
	game.load.image('bola', 'assets/elipse-51-51.png');
	game.load.image('estrela', 'assets/estrela-22-20.png');
	game.load.image('trofeu', 'assets/trofeu-20-31.png');
	game.load.spritesheet('dino', 'assets/dinossauro.png', 30,28);//200,160
}

function create () {
	//var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'fundo');
	game.add.sprite(0,0, 'fundo');
	
	// personagem:
	dinoSprite = game.add.sprite(20, game.world.height-200, 'dino');
	dinoSprite.animations.add('walk',[1,2],6,true);
	dinoSprite.animations.add('jump',[3,4,5],4,true);
	game.physics.enable(dinoSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    dinoSprite.body.acceleration.y = 100;
    dinoSprite.body.collideWorldBounds = true; // para no limite inferio da tela
    dinoSprite.body.drag.x = 100; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    dinoSprite.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento 
    dinoSprite.body.gravity.y = 90;
    
    initPlataforma();
    initBarraInicial();
	initBarrasMedia();
	initBarrasPqnas();
	bolas();
	pegarObejtos();
}

function initPlataforma(){
	plataforma = game.add.group();
	plataforma.enableBody = true;
	var barra = plataforma.create(0,game.world.height-138, 'plataforma');
	barra.body.immovable = true;
    game.physics.enable(plataforma, Phaser.Physics.ARCADE);
}

function initBarraInicial(){
	barraInicial = game.add.group();
	barraInicial.enableBody = true;
	var barra = barraInicial.create(10,game.world.height-178, 'barra1');
	barra.body.immovable = true;
    game.physics.enable(barraInicial, Phaser.Physics.ARCADE);
}

function initBarrasMedia(){
	
	barrasMedias = game.add.group();
	barrasMedias.enableBody = true;
	var barra = barrasMedias.create(120,game.world.height-220, 'barra2');
	barra.body.immovable = true;
	barra = barrasMedias.create(315,game.world.height-220, 'barra2');
	barra.body.immovable = true;
	barra =barrasMedias.create(395,game.world.height-250, 'barra2');
	barra.body.immovable = true;
	barra =barrasMedias.create(550,game.world.height-220, 'barra2');
	barra.body.immovable = true;
	barra =barrasMedias.create(640,game.world.height-250, 'barra2');
	barra.body.immovable = true;
	barra =barrasMedias.create(730,game.world.height-280, 'barra2');
	barra.body.immovable = true;
	
    game.physics.enable(barrasMedias, Phaser.Physics.ARCADE);
}

function initBarrasPqnas(){
	
	barrasPqnas = game.add.group();
	barrasPqnas.enableBody = true;
	var barra = barrasPqnas.create(210,game.world.height-250, 'barra3');
	barra.body.immovable = true;
	barra =barrasPqnas.create(510,game.world.height-178, 'barra3');
	barra.body.immovable = true;
	barra =barrasPqnas.create(820,game.world.height-310, 'barra3');
	barra.body.immovable = true;
	barra =barrasPqnas.create(920,game.world.height-178, 'barra3');
	barra.body.immovable = true;
	
    game.physics.enable(barrasPqnas, Phaser.Physics.ARCADE);
}

function bolas(){
	/*game.add.sprite(255,game.world.height-250, 'bola');
	game.add.sprite(455,game.world.height-178, 'bola');
	game.add.sprite(860,game.world.height-178, 'bola');*/
}

function pegarObejtos(){
	objetos = game.add.group();
	objetos.create(215,game.world.height-275, 'estrela');
	objetos.create(515,game.world.height-203, 'estrela');
	objetos.create(825,game.world.height-335, 'estrela');
	objetos.create(925,game.world.height-214, 'trofeu');
    game.physics.enable(objetos, Phaser.Physics.ARCADE);
}

function update () {
	
	// cria uma barreira que o sprite pode pisar
	game.physics.arcade.collide(dinoSprite, barrasPqnas);
	game.physics.arcade.collide(dinoSprite, barrasMedias);
	game.physics.arcade.collide(dinoSprite, barraInicial);

	// COLISAO COM OSSO:
	game.physics.arcade.overlap(dinoSprite, objetos, pegarObjetos,null,this);
	game.physics.arcade.overlap(dinoSprite, plataforma, gameOver,null,this);


	// PEGA A ENTRADA (tecla pressionada):	
	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
		dinoSprite.body.velocity.x = -100;
		dinoSprite.animations.play('walk');
		dinoSprite.scale.x = -1; // espelha se antes -1
	}
	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita
		dinoSprite.body.velocity.x = 100;
		dinoSprite.scale.x = +1;  // espelha se antes 1
		dinoSprite.animations.play('walk');
	}
	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		dinoSprite.body.velocity.y = -100;
		dinoSprite.animations.play('jump');
	}
	else{
	    	dinoSprite.animations.stop();
			dinoSprite.frame = 0;
		}	
}

function pegarObjetos (dino,objetos){
	objetos.kill();	
}

function gameOver (dino,plataforma)	{
	dino.kill();
}