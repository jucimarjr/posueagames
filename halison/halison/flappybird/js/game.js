
var universo, naveSprite, asteroide;

var game;

game = new Phaser.Game(800, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	game.load.image('universo', 'assets/universo.png');
	game.load.image('nave', 'assets/nave.png'); // tamanho do frame, não é o tam. da img.
	game.load.image('asteroide', 'assets/asteroide.png');


}

function create () {
	
	// create o universo
    game.add.sprite(0, 0, 'universo');
	
	// create a nave 
	
	naveSprite = game.add.sprite(0, 0, 'nave'); // posicao inicial do sprite nave
	//naveSprite.animations.add('walk',[1,2,3],10,true); // ( <string de identificacao>, <numero do sprite>, <velocidade da animcacao>, <true?>) 
	//naveSprite.animations.add('jump',[4,5],4,true);
	game.physics.enable(naveSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    naveSprite.body.acceleration.y = 50;
    naveSprite.body.collideWorldBounds = true; // para no limite inferior da tela
    naveSprite.body.drag.x = 100; //desloca 100 e para, sÃ³ desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    naveSprite.anchor.setTo(.5,.5); // diminui o espaço do deslocamento do espelhamento 
    naveSprite.body.gravity.y = 250;
   
    // create os asteroides:
    asteroide = game.add.group();
    asteroide.create( 100, 400, 'asteroide');
    asteroide.create( 350, 150, 'asteroide');
    asteroide.create( 200, 350, 'asteroide'); 
    game.physics.enable(asteroide, Phaser.Physics.ARCADE);
}


function update () {

	// COLISAO COM OSSO:
	game.physics.arcade.overlap(naveSprite, asteroide, naveEatasteroide,null,this);


	// PEGA A ENTRADA (tecla pressionada):	
	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda

		naveSprite.body.velocity.x = -100;
		naveSprite.animations.play('walk');
		naveSprite.scale.x = -1; // espelha se antes -1
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita

		naveSprite.body.velocity.x = 100;
		naveSprite.scale.x = +1;  // espelha se antes 1
		naveSprite.animations.play('walk');
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		naveSprite.body.velocity.y = -100;
		naveSprite.animations.play('jump');
	}

	else{
	    	naveSprite.animations.stop();
			naveSprite.frame = 0;
		}	
}

function naveEatasteroide (nave,asteroide)	{

		asteroide.kill();
}