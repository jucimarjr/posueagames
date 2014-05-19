
var dinoSprite, ossos;

var game;

game = new Phaser.Game(800, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {

	game.stage.backgroundColor = "#000";
	game.load.spritesheet('dino', 'assets/dinossauro.png', 200,160); // tamanho do frame, não é o tam. da img.
	game.load.image('osso', 'assets/osso.png');

}

function create () {
	
	// CREATE A dino:
	dinoSprite = game.add.sprite(400, 10, 'dino'); // posicao inicial do sprite 'dino'
	dinoSprite.animations.add('walk',[1,2,3],10,true); // ( <string de identificacao>, <numero do sprite>, <velocidade da animcacao>, <true?>) 
	dinoSprite.animations.add('jump',[4,5],4,true);
	game.physics.enable(dinoSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    dinoSprite.body.acceleration.y = 50;
    dinoSprite.body.collideWorldBounds = true; // para no limite inferior da tela
    dinoSprite.body.drag.x = 100; //desloca 100 e para, sÃ³ desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    dinoSprite.anchor.setTo(.5,.5); // diminui o espaço do deslocamento do espelhamento 
    dinoSprite.body.gravity.y = 250;
   
    // CREATE A OSSO GROUP:
    ossos = game.add.group();
    ossos.create( 50, 350, 'osso');
    ossos.create( 550, 350, 'osso');
    ossos.create( 200, 350, 'osso'); 
    game.physics.enable(ossos, Phaser.Physics.ARCADE);
}


function update () {

	// COLISAO COM OSSO:
	game.physics.arcade.overlap(dinoSprite, ossos, dinoEatosso,null,this);


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

function dinoEatosso (dino,osso)	{

		osso.kill();
}

