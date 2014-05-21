
var plataformas;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	console.log("testing log");
	
	game.load.image('background', 'assets/background_960-600.png');
	game.load.image('meteoro', 'assets/meteor_170-135.png');
	game.load.image('tardis', 'assets/tardis_77-110.png'); 

}

function create () {
	//Background
	game.add.sprite(0, 0, 'background');
	
	//Adicionado tardis
	
	tardisSprite = game.add.sprite(200, game.world.height - 200, 'tardis');
	game.physics.enable(tardisSprite, Phaser.Physics.ARCADE);
	tardisSprite.animations.add('walk',[1,2],6,true);
	tardisSprite.animations.add('jump',[3,4,5],4,true);
	
	tardisSprite.body.acceleration.y = 100;
	
	tardisSprite.body.collideWorldBounds = true; // para no limite inferio da tela
	tardisSprite.body.drag.x = 100; //desloca 100 e para, s√≥ desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
	tardisSprite.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento 
	tardisSprite.body.gravity.y = 150;
	
	//Adicionando Meteoro
	meteoros = game.add.group();
    meteoros.create( 400, 50, 'meteoro');
    meteoros.create( 400, 450, 'meteoro');
    meteoros.create( 700, 300, 'meteoro');
    game.physics.enable(meteoros, Phaser.Physics.ARCADE);
	
	
	
	
}


function update () {

	// COLISAO COM O CH√O:
//	game.physics.arcade.collide(tardisSprite, bcSprite);
	
    
    //Colis„o com os meteoros
    
    game.physics.arcade.overlap(tardisSprite, meteoros,kill,null,this);
    
    
	// PEGA A ENTRADA (tecla pressionada):	
	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda

		tardisSprite.body.velocity.x = -100;
		tardisSprite.animations.play('walk');
		tardisSprite.scale.x = -1; // espelha se antes -1
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita

		tardisSprite.body.velocity.x = 100;
		tardisSprite.scale.x = +1;  // espelha se antes 1
		tardisSprite.animations.play('walk');
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		tardisSprite.body.velocity.y = -100;
		tardisSprite.animations.play('jump');
	}

	else{
	    	tardisSprite.animations.stop();
			tardisSprite.frame = 0;
		}	
}
function kill (tardis,meteoro)	{

	tardis.kill();
	meteoro.kill();
}

