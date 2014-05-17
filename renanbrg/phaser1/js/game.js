
var plataformas;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	console.log("testing log");
	
	game.load.image('background', 'assets/background_960-600.png');
	game.load.image('blococlaro', 'assets/blococlaro_150-100.png');
	game.load.image('blocoescuro', 'assets/blocoescuro_50-100.png');
	game.load.image('mrdigger', 'assets/mrdigger_95-160.png');
	game.load.image('nuvem', 'assets/nuvem_170-95.png');
	game.load.image('agua', 'assets/agua_210-60.png');
    

}

function create () {
	//Background
	game.add.sprite(0, 0, 'background');
	
	//Adicionado chao
	
	bcSprite = game.add.sprite(0, game.world.height - 100, 'blococlaro');
	bcSprite.scale.setTo(3, 3);
	game.physics.enable(bcSprite, Phaser.Physics.ARCADE);
	bcSprite.body.immovable = true;
	bcSprite2 = game.add.sprite(game.world.width - 300, game.world.height - 100, 'blococlaro');
	bcSprite2.scale.setTo(2, 2);
	game.physics.enable(bcSprite2, Phaser.Physics.ARCADE);
	bcSprite2.body.immovable = true;
	
	//Adicionando ·gua
	
	aguaSprite = game.add.sprite(game.world.width - 510, game.world.height - 60, 'agua');
	game.physics.enable(aguaSprite, Phaser.Physics.ARCADE);
	
	
	//Adicionando piramide
	beSprite = game.add.sprite(game.world.width - 250, game.world.height - 200, 'blocoescuro');
	beSprite.scale.setTo(5, 1);
	game.physics.enable(beSprite, Phaser.Physics.ARCADE);
	beSprite.body.immovable = true;
	
	beSprite2 = game.add.sprite(game.world.width - 100, game.world.height - 400, 'blocoescuro');
	beSprite2.scale.setTo(2, 1);
	game.physics.enable(beSprite2, Phaser.Physics.ARCADE);
	beSprite2.body.immovable = true;
	
	bcSprite3 = game.add.sprite(game.world.width - 150, game.world.height - 300, 'blococlaro');
	game.physics.enable(bcSprite3, Phaser.Physics.ARCADE);
	bcSprite3.body.immovable = true;

	//Adicionando nuvem
	nuvemSprite = game.add.sprite(game.world.width - 565, game.world.height - 555, 'nuvem');
	nuvemSprite2 = game.add.sprite(game.world.width - 857, game.world.height - 450, 'nuvem');
	nuvemSprite3 = game.add.sprite(game.world.width - 320, game.world.height - 457, 'nuvem');
	
	
	
	//Adicionando mrdigger
	mrdiggerSprite = game.add.sprite(0, game.world.height - 260, 'mrdigger');
	mrdiggerSprite.animations.add('walk',[1,2],6,true);
	mrdiggerSprite.animations.add('jump',[3,4,5],4,true);
	game.physics.enable(mrdiggerSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
	
	mrdiggerSprite.body.acceleration.y = 100;
	
	mrdiggerSprite.body.collideWorldBounds = true; // para no limite inferio da tela
	mrdiggerSprite.body.drag.x = 100; //desloca 100 e para, s√≥ desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
	mrdiggerSprite.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento 
	mrdiggerSprite.body.gravity.y = 150;
	
}


function update () {

	// COLISAO COM O CH√O:
	game.physics.arcade.collide(mrdiggerSprite, bcSprite);
	game.physics.arcade.collide(mrdiggerSprite, bcSprite2);
    game.physics.arcade.collide(mrdiggerSprite, beSprite);
    game.physics.arcade.collide(mrdiggerSprite, beSprite2);
    game.physics.arcade.collide(mrdiggerSprite, bcSprite3);
    
    //Colis„o com a ·gua
    
    game.physics.arcade.overlap(mrdiggerSprite, aguaSprite,afogar,null,this);
    
    
	// PEGA A ENTRADA (tecla pressionada):	
	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda

		mrdiggerSprite.body.velocity.x = -100;
		mrdiggerSprite.animations.play('walk');
		mrdiggerSprite.scale.x = -1; // espelha se antes -1
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita

		mrdiggerSprite.body.velocity.x = 100;
		mrdiggerSprite.scale.x = +1;  // espelha se antes 1
		mrdiggerSprite.animations.play('walk');
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		mrdiggerSprite.body.velocity.y = -300;
		mrdiggerSprite.animations.play('jump');
	}

	else{
	    	mrdiggerSprite.animations.stop();
			mrdiggerSprite.frame = 0;
		}	
}
function afogar (mrdigger,agua)	{

	mrdigger.kill();
}

