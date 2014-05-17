
var plataformas;
var spriteRobo;
var chao;
var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	game.load.image('ceu', 'assets/sky.png');
	game.load.spritesheet('robo','assets/personagem_66-100-3.png', 66, 100);
	game.load.image('plataforma','assets/plataforma_250-32.png');
    game.load.image('chao', 'assets/chao_960-90.png');
}

function create () {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//Ceu
	game.add.sprite(0, 0, 'ceu');
	
	//CREATE ROBO
	spriteRobo = game.add.sprite(0, 0, 'robo');
	spriteRobo.animations.add('walk', [1,2], 4, true);
	spriteRobo.animations.add('jump', [1], 4, true);
	game.physics.enable(spriteRobo, Phaser.Physics.ARCADE);
	spriteRobo.body.acceleration.y = 200;
	spriteRobo.body.collideWorldBounds = true;
	spriteRobo.body.drag.x = 100;
	spriteRobo.anchor.setTo(.5,.5);
	spriteRobo.body.gravity.y = 150;
	
	// plataformas
	plataformas = game.add.group();
	plataformas.enableBody = true; 
	var p1 = plataformas.create(42,379,'plataforma');
	p1.body.immovable = true;
	var p2 = plataformas.create(663,221,'plataforma');
	p2.body.immovable = true;
	//Chao
	chao = plataformas.create(0, game.world.height - 90, 'chao');
	chao.body.immovable = true;
	chao.scale.setTo(2, 2);
	
	//game.physics.enable(plataformas, Phaser.Physics.ARCADE);
}


function update () {

	
	game.physics.arcade.collide(spriteRobo, plataformas);

	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		spriteRobo.body.velocity.x = -100;
		spriteRobo.animations.play('walk');
		spriteRobo.scale.x = -1;
	} else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		spriteRobo.body.velocity.x = 100;
		spriteRobo.scale.x = +1;
		spriteRobo.animations.play('walk');
	} else {
		spriteRobo.animations.stop();
		spriteRobo.frame = 0;
	}
	
	if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && spriteRobo.body.touching.down){
		spriteRobo.body.velocity.y = -300;
		spriteRobo.animations.play('jump');
	}
}

