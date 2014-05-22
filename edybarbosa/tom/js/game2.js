
var game = new Phaser.Game(960, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var cat;
var fence;
var trash;

// Relogio
var timer;
var milliseconds = 0;
var seconds = 0;
var minutes = 0;

var cursors;
var platforms;
var girar = false;
var angulo = 0;


function preload() {
	game.stage.backgroundColor = "#ffffff";
	game.load.spritesheet('gato', 'assets/gato.png', 154, 81, 4);
	game.load.spritesheet('lata', 'assets/lixeiras.png', 111, 173, 1);
	game.load.image('cerca', 'assets/muro_842-131.png');
}

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);
	platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 231, 'cerca');
	//ground.scale.setTo(2, 2);
	ground.body.immovable = true;


	cat   = game.add.sprite(40, game.world.height - 400,'gato');
	game.physics.arcade.enable(cat);
	cat.body.bounce.y = 0.2;
    cat.body.gravity.y = 200;
    cat.body.collideWorldBounds = true;


	fence = game.add.tileSprite(0, 350, 842, 131,'cerca');
	//trash = game.add.sprite(1100, 320,'lata');




	//trash = game.add.sprite(40,284,'lata');
	//cat.animations.add('run');
	cat.animations.add('run', [0, 3], 7, true);
	cat.animations.add('jump', [2], 7, true);
	//cat.animations.add('lata');
	cat.animations.play('run');

	cursors = game.input.keyboard.createCursorKeys();
	
	
}

function update() {
	fence.tilePosition.x -= 5;
	//trash.x -=5;

	game.physics.arcade.collide(cat, platforms);



 	// Pulo do gato
    if (cursors.up.isDown && cat.body.touching.down)
    {
        cat.body.velocity.y = -200;
        //cat.animations.stop();
        cat.animations.play('jump');
        //game.add.tween(cat).to({angle: -60}, 100).start();
        
        var rotation = game.add.tween(cat).to({angle: cat.angle - 15}, 700, Phaser.Easing.Linear.None);
        rotation.start();	        
    }
    else if(cat.body.touching.down)
    {
       cat.animations.play('run');
       cat.angle = 0;
       
    }


}
