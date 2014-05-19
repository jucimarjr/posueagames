var game = new Phaser.Game(500, 600, Phaser.AUTO, 'game_div', { preload: preload, create: create, update: update  });
var bike;
var velocity = 200;
function preload () {
	game.load.image('fundo', 'assets/bg_500-600.jpg');
	game.load.spritesheet('bike', 'assets/bike_37-80-4.jpg', 37,80,4);//200,160
}

function create () {
	//var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'fundo');
	game.add.sprite(0,0, 'fundo');
	
	// personagem:
	bike = game.add.sprite((500-37)/2, 600-80-10, 'bike');
	bike.animations.add('run');
	bike.animations.play('run', 8, true);
	//bike.animations.add('jump',[3,4,5],4,true);
	game.physics.enable(bike, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    //bike.body.acceleration.y = 100;
    bike.body.collideWorldBounds = true; // para no limite inferio da tela
    bike.body.drag.x = 200; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    /* 
    bike.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento 
    bike.body.gravity.y = 90;*/
    /*initPlataforma();
    initBarraInicial();
	initBarrasMedia();
	initBarrasPqnas();
	bolas();
	pegarObejtos();*/
}

/*function initPlataforma(){
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
	//game.add.sprite(255,game.world.height-250, 'bola');
	//game.add.sprite(455,game.world.height-178, 'bola');
	//game.add.sprite(860,game.world.height-178, 'bola');
}

function pegarObejtos(){
	objetos = game.add.group();
	objetos.create(215,game.world.height-275, 'estrela');
	objetos.create(515,game.world.height-203, 'estrela');
	objetos.create(825,game.world.height-335, 'estrela');
	objetos.create(925,game.world.height-214, 'trofeu');
    game.physics.enable(objetos, Phaser.Physics.ARCADE);
}
*/
function update () {
	
	// cria uma barreira que o sprite pode pisar
	/*game.physics.arcade.collide(bike, barrasPqnas);
	game.physics.arcade.collide(bike, barrasMedias);
	game.physics.arcade.collide(bike, barraInicial);*/

	// COLISAO COM OSSO:
	/*game.physics.arcade.overlap(bike, objetos, pegarObjetos,null,this);
	game.physics.arcade.overlap(bike, plataforma, gameOver,null,this);*/


	// PEGA A ENTRADA (tecla pressionada):	
	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
		goRight();
		//bike.scale.x = -1; // espelha se antes -1
	}
	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita
		goLeft();
	}
	/*else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		bike.body.velocity.y = -100;
		bike.animations.play('jump');
	}*/
	/*else{
	    	bike.animations.stop();
			bike.frame = 0;
		}	*/
}

function goRight(){
	bike.body.velocity.x = -velocity;
	bike.animations.play('walk');
}


function goLeft(){
	bike.body.velocity.x = velocity;
	bike.animations.play('walk');
}