
var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	game.load.image('nave', 'assets/nave_100-40.png');
	game.load.image('space', 'assets/universo.png');
	game.load.image('asteroid', 'assets/asteroid_80-80.png');
}

var asteroid;
var space;
var nave;
var group;

function create () {
	
    this.space = this.game.add.tileSprite(0, 0, 960, 600, 'space');
    this.space.autoScroll(-150, 0);
	
	nave = game.add.sprite(0, 0, 'nave');
	game.physics.enable(nave, Phaser.Physics.ARCADE);
	nave.body.velocity.y = 10;
	   
//	asteroid = game.add.sprite(game.world.width,100, 'asteroid');
//	game.physics.enable(asteroid, Phaser.Physics.ARCADE);
//	asteroid.body.velocity.x = -150;
//	asteroid.anchor.set(0.5);
//	asteroid.smoothed = false;
//	game.add.tween(asteroid.scale).to( { x: 2.05, y: 2.05 }, 1400, Phaser.Easing.Linear.None, true, 0, 1000, true);
	
	group = game.add.group();
	for (var i = 0; i < 4; i++)
    {
    	sprite = group.create(500+(200 *i), game.rnd.integerInRange(1, 600), 'asteroid', 'asteroid0000');
    	game.physics.enable(sprite, Phaser.Physics.ARCADE); 
    	game.add.tween(sprite.scale).to( { x: 1.4, y: 1.4 }, game.rnd.integerInRange(700,1300), Phaser.Easing.Linear.None, true, 0, 1000, true);
    	sprite.body.velocity.x = game.rnd.integerInRange(-150,-50);
    }
	var frameNames = Phaser.Animation.generateFrameNames('asteoid', 0, 24, '', 4);
	

//	child.animations.add('swim', frameNames, 30, true, false)
	 
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}

function update() {
	
//	if (asteroid.x < -asteroid.width){
//		asteroid.x = game.world.width;
//    }

    if (upKey.isDown)
    {
    	nave.y-= 2;
    }
    else if (downKey.isDown)
    {
    	nave.y+= 2;
    }
//	game.physics.arcade.collide(nave, asteroid);

}
