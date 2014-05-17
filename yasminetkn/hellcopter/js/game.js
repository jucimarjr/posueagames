
var bonecoSprite, suplemento, plataformas, floor,bonecoSprite;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {

    //game.stage.background = 'assets/background_960-600.png';
	//game.stage.backgroundColor = "#ffffff";

	game.load.spritesheet('boneco', 'assets/bonecoSpriteSheet2_240-60-4.png', 60,60);
	game.load.image('chao', 'assets/chao2_325-28.png');
    game.load.image('ground', 'assets/backchop.png');
    game.load.image('bloco', 'assets/bloco_80-30.png');
    game.load.image('suplemento', 'assets/suplemento_60-60.png');

}

function create () {
	//fundo
    //game.add.sprite(0, 0, 'ground');
	game.add.sprite(0, 0, 'chao');



    //faz a chao rolar em loop
    this.ground2 = this.game.add.tileSprite(0, 0, 960, 600, 'ground');//(x,y,tamanho em x,?)
    this.ground2.autoScroll(-20, 0);

    this.ground = this.game.add.tileSprite(0, 575, 960, 112, 'chao');//(x,y,tamanho em x,?)
    this.ground.autoScroll(-200, 0);


	
	// CREATE A dino:
	bonecoSprite = game.add.sprite(400, 460, 'boneco');
	bonecoSprite.animations.add('walk',[1,2],6,true);
	//bonecoSprite.animations.add('jump',[3,4,5],4,true);
	game.physics.enable(bonecoSprite, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
    //bonecoSprite.body.velocity.y=-3000;
    bonecoSprite.body.acceleration.y = -10;

    bonecoSprite.body.collideWorldBounds = true; // para no limite inferio da tela
    //bonecoSprite.body.drag.x = 100; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    bonecoSprite.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento
//    bonecoSprite.body.gravity.y = 1;
//    bonecoSprite.body.gravity.x = 40;


   
    //CREATE A OSSO GROUP:
    suplemento = game.add.group();
    suplemento.create( 50, 100, 'suplemento');
    suplemento.create( 50, 200, 'suplemento');
    suplemento.create( 50, 300, 'suplemento');
    game.physics.enable(suplemento, Phaser.Physics.ARCADE);

    //criando o grupo de plataformas

    plataformas = game.add.group();
    plataformas.enableBody = true;

    //cria bloco
    var bloco = plataformas.create(350,350,'bloco');
    var bloco = plataformas.create(500,350,'bloco');
    var bloco = plataformas.create(600,350,'bloco');

    bloco.body.imovable = true;//deixa o bloco imovel
}


function update () {

	// COLISAO COM OSSO:
	game.physics.arcade.overlap(bonecoSprite, suplemento, tomaBomba,null,this);

    game.physics.arcade.collide(bonecoSprite, plataformas);

	// PEGA A ENTRADA (tecla pressionada):
	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda


		bonecoSprite.body.velocity.x = -100;
		bonecoSprite.animations.play('walk');
		bonecoSprite.scale.x = -1; // espelha se antes -1
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita

		bonecoSprite.body.velocity.x = 100;
		bonecoSprite.scale.x = +1;  // espelha se antes 1
		bonecoSprite.animations.play('walk');
        console.log("right")
	}

	else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		bonecoSprite.body.velocity.y = -100;
		bonecoSprite.animations.play('jump');
	}

	else{
	    	bonecoSprite.animations.stop();
			bonecoSprite.frame = 0;
		}	
}

function tomaBomba (boneco,suplemento)	{

    suplemento.kill();
}





