
var dinoSprite, ossos, plataformas;

var game = new Phaser.Game(960, 500, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update });

function preload () {

	game.stage.backgroundColor = "#ffffff";
	game.load.spritesheet('dino', 'assets/dinossauro.png', 200,160); // 200x160 eh o tamanho do frame da sprite
	game.load.image('osso', 'assets/osso.png');
	game.load.image('sky', 'assets/sky.jpg');
    game.load.image('bloco', 'assets/tijolos.png');
    game.load.image('chao', 'assets/chao.jpg');
}

function create () {
	//fundo
	//game.add.sprite(0, 0, 'sky');
	
	var bg = game.add.tileSprite(0, 0, game.stage.bounds.width,game.cache.getImage('sky').height, 'sky');
    bg.autoScroll(-200, 0);
	
	var ground = game.add.tileSprite(0, game.world.height - 100, 960, 100, 'chao');
    ground.autoScroll(-100, 0);



	// CREATE A dino:
	dinoSprite = game.add.sprite(200, 0, 'dino');
	dinoSprite.animations.add('walk',[1,2],6,true);
	dinoSprite.animations.add('jump',[3,4,5],4,true);
	game.physics.enable(dinoSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
   
    dinoSprite.body.acceleration.y = 100;
 
    dinoSprite.body.collideWorldBounds = true; // para no limite inferio da tela
    dinoSprite.body.drag.x = 100; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    dinoSprite.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento 
    dinoSprite.body.gravity.y = 150;
    
   
    // CREATE A OSSO GROUP:
    ossos = game.add.group();
    ossos.create( 500, 50, 'osso');
    game.physics.enable(ossos, Phaser.Physics.ARCADE);
    
    // cria o grupo para plataformas
    plataformas = game.add.group();
    plataformas.enableBody = true;
    
    //cria um bloco para o dino ficar em cima
    var bloco = plataformas.create(350, 250, 'bloco');
    bloco.body.immovable = true; // deixa o bloco imovivel
    
    // cria  c
    //var tablado = plataformas.create(0, 450, 'bloco');
    //tablado.body.immovable = true;
    //tablado.scale.setTo(2, 2); // amplia o bloco pra ficar o chao todo


}


function update () {
	
	// cria uma barreira que o sprite pode pisar
	game.physics.arcade.collide(dinoSprite, plataformas);

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

