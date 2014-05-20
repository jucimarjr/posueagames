
var nave;

var game;

var velocidade = 350;

game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
//	game.load.spritesheet('nave', 'assets/sprite_nave_8153_320.png',455,320); // tamanho do frame, não é o tam. da img.
	game.load.spritesheet('nave', 'assets/sprite_nave_3600_141.png',200.3,141); // tamanho do frame, não é o tam. da img.
//	game.load.image('ceu', 'assets/ceu_960_600.png');
//	game.load.image('ceu2', 'assets/background2_1229_768.png');
	game.load.image('ceu3', 'assets/background1_1920_1280.png');
}

function create () {
	
	
	// Adicionar o céu
    this.backround = game.add.sprite(0, 0, 'ceu3');

	// Criar 'nave'
	nave = game.add.sprite(450, 400, 'nave');
	nave.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 
	                                 8, 7, 6, 5, 4, 3, 2, 1],
	                                 10, true); // ( <string de identificacao
//	nave.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 
//                                 8, 7, 6, 5, 4, 3, 2, 1],
//                                 20, true); // ( <string de identificacao

	nave.animations.add('moveDown', [0, 1, 2, 3, 4, 5, 6, 7, 
	                                 8, 7, 6, 5, 4, 3, 2, 1],
	                                 10, true); // ( <string de identificacao>, <numero do sprite>, <velocidade da animcacao>, <true?>)
	nave.animations.add('moveTop', [9,10,11,12,13,14,15,16,
	                                15,14,13,12,11,10],
	                                10, true); 
//
	game.physics.enable(nave, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    nave.body.acceleration.y = 150;
    nave.body.collideWorldBounds = true; // para no limite inferior da tela
    nave.body.drag.x = 100; //desloca 100 e para, sÃ³ desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    nave.anchor.setTo(.5,.5); // diminui o espaço do deslocamento do espelhamento 
    nave.body.gravity.y = 100;
   
}


function update () {

//	Realizar colisão entre 'osso' e 'dino', chama função dinoEatOsso
//	game.physics.arcade.overlap(nave, ossos, dinoEatOsso,null,this);
//
//  Capturar entrada (tecla esquerda)	
	if ( game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ) { 
		nave.body.velocity.y = -velocidade;
		nave.animations.play('move');
	}
	
//	Capturar entrada (tecla direita)
	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) {
		nave.body.velocity.y = velocidade;
//		nave.animations.play('moveTop');
		
	} else {
	    	nave.animations.stop();
			nave.frame = 0;
	}	
}

