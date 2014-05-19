
var bonecoSprite, ossos;

var game;

game = new Phaser.Game(800, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	game.stage.backgroundColor = "#ffffff";
	game.load.spritesheet('boneco', 'assets/boneco_233_100.png', 46.6,100); // tamanho do frame, não é o tam. da img.
	game.load.image('ceu', 'assets/ceu_960_600.png');
}

function create () {

	
	// Adicionar o céu
    game.add.sprite(0, 0, 'ceu');

	// Criar o boneco
	boneco = game.add.sprite(400, 400, 'boneco');
	boneco.animations.add('walk',[1,2,3],10,true); // ( <string de identificacao>, <numero do sprite>, <velocidade da animcacao>, <true?>) 
	boneco.animations.add('jump',[2,4],4,true);
	game.physics.enable(boneco, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    boneco.body.acceleration.y = 50;
    boneco.body.collideWorldBounds = true; // para no limite inferior da tela
    boneco.body.drag.x = 100; //desloca 100 e para, sÃ³ desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    boneco.anchor.setTo(.5,.5); // diminui o espaço do deslocamento do espelhamento 
    boneco.body.gravity.y = 250;
   
}


function update () {

	// COLISAO COM OSSO:
	// game.physics.arcade.overlap(boneco, ossos, dinoEatosso,null,this);

	// PEGA A ENTRADA (tecla pressionada):	
	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
		boneco.body.velocity.x = -100;
		boneco.animations.play('walk');
		boneco.scale.x = -1; // espelha se antes -1
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita
		boneco.body.velocity.x = 100;
		boneco.scale.x = +1;  // espelha se antes 1
		boneco.animations.play('walk');
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima
		boneco.body.velocity.y = -100;
		boneco.animations.play('jump');
	}

	else{
	    	boneco.animations.stop();
			boneco.frame = 0;
	}	
}


