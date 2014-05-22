var game = new Phaser.Game(960, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var cat;
var fence;
var cursors;
var obstacles;

function preload() {
	game.stage.backgroundColor = "#ffffff";
	game.load.image('fundo', 'assets/fundo_960-600.png');
	game.load.image('caixa', 'assets/caixas_180-173.png');
	game.load.image('lata', 'assets/lixeira_111-173.png');
	game.load.image('cerca', 'assets/muro_842-131.png');
	game.load.spritesheet('gato', 'assets/gato_154-81-4.png', 154, 81, 4);
}

function create() {
	game.add.sprite(0, 0, 'fundo');
	// Checar se precisa por fisica no ambiente
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//cat   = game.add.sprite(140,284,'gato');
	cat   = game.add.sprite(140,50,'gato');
	game.physics.enable(cat, Phaser.Physics.ARCADE);
	//game.physics.arcade.enable(cat);
	cat.body.bounce.y = 0;
    cat.body.gravity.y = 500;
    var rotation = game.add.tween(cat).to({angle: cat.angle - 20}, 700, Phaser.Easing.Linear.None);
    rotation.start();	        

    cat.body.collideWorldBounds = true;

    
	//cat.animations.add('run');
	cat.animations.add('run', [0, 3], 7, true);
	cat.animations.add('jump', [2], 7, true);
	
	cat.animations.play('jump');
//	cat.body.collideWorldBounds = true;
	
	fence = game.add.tileSprite(0, 350, 842, 131,'cerca');
	game.physics.enable(fence, Phaser.Physics.ARCADE);
	fence.body.immovable = true;

	
	obstacles = game.add.group();
    game.time.events.repeat(Phaser.Timer.SECOND * 1.4, 100, createObstacle, this);

    
    cursors = game.input.keyboard.createCursorKeys();
}

function createObstacle() {
	var posicaoYObstaculo = 1000+(Math.random()*300);
	var posicaoXObstaculo = 320;
	if(Math.random() < 0.6) {
		var trash = game.add.sprite(posicaoYObstaculo, posicaoXObstaculo,'lata');
		game.physics.enable(trash, Phaser.Physics.ARCADE);
		trash.body.immovable = true;
		trash.body.velocity.x = -330;
		obstacles.add(trash);
	} else {
		var box = game.add.sprite(posicaoYObstaculo, posicaoXObstaculo,'caixa');
		game.physics.enable(box, Phaser.Physics.ARCADE);
		box.body.immovable = true;
		box.body.velocity.x = -330;
		obstacles.add(box);
	}
}

function update() {
	fence.tilePosition.x -= 5;

	game.physics.arcade.collide(cat, fence);
	game.physics.arcade.collide(cat, obstacles, collisionHandler, null, this);
	 
 	// Pulo do gato
    if (cursors.up.isDown && cat.body.touching.down) {
        cat.body.velocity.y = -230;
        cat.animations.play('jump');
        
        var rotation = game.add.tween(cat).to({angle: cat.angle - 15}, 700, Phaser.Easing.Linear.None);
        rotation.start();	        

    } else if(cat.body.touching.down) {
       cat.animations.play('run');
       cat.angle = 0;
       
    }
}

function collisionHandler (obj1, obj2) {
    game.stage.backgroundColor = '#992d2d';
}
