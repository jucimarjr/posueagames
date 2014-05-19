
var plataformas, caoSprite, piso, bloco, ossos;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	
	game.load.spritesheet('cao', 'assets/dogstylesheet-552-196-4.png', 138,196);
	game.load.image('ceu', 'assets/background_960-600.png');
    game.load.image('chao', 'assets/chao_960-54.png');
    game.load.image('bloco', 'assets/bloco_276-107.png');
    game.load.image('osso', 'assets/osso_109-87.png');

}

function create () {
	game.add.sprite(0, 0, 'ceu');
	
	caoSprite = game.add.sprite(400, 0, 'cao');
	caoSprite.animations.add('andar',[0,1,2,3],3,true);
	caoSprite.animations.add('pular',[1],2,true);
	game.physics.enable(caoSprite, Phaser.Physics.ARCADE);
	
	caoSprite.body.acceleration.y = 300;
	
	caoSprite.body.collideWorldBounds = true;
	caoSprite.body.drag.x = 100; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
	caoSprite.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento 
	caoSprite.body.gravity.y = 150;
	
    ossos = game.add.group();
    ossos.create( 500, 50, 'osso');
    ossos.create( 620, 60, 'osso');
    ossos.create( 100, 450, 'osso');
    ossos.create( 700, 450, 'osso');
    ossos.create( 800, 450, 'osso');
    game.physics.enable(ossos, Phaser.Physics.ARCADE);

    plataformas = game.add.group();
    plataformas.enableBody = true;
    
    bloco = plataformas.create(500, 200, 'bloco');
    bloco.body.immovable = true; // deixa o bloco imovivel
    
    chao = plataformas.create(0, 546, 'chao');
    chao.body.immovable = true;
	
}


function update () {
	
	game.physics.arcade.collide(caoSprite, plataformas);
	
	game.physics.arcade.overlap(caoSprite, ossos, caoEatosso,null,this);
	
	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
		caoSprite.body.velocity.x = -100;
		caoSprite.scale.x = -1; // espelha se antes -1
		caoSprite.animations.play('andar');
	}
	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita
		caoSprite.body.velocity.x = 100;
		caoSprite.scale.x = +1;  // espelha se antes 1
		caoSprite.animations.play('andar');
	}
	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		caoSprite.body.velocity.y = -300;
		caoSprite.animations.play('pular');
	}
	else {
		caoSprite.animations.stop();
		caoSprite.frame = 0;
	}	
}

function caoEatosso (cao,osso)	{

		osso.kill();
}

