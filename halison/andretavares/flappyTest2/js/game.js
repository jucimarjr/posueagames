
var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	game.load.image('nave', 'assets/nave.png');
	game.load.image('bg', 'assets/universo.png');
	game.load.image('asteroid', 'assets/asteroid.png');
}

var asteroid;
var space;
var nave;

function create () {
	
//	space = game.add.sprite(0, 0, 'bg');
//	game.physics.enable(space, Phaser.Physics.ARCADE);
//	space.body.velocity.x = -15;
	
    this.space = this.game.add.tileSprite(0, 0, 960, 600, 'bg');
    this.space.autoScroll(-100, 0);
	
	nave = game.add.sprite(0, 0, 'nave');
	game.physics.enable(nave, Phaser.Physics.ARCADE);
	nave.body.velocity.y = 10;
	   
	asteroid = game.add.sprite(game.world.width,100, 'asteroid');
	game.physics.enable(asteroid, Phaser.Physics.ARCADE);
	asteroid.body.velocity.x = -150;
	asteroid.anchor.set(0.5);
	asteroid.smoothed = false;
	game.add.tween(asteroid.scale).to( { x: 1.05, y: 1.05 }, 1400, Phaser.Easing.Linear.None, true, 0, 1000, true);
	 
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}

function update() {
//	if (space.x < -space.width){
//		space.x = game.world.width;
//    }
	if (asteroid.x < -asteroid.width){
		asteroid.x = game.world.width;
    }

    if (upKey.isDown)
    {
    	nave.y--;
    }
    else if (downKey.isDown)
    {
    	nave.y++;
    }
	game.physics.arcade.collide(nave, asteroid);

}
