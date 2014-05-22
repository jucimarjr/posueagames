
var game = new Phaser.Game(960, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var cat;
var fence;
var trash;
var cursors;
var gameOver;
var box;
var trashes;

function preload() {
	game.stage.backgroundColor = "#ffffff";
	game.load.image('fundo', 'assets/fundo_960-600.png');
	game.load.image('caixa', 'assets/caixas_180-173.png');
	game.load.spritesheet('gato', 'assets/gato_154-81-4.png', 154, 81, 4);
	game.load.image('lata', 'assets/lixeira_111-173.png');
	game.load.image('cerca', 'assets/muro_842-131.png');
}

function create() {
	game.add.sprite(0, 0, 'fundo');
	// Checar se precisa por fisica no ambiente
	game.physics.startSystem(Phaser.Physics.ARCADE);
	gameOver = false;
	cat   = game.add.sprite(140,284,'gato');
	game.physics.enable(cat, Phaser.Physics.ARCADE);
	
	cat.animations.add('run');
	cat.animations.play('run', 12, true);
	cat.body.collideWorldBounds = true;
	
	fence = game.add.tileSprite(0, 350, 842, 131,'cerca');

	cursors = game.input.keyboard.createCursorKeys();
	
//	createObstacle();
    game.time.events.repeat(Phaser.Timer.SECOND * 1.4, 100, createObstacle, this);

}

function createObstacle() {
//	var teste = game.add.sprite(300+(Math.random()*1000), 120 + Math.random() * 200,'lata');
//	game.physics.enable(teste, Phaser.Physics.ARCADE);

//	teste.body.collideWorldBounds = true;
//	teste.body.velocity.x = -300;
	//teste.body.immovable = true;
    //trashses.create(1100, 320, 'lata');
	//trashes.add(teste);

//	trashes.create(300+(Math.random()*500), 120 + Math.random() * 200,'lata');
	if(Math.random() < 0.5) {
		trash = game.add.sprite(1000+(Math.random()*300), 320,'lata');
		game.physics.enable(trash, Phaser.Physics.ARCADE);
		trash.body.velocity.x = -330;
	} else {
		box = game.add.sprite(1000+(Math.random()*300), 320,'caixa');
		game.physics.enable(box, Phaser.Physics.ARCADE);
		box.body.velocity.x = -330;
	
	}
	
}

function update() {
	fence.tilePosition.x -= 5;
//	trash.x -=5;

	//game.physics.arcade.overlap(cat, trash, gameOver, null, this);
	//game.physics.arcade.collide(cat, trash);
	//game.physics.arcade.collide(cat, trash, gameOver, null, this);
	game.physics.arcade.collide(trash, cat, collisionHandler, null, this);
	 
    if (cursors.up.isDown) {
        cat.y -= 20;
    } 

}

function collisionHandler (obj1, obj2) {
    game.stage.backgroundColor = '#992d2d';
}


