
var plataformas, base, jogadorSprite;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	
	game.load.spritesheet('jogador', 'assets/jogador_60-80.png', 60,80);
	game.load.image('base', 'assets/base_200-200.png');
	game.load.image('ceu', 'assets/background_960-600.png');
    //game.load.image('chao', 'assets/chao_960-54.png');
    //game.load.image('bloco', 'assets/bloco_276-107.png');
    //game.load.image('osso', 'assets/osso_109-87.png');

}
//
function create () {
	game.add.sprite(0, 0, 'ceu');
	
	jogadorSprite = game.add.sprite(100, 0, 'jogador');
	jogadorSprite.animations.add('andar',[0],3,true);
	jogadorSprite.animations.add('pular',[0],2,true);
	game.physics.enable(jogadorSprite, Phaser.Physics.ARCADE);
	
	jogadorSprite.body.acceleration.y = 300;
	
	jogadorSprite.body.collideWorldBounds = true;
	jogadorSprite.body.drag.x = 100; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
	jogadorSprite.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento 
	jogadorSprite.body.gravity.y = 150;
	
    /*ossos = game.add.group();
    ossos.create( 500, 50, 'osso');
    ossos.create( 620, 60, 'osso');
    ossos.create( 100, 450, 'osso');
    ossos.create( 700, 450, 'osso');
    ossos.create( 800, 450, 'osso');
    game.physics.enable(ossos, Phaser.Physics.ARCADE);*/

    plataformas = game.add.group();
    plataformas.enableBody = true;
    
    base = plataformas.create(0, 400, 'base');
    base.body.immovable = true; // deixa o bloco imovivel
    
    //chao = plataformas.create(0, 546, 'chao');
    //chao.body.immovable = true;
	
}


function update () {
	
	game.physics.arcade.collide(jogadorSprite, plataformas);
	
	//game.physics.arcade.overlap(jogadorSprite, ossos, caoEatosso,null,this);
	
	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
		jogadorSprite.body.velocity.x = -100;
		jogadorSprite.scale.x = -1; // espelha se antes -1
		jogadorSprite.animations.play('andar');
	}
	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita
		jogadorSprite.body.velocity.x = 100;
		jogadorSprite.scale.x = +1;  // espelha se antes 1
		jogadorSprite.animations.play('andar');
	}
	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		jogadorSprite.body.velocity.y = -300;
		jogadorSprite.animations.play('pular');
	}
	else {
		jogadorSprite.animations.stop();
		jogadorSprite.frame = 0;
	}	
}

/*function caoEatosso (cao,osso)	{

		osso.kill();
}*/

