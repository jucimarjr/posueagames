
var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


var asteroid;
var space;
var nave;
var group;
var sprite;
var atmosfera;
var polygonCollisionSprite;


function preload () {
	game.load.image('nave', 'assets/nave_100-40.png');
	game.load.image('space', 'assets/universo.png');
	game.load.image('atmosphere', 'assets/atmosfera_960-600.png');
	game.load.image('asteroid', 'assets/asteroid_80-80.png');
//	game.load.physics('physicsData', 'assets/sprites.json');
	
}
function create () {
	
	// Define motion constants
    this.ACCELERATION = 530; // pixels/second/second
    this.MAX_SPEED = 300; // pixels/second
    this.DRAG = 50; // pixels/second
    this.GRAVITY = 250; // pixels/second/second
    this.ASTEROID_NUMBER = 8;

	game.physics.startSystem(Phaser.Physics.ARCADE);	
	game.physics.arcade.gravity.y = this.GRAVITY;
//
    this.space = this.game.add.tileSprite(0, 0, 960, 600, 'space');
    this.space.autoScroll(-150, 0);
    
	nave = game.add.sprite(350, 200, 'nave');
	game.physics.enable(nave, Phaser.Physics.PS2);
	nave.body.maxVelocity.setTo(this.MAX_SPEED-10, this.MAX_SPEED);
	nave.body.allowGravity = true;
	nave.body.drag.setTo(this.DRAG, this.DRAG);
	
	group = game.add.group();
	for (var i = 0; i < this.ASTEROID_NUMBER; i++)
    {
    	sprite = group.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'asteroid', 'asteroid0000');
    	game.physics.enable(sprite, Phaser.Physics.ARCADE);
    	var time = game.rnd.integerInRange(1400,2000);
    	var scale = time/900;
    	game.add.tween(sprite.scale).to( { x: scale, y: scale }, time, Phaser.Easing.Linear.None, true, 0, 1000, true);
    	sprite.body.velocity.x = game.rnd.integerInRange(-260,-200);
    	sprite.body.velocity.y = game.rnd.integerInRange(5,45);
    	sprite.body.allowGravity = false;
    }
	
	group.setAll('body.collideWorldBounds', false);
	group.setAll('body.bounce.x', 1);
	group.setAll('body.bounce.y', 1);
	group.setAll('body.minBounceVelocity', 0);

//	child.animations.add('swim', frameNames, 30, true, false)
	 
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}

function update() {
	
	for (var i = 0; i < this.ASTEROID_NUMBER ; i++){
		sprite = group.getAt(i);
		if (sprite.x < -sprite.width){
			sprite.x = game.world.width;
			sprite.y = game.rnd.integerInRange(-100, 600);
	    }
}
	
//	game.physics.arcade.collide(group);
//	game.physics.arcade.collide(group,nave);

    if (upKey.isDown)
    {
    	nave.y += 2;
//    	game.physics.arcade.gravity.y = this.GRAVITY;
        nave.body.acceleration.y = -Math.sin(180) * this.ACCELERATION;
        nave.body.velocity.y = 50;

    }
    else if (downKey.isDown)
    {
    	nave.y -= 2;
//        game.physics.arcade.gravity.y = -this.GRAVITY;
        nave.body.acceleration.y = Math.sin(180) * this.ACCELERATION;
        nave.body.velocity.y = -100;
    } else {
        // Otherwise, stop thrusting
        nave.body.acceleration.setTo(0, 0);
    }
    

}
