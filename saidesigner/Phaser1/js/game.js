
//var plataformas;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });



function preload () {
	
    game.load.image('ceu'   , 'assets/ceu_960-600.png');
    game.load.image('chao'  , 'assets/plataforma_960-88.png');         
    game.load.image('barra' , 'assets/barra_70-150.png');
    game.load.spritesheet('menino', 'assets/menino_43-95.png', 43, 95);
}

function create () {
	//fundo
	game.add.sprite(0, 0, 'ceu');
	
	// CREATE A dino:
	menino = game.add.sprite(300, 300 , 'menino');
	menino.animations.add('walk', [1,2], 6, true);
	menino.animations.add('jump', [3,4], 4, true);
	game.physics.enable(menino, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
		
    menino.body.acceleration.y = 100;
 
    menino.body.collideWorldBounds = true; // para no limite inferio da tela
    menino.body.drag.x = 100; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    menino.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento 
    menino.body.gravity.y = 150;
        
    //Barreira
    barra = game.add.group();
    barra.enableBody = true;
    
    bloco1 = barra.create( 960, 0, 'barra');
    bloco1.body.immovable  = true;    
    bloco1.body.velocity.x = -100;
    
    bloco2 = barra.create( 960, 450, 'barra');
    bloco2.body.immovable  = true;    
    bloco2.body.velocity.x = -100;
}

function update() {

	game.physics.arcade.collide(menino, barra);
	
	
	
	// PEGA A ENTRADA (tecla pressionada):	
	/*if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda

		menino.body.velocity.x = -100;
		menino.animations.play('walk');
		menino.scale.x = -1; // espelha se antes -1
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita

		menino.body.velocity.x = 100;
		menino.scale.x = +1;  // espelha se antes 1
		menino.animations.play('walk');
	}

	else*/ if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		menino.body.velocity.y = -100;
		menino.animations.play('jump');
	}
	
	else{
	    	menino.animations.stop();
			menino.frame = 0;
		}		
	
	if (bloco1.body.x < -70){
		bloco1.body.x = 960;
	} 
	
	if (bloco2.body.x < -70){
		bloco2.body.x = 960;
	} 
	
	//game.physics.arcade.collide(menino, bloco);
	
}


