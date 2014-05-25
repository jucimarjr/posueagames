
var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var asteroid;
var space1;
var space1;
var nave;
var sprite;
var atmosfera;
var cursors;
var score;
var lifeNumber = 5; 
var life = [];
var asteroidCollisionGroup;
var naveCollisionGroup;

var asteroidGroup;
var gameover;
var isGameOver;
var isJogo;

function preload () 
{
	game.load.image('nave', 'assets/nave_100-40.png');
	game.load.image('space', 'assets/universo.png');
	game.load.image('atmosphere', 'assets/atmosfera_960-600.png');
	game.load.image('asteroid', 'assets/asteroid_80-80.png');
	game.load.image('gameover', 'assets/gameover_436-82.png');
	game.load.image('coin_green_1', 'assets/coin_green_1_50_51.png');
	game.load.image('coin_green_2', 'assets/coin_green_2_50_50.png');
	game.load.image('coin_green_3', 'assets/coin_green_3_50_50.png');
	game.load.image('coin_green_4', 'assets/coin_green_4_50_50.png');
	game.load.image('coin_green_5', 'assets/coin_green_5_50_51.png');
	game.load.image('coin_green_6', 'assets/coin_green_6_50_51.png');
	game.load.image('coin_green_7', 'assets/coin_green_7_50_50.png');
	game.load.image('coin_green_8', 'assets/coin_green_8_50_50.png');
	game.load.image('coin_red_1', 'assets/coin_red_1_50_49.png');
	game.load.image('coin_red_2', 'assets/coin_red_2_50_50.png');
	game.load.image('coin_red_3', 'assets/coin_red_3_50_50.png');
	game.load.image('coin_yellow_1', 'assets/coin_yellow_1_50_50.png');
	game.load.image('coin_yellow_2', 'assets/coin_yellow_2_50_50.png');
	game.load.image('score', 'assets/placar_282_69.png');
}

var yellowCoins = [];
var redCoins = [];
var greenCoins = [];

var yCoinsGroup;
var rCoinsGroup;
var gCoinsGroup;

var yellowCoinsCollisionGroup;
var redCoinsCollisionGroup;
var greenCollisionGroup;

function create () 
{
	var time;
	var scale;
	
	isJogo = true;
	isGameOver = false;
	
	this.ASTEROID_NUMBER = 13;
	this.ASTEROID_SPEED = 100; 
	this.YELLOW_COIN_NUMBER = 1;
    space1 = game.add.image(0,0,'space');
    space2 = game.add.image(960,0,'space');
    
    gameover = game.add.image(1200,1260,'gameover');
	game.add.image(0,0,'score');

    
    yellowCoins[0] = game.add.image(960,0,'coin_yellow_1');
    yellowCoins[1] = game.add.image(960,0,'coin_yellow_2');
    redCoins[0] = game.add.image(960,0,'coin_red_1');
    redCoins[1] = game.add.image(960,0,'coin_red_2');
    redCoins[2] = game.add.image(960,0,'coin_red_3');
    redCoins[3] = game.add.image(960,0,'coin_red_4');
	greenCoins[0] = game.add.image(960,0,'coin_green_1');
	greenCoins[1] = game.add.image(960,0,'coin_green_2');
	greenCoins[2] = game.add.image(960,0,'coin_green_3');
	greenCoins[3] = game.add.image(960,0,'coin_green_4');
	greenCoins[4] = game.add.image(960,0,'coin_green_5');
	greenCoins[5] = game.add.image(960,0,'coin_green_6');
	greenCoins[6] = game.add.image(960,0,'coin_green_7');
	greenCoins[7] = game.add.image(960,0,'coin_green_8');
    
	game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 5;
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 2.8;
    
    drawLives();
    
	nave = game.add.sprite(340, 300, 'nave');
	game.physics.p2.enable(nave,true);
	
    nave.body.fixedRotation = true;
    nave.body.data.gravityScale = 0.5;

    naveCollisionGroup = game.physics.p2.createCollisionGroup();
    asteroidCollisionGroup = game.physics.p2.createCollisionGroup();
    
    nave.body.setCollisionGroup(naveCollisionGroup);

    asteroidGroup = game.add.group();
    asteroidGroup.enableBody = true;
    asteroidGroup.physicsBodyType = Phaser.Physics.P2JS;

	for (var i = 0; i < this.ASTEROID_NUMBER; i++)
    {

    	sprite = asteroidGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'asteroid');

    	sprite.body.setCircle(31);	

    	sprite.body.setCollisionGroup(asteroidCollisionGroup); //add   

    	sprite.body.collides([asteroidCollisionGroup, naveCollisionGroup]);
    	game.physics.p2.enable(sprite, true);
    	time = game.rnd.integerInRange(1400,2000);
    	scale = time/1200;
    	game.add.tween(sprite.scale).to( { x: scale, y: scale }, time, Phaser.Easing.Linear.None, true, 0, 1000, true);
    	sprite.body.allowGravity = false;
    }
	
	nave.body.setCollisionGroup(naveCollisionGroup);
	nave.body.collides(asteroidCollisionGroup, hitAsteroid, this);
	
	
	
//	CRIAR GRUPO MOEDAS AMARELAS E COLISAO COM NAVE
	yellowCoinsCollisionGroup = game.physics.p2.createCollisionGroup();
	yCoinsGroup = game.add.group();
	yCoinsGroup.enableBody = true;
	yCoinsGroup.physicsBodyType = Phaser.Physics.P2JS;

	for (var i = 0; i < this.YELLOW_COIN_NUMBER; i++)
	    {
	    	sprite = yCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_yellow_1');
	    	sprite.body.setCircle(31);	
	    	sprite.body.setCollisionGroup(yellowCoinsCollisionGroup); //add   
	    	sprite.body.collides([yellowCoinsCollisionGroup, naveCollisionGroup]);
	    	game.physics.p2.enable(sprite, true);
	    	time = 100;
	    	scale = 1.1;
	    	game.add.tween(sprite.scale).to( { x: scale, y: scale }, time, Phaser.Easing.Linear.None, true, 0, 1000, true);
	    	sprite.body.allowGravity = false;
	    }
	
	nave.body.collides(yellowCoinsCollisionGroup, hitYellowCoins, this);

	
	cursors = game.input.keyboard.createCursorKeys();
}

function update() 
{
	
	if ( isJogo )
	{
	    space1.x -= 3;
	    space2.x -= 3;
	    
	    if (space1.x + space1.width < 0)
	    {
	    	space1.x = 960;
	    }
	    
	    if (space2.x + space2.width < 0)
	    {
	    	space2.x = 960;
  	    }
	    
		nave.body.setZeroVelocity();
		
	    if (cursors.up.isDown)
	    {
	    	nave.body.moveDown(180);
	    }
	    
	    else if (cursors.down.isDown)
	    {
	    	nave.body.moveUp(180);
	    }  
		
		for (var i = 0; i < this.ASTEROID_NUMBER ; i++)
		{
			sprite = asteroidGroup.getAt(i);
			sprite.body.setZeroVelocity();
			sprite.body.moveLeft(this.ASTEROID_SPEED); //game.rnd.integerInRange(100,200) );
	
			if (sprite.body.x < -sprite.width)
			{
				sprite.body.x = game.world.width+sprite.width;
				sprite.body.y = game.rnd.integerInRange(-100, 620);
		    }
		}
		
		for (var i = 0; i < this.YELLOW_COIN_NUMBER ; i++)
		{
			sprite = yCoinsGroup.getAt(i);
			sprite.body.setZeroVelocity();
			sprite.body.moveLeft(this.ASTEROID_SPEED); //game.rnd.integerInRange(100,200) );
	
			if (sprite.body.x < -sprite.width)
			{
				sprite.body.x = game.world.width+sprite.width;
				sprite.body.y = game.rnd.integerInRange(-100, 620);
		    }
		}
		
//		if( isYellowOn )
//			yellow.x = yellow.x -2; 
//		yellow.body.moveLeft(this.ASTEROID_SPEED);
//		if (yellow.x < -yellow.width)
//		{
//			yellow.x = game.world.width+yellow.width;
//			yellow.y = game.rnd.integerInRange(-100, 620);
//	    }
		
//		if (nave.body.x + nave.width > yellow.x){
//			
//		}
		
//		for (var i = 0; i < 2 ; i++)
//		{
//			var sprite;
//			sprite = yCoinsGroup.getAt(i);
//			sprite.body.setZeroVelocity(i);
//			sprite.body.moveLeft( game.rnd.integerInRange(100,200) );
//	
//			if (sprite.body.x < -sprite.width)
//			{
//				sprite.body.x = game.world.width+sprite.width;
//				sprite.body.y = game.rnd.integerInRange(-100, 600);
//		    }
//		}
		
	} 
	
	else if (isGameOver)
	{
		gameover.x = 200;
		gameover.y = 200;
		
	}	
};

function hitAsteroid(body1, body2) 
{
	//  body1 is the space ship (as it's the body that owns the callback)
    //  body2 is the body it impacted with, in this case our panda
    //  As body2 is a Phaser.Physics.P2.Body object, you access its own (the sprite) via the sprite property:
	decreaseLifeNumber();
//	body2.bounce	
};

function hitYellowCoins(body1, body2) 
{
	score++;
    if (body2.sprite.alive)
    {
    	body2.sprite.kill();
    }
};

function hitRedCoins(body1, body2) 
{
	score--;
};

function hitGreenCoins(body1, body2) {
	score+=2;
};

function drawLives()
{
	for ( var i = 0; i < lifeNumber; i++)
	{
		life[i] = game.add.sprite(650+(i*50), 20, 'nave');
		life[i].scale.x = 0.4;
		life[i].scale.y = 0.7;
	}
}

function decreaseLifeNumber()
{
	if (lifeNumber > 0)
	{
		lifeNumber--;
		life[lifeNumber].kill();
	}
	
	else 
	{
		isJogo = false;
		isGameOver = true;
	}
}
