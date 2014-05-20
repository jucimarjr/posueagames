
var dinoSprite, ossos;

var game;

var velocidade = 200;
game = new Phaser.Game(800, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {

	game.stage.backgroundColor = "#ffffff";
	game.load.spritesheet('dino', 'assets/dinossauro.png', 200,160); // tamanho do frame, n�o � o tam. da img.
	game.load.image('osso', 'assets/osso.png');

}

function create () {
	
	// Criar o 'dino'
	dinoSprite = game.add.sprite(400, 400, 'dino');
	dinoSprite.animations.add('walk',[1,2,3,4],15,true); // ( <string de identificacao>, <numero do sprite>, <velocidade da animcacao>, <true?>) 
	dinoSprite.animations.add('jump',[4,5,6],4,true);
	dinoSprite.animations.add('diagjump',[4,5,6,5,3,2],4,true);

	game.physics.enable(dinoSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    dinoSprite.body.acceleration.y = 50;
    dinoSprite.body.collideWorldBounds = true; // para no limite inferior da tela
    dinoSprite.body.drag.x = 100; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    dinoSprite.anchor.setTo(.5,.5); // diminui o espa�o do deslocamento do espelhamento 
    dinoSprite.body.gravity.y =1000;
   
    // Criar o osso
    ossos = game.add.group();
    ossos.create( 50, 350, 'osso');
    ossos.create( 550, 350, 'osso');
    ossos.create( 200, 350, 'osso'); 
    game.physics.enable(ossos, Phaser.Physics.ARCADE);
}


function update () {

	// Realizar colis�o entre 'osso' e 'dino', chama fun��o dinoEatOsso
	game.physics.arcade.overlap(dinoSprite, ossos, dinoEatOsso,null,this);

	// Capturar entrada (tecla cimea)
//	 if ( game.input.keyboard.isDown (Phaser.Keyboard.UP &&Phaser.Keyboard.LEFT ) ) { // vai para cima
//	}  
	// Capturar entrada (tecla esquerda)	

	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { 
		dinoSprite.body.velocity.x = -velocidade;
		dinoSprite.animations.play('walk');
		dinoSprite.scale.x = -1; // muda a dire��o, espelhando a imagem
	}

	// Capturar entrada (tecla direita)
	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) {
		dinoSprite.body.velocity.x = velocidade;
		dinoSprite.scale.x = 1;
		dinoSprite.animations.play('walk');
	}

	// Capturar entrada (tecla cimea)
	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima
		dinoSprite.body.velocity.y = -velocidade;
		dinoSprite.animations.play('jump');
		
	} else {
	    	dinoSprite.animations.stop();
			dinoSprite.frame = 0;
	}	
}

function dinoEatOsso (dino,osso)	{
		osso.kill();
}

