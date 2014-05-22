
var game;

var nave;

var background;

var velocity = 350;
var bottomPosX = 350;

game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	game.load.image('nave1', 'assets/nave1_100-45.png'); 
	game.load.image('nave2', 'assets/nave2_50-25.png');
	game.load.image('ceu', 'assets/ceu_960-600.png');
	game.load.image('asteroid1', 'assets/asteroids1_48-43.png');
	game.load.image('asteroid2', 'assets/asteroids2_87-100.png');
	game.load.image('asteroid3', 'assets/asteroids3_178-175.png');
	game.load.image('bottom', 'assets/bottom_960-100.png');
}

function create () {
    background = game.add.sprite(0, 0, 'ceu');
	nave = game.add.sprite(450, 400, 'nave1');
	bottomPosX = 0;
	bottom = game.add.sprite(bottomPosX, 500, 'bottom');
//	game.physics.enable(nave, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
//    nave.body.acceleration.y = 150;
//    nave.body.collideWorldBounds = true; // para no limite inferior da tela
//    nave.body.drag.x = 100; //desloca 100 e para, sÃ³ desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
//    nave.anchor.setTo(.5,.5); // diminui o espaço do deslocamento do espelhamento 
//    nave.body.gravity.y = 100;
   
}


function update () {
	bottomPosX--;
//	Realizar colisão entre 'osso' e 'dino', chama função dinoEatOsso
//	game.physics.arcade.overlap(nave, ossos, dinoEatOsso,null,this);
//
//  Capturar entrada (tecla esquerda)	
//	if ( game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ) { 
//		nave.body.velocity.y = -velocity;
//		nave.animations.play('move');
//	}
//	
//	Capturar entrada (tecla direita)
//	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) {
//		nave.body.velocity.y = velocity;
//		nave.animations.play('moveTop');
		
//	} else {
//	    	nave.animations.stop();
//			nave.frame = 0;
//	}	
}

