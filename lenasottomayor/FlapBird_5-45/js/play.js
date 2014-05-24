var playGame = { create: create, update: update };

function create() {
	
	background = game.add.tileSprite(0, 0, game.stage.bounds.width,game.cache.getImage('background').height, 'background');
	background.autoScroll(-100, 0);	 
	
	computer = game.add.sprite(0, 264,'computer');
	game.physics.enable(computer, Phaser.Physics.ARCADE);
	computer.body.velocity.x = -100;
	
	
	plataforms = game.add.group();
	plataforms.enableBody = true;
	
	plataform = plataforms.create(0, 440, 'plataform');
	game.physics.enable(plataform, Phaser.Physics.ARCADE);
	plataform.body.velocity.x = -100;
	plataform.body.immovable = true;
	
	createObstacles();
	createPlayer();
	
	

	musicMenu.stop();
	
	musicGame = game.add.audio('music');
    musicGame.play('',0,0.2,true);
}

function update() {
	game.physics.arcade.collide(playerSprite, plataforms);
	game.physics.arcade.overlap(playerSprite, obstacles, gameOver, null, this);

	keySpaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    keySpaceBar.onDown.add(jump, this);
    keySpaceBar.onUp.add(stop, this);
    
	playerSprite.body.velocity.x = 0;
}

function createPlayer() {
	playerSprite = game.add.sprite(150, 309, 'player');
	playerSprite.animations.add('jump',[2],7,true);
	playerSprite.animations.add('dead',[3,2,3,2],4,true)
	playerSprite.frame = 1;
    
	game.camera.follow(playerSprite);
	
	game.physics.enable(playerSprite, Phaser.Physics.ARCADE);
	
	playerSprite.body.gravity.y = 200;
	playerSprite.anchor.setTo(0.5,0.5);
	playerSprite.body.acceleration.y = 500;
	playerSprite.body.collideWorldBounds = true;
}

function jump() {
	playerSprite.body.velocity.y = -400;
	playerSprite.body.velocity.x = 400;
	playerSprite.animations.play('jump');
	this.jumpSound = game.add.audio('jumpSound');
    this.jumpSound.play();

}

function stop() {
	playerSprite.animations.stop();
	playerSprite.frame = 1;
}

function createObstacles() {
	obstacles = game.add.group();
	obstacles.enableBody = true;
    this.timer = this.game.time.events.loop(1700, addObstacle, this);
}

function addObstacle() {
	var heigth = game.world.randomY;

	if(heigth > 250 && heigth < 400) {
		obstacle = obstacles.create(960, heigth+100, 'obstacle');
		game.physics.enable(obstacle, Phaser.Physics.ARCADE);
		obstacle.body.velocity.x = -200;
		obstacle.body.immovable = true;
	} else if (heigth <= 250) {
		obstacle = obstacles.create(960, heigth+250, 'obstacle');
		game.physics.enable(obstacle, Phaser.Physics.ARCADE);
		obstacle.body.velocity.x = -200;
		obstacle.body.immovable = true;
	} else {
		obstacle = obstacles.create(960, heigth-150, 'obstacle');
		game.physics.enable(obstacle, Phaser.Physics.ARCADE);
		obstacle.body.velocity.x = -200;
		obstacle.body.immovable = true;
	}
}

function gameOver(){
	
	game.physics.arcade.collide(playerSprite, obstacles);
	if((playerSprite.position.y > obstacle.position.y)){
		playerSprite.animations.play('dead');
		playerSprite.frame = 3;
	    musicGameOver = game.add.audio('deadSound');
	    musicGameOver.play('',0,0.2,false);
		musicGame.stop();
		game.state.start('gameScore');


					
	}
	
	
//	game.physics.arcade.collide(playerSprite, obstacles);
//	if((playerSprite.position.y > obstacle.position.y)){
//		if ((playerSprite.position.x < obstacle.position.x) && (playerSprite.position.x  > obstacle.position.x+129)) {
//
//
//			playerSprite.frame = 3;
//		} else {
//			musicGame.stop();
//			game.state.start('gameScore');
//		}
//	}

	
//	playerSprite.frame = 3;
//	musicGame.stop();
//	game.state.start('gameScore');
}