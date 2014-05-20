var game = new Phaser.Game(500, 600, Phaser.AUTO, 'game_div', { preload: preload, create: create, update: update  });
var boat;
var obects;
var velocity = 200;
var width = 500;
var height = 600;

function preload () {
	game.load.spritesheet('backGround', 'assets/bg_500-600-2.jpg', width, height, 2);
	game.load.spritesheet('boat', 'assets/boat_37-80-4.jpg', 37,80,4);//200,160
	game.load.image('buraco', 'assets/buraco_100-67.jpg');
}

function create () {
	this.backGround = game.add.sprite(0,0, 'backGround');
	this.backGround.animations.add('go');
	this.backGround.play('go',4,true);

	boat = game.add.sprite(game.world.centerX, height-50, 'boat');
	boat.animations.add('run');
	boat.animations.play('run', 8, true);
	game.physics.enable(boat, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
	boat.body.collideWorldBounds = true; // para no limite inferio da tela
    boat.body.drag.x = 200; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
    boat.anchor.setTo(0.5, 0.5);
    /*boat.body.maxAngular = 90;*/
    //  Apply a drag otherwise the sprite will just spin and never slow down
    //boat.body.angularDrag = 30;

	initObjects();
}

function initObjects(){
	
	obects = game.add.group();
	obects.enableBody = true;	
    obects.physicsBodyType = Phaser.Physics.ARCADE;
	var obj = obects.create(10,10, 'buraco');	
    obj.checkWorldBounds = true;
	//obj.gravity.y = 100;
	//obj.acceleration.y = 100;
	//obj.body.collideWorldBounds = true;
    game.physics.enable(obects, Phaser.Physics.ARCADE);
}

function update () {
	
	// cria uma barreira que o sprite pode pisar
	/*game.physics.arcade.collide(boat, barrasPqnas);
	game.physics.arcade.collide(boat, barrasMedias);
	game.physics.arcade.collide(boat, barraInicial);*/

	// COLISAO COM OSSO:
	/*game.physics.arcade.overlap(boat, obects, pegarObjetos,null,this);
	game.physics.arcade.overlap(boat, plataforma, gameOver,null,this);*/


	boat.body.angularAcceleration = 0;
	// PEGA A ENTRADA (tecla pressionada):	
	if ( game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) { // vai para esquerda
		goRight();
		//boat.scale.x = -1; // espelha se antes -1
	}
	else if ( game.input.keyboard.isDown (Phaser.Keyboard.RIGHT) ) { // vai para direita
		goLeft();
	}
	/*else if ( game.input.keyboard.isDown (Phaser.Keyboard.UP) ) { // vai para cima

		boat.body.velocity.y = -100;
		boat.animations.play('jump');
	}*/
	/*else{
	    	boat.animations.stop();
			boat.frame = 0;
		}	*/
}

function goRight(){
	boat.body.velocity.x = velocity;
	//boat.body.angularAcceleration += 30;
	boat.animations.play('walk');
}


function goLeft(){
	boat.body.velocity.x = -velocity;
	//boat.body.angularAcceleration -= 30;
	boat.animations.play('walk');
}