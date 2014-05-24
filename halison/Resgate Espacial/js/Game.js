
var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var asteroid;
var space1;
var space1;
var nave;
var sprite;
var atmosfera;
var cursors;
var score = "0000";
var lifeNumber = 5; 
var life = [];
var asteroidCollisionGroup;
var naveCollisionGroup;
var asteroidGroup;
var gameover;
var isGameOver;
var isJogo;

function preload () {
	game.load.image('nave', 'assets/nave_100-40.png');
	game.load.image('space', 'assets/universo.png');
	game.load.image('atmosphere', 'assets/atmosfera_960-600.png');
	game.load.image('asteroid', 'assets/asteroid_80-80.png');
	game.load.image('gameover', 'assets/gameover_436-82.png');
}

function create () {

	isJogo = true;
	isGameOver = false;
	
	this.ASTEROID_NUMBER = 13;
	
    space1 = game.add.image(0,0,'space');
    space2 = game.add.image(960,0,'space');
    
    gameover = game.add.image(1200,1260,'gameover');
    
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.restitution = 0.8;
    game.physics.p2.gravity.y = 300;
    game.physics.p2.setImpactEvents(true);
    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial');
    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    var contactMaterial = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { restitution: 1.0 });
    game.physics.p2.setWorldMaterial(worldMaterial);
    
    
    drawLives();
    
	nave = game.add.sprite(340, 300, 'nave');

	game.physics.p2.enable(nave,false);
	
    nave.body.fixedRotation = true;
	nave.body.setMaterial(spriteMaterial);
//    asteroid.body.setMaterial(spriteMaterial);
    nave.body.data.gravityScale = 0.5;
//    asteroid.body.data.gravityScale = 0.01;
//    asteroid.body.createBodyCallback(nave, hit, this);

	   //  Create our collision groups. One for the player, one for the pandas
    naveCollisionGroup = game.physics.p2.createCollisionGroup();

    nave.body.setCollisionGroup(naveCollisionGroup);

    
    asteroidCollisionGroup = game.physics.p2.createCollisionGroup();

    asteroidGroup = game.add.group();
    asteroidGroup.enableBody = true;

    asteroidGroup.physicsBodyType = Phaser.Physics.P2JS;

	for (var i = 0; i < this.ASTEROID_NUMBER; i++)
    {

    	sprite = asteroidGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'asteroid');

    	sprite.body.setCircle(30);	

    	sprite.body.setCollisionGroup(asteroidCollisionGroup); //add   

    	sprite.body.collides([asteroidCollisionGroup, naveCollisionGroup]);
    	game.physics.p2.enable(sprite, true);
    	var time = game.rnd.integerInRange(1400,2000);
    	var scale = time/1200;
    	game.add.tween(sprite.scale).to( { x: scale, y: scale }, time, Phaser.Easing.Linear.None, true, 0, 1000, true);
//    	sprite.body.velocity.x = game.rnd.integerInRange(-260,-200);
//    	sprite.body.velocity.y = game.rnd.integerInRange(5,45);
    	sprite.body.allowGravity = false;
    }
	
//	alert("2");
	nave.body.setCollisionGroup(naveCollisionGroup);
	nave.body.collides(asteroidCollisionGroup, hit, this);
	cursors = game.input.keyboard.createCursorKeys();
	text1 = game.add.text(20, 20, score, { fill: '#ffffff' });
	text2 = game.add.text(900, life, { fill: '#ffffff' });
}

function update() {
	
	if ( isJogo ){
	    space1.x -= 3;
	    space2.x -= 3;
	    if (space1.x + space1.width < 0){
	    	 space1.x = 960;
	    }
	    if (space2.x + space2.width < 0){
	   	 space2.x = 960;
	   }
		nave.body.setZeroVelocity();
	    if (cursors.up.isDown)
	    {
	    	nave.body.moveDown(130);
	    }
	    else if (cursors.down.isDown)
	    {
	    	nave.body.moveUp(130);
	    }  
	
		for (var i = 0; i < this.ASTEROID_NUMBER ; i++){
			sprite = asteroidGroup.getAt(i);
			sprite.body.setZeroVelocity();
			sprite.body.moveLeft( game.rnd.integerInRange(100,200) );
	//
			if (sprite.body.x < -sprite.width){
				sprite.body.x = game.world.width+sprite.width;
				sprite.body.y = game.rnd.integerInRange(-100, 600);
		    }
		}
//		if (cursors.enter.isDown){
//			isGameOver = true;
//			isJogo = false;
//		}
	} else 	if (isGameOver){
		gameover.x = 200;
		gameover.y = 200;
		
	}	
	
    

};
	

//    
function hit(body1, body2) {
	//  body1 is the space ship (as it's the body that owns the callback)
    //  body2 is the body it impacted with, in this case our panda
    //  As body2 is a Phaser.Physics.P2.Body object, you access its own (the sprite) via the sprite property:
	decreaseLifeNumber();
};


function drawLives(){
	
	for ( var i = 0; i < lifeNumber; i++){
		life[i] = game.add.image(650+(i*50), 20, 'nave');
		life[i].scale.x = 0.4;
		life[i].scale.y = 0.7;
	}
}

function decreaseLifeNumber(){
	if (lifeNumber > 0){
		lifeNumber--;
		life[lifeNumber].kill();
	} else {
		isJogo = false;
		isGameOver = true;
	}
}


