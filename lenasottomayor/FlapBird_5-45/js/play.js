var playGame = { create: create, update: update };

function create() {
	musicMenu.stop();
	
	background = game.add.tileSprite(0, 0, game.stage.bounds.width,game.cache.getImage('background').height, 'background');
	background.autoScroll(-60, 0);	 
	
	computer = game.add.sprite(0, 264,'computer');
	game.physics.enable(computer, Phaser.Physics.ARCADE);
	computer.body.velocity.x = -60;
	
	
	plataforms = game.add.group();
	plataforms.enableBody = true;
	
	plataform = plataforms.create(0, 440, 'plataform');
	game.physics.enable(plataform, Phaser.Physics.ARCADE);
	plataform.body.velocity.x = -60;
	plataform.body.immovable = true;
	
	createObstacles();
	createPlayer();
	
	score = 0;
	jumps = 0;
	collide = false;

	
	
	musicGame = game.add.audio('music');
    musicGame.play('',0,0.2,true);
}

function update() {
	game.physics.arcade.collide(playerSprite, plataforms);
	game.physics.arcade.overlap(playerSprite, obstacles, gameOver, null, this);

	keySpaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    keySpaceBar.onDown.add(jump, this);
    keySpaceBar.onUp.add(stop, this);
    
    if (playerSprite.inWorld == false ) {
    	game.state.start('gameScore');
    	    	
    }
    
	playerSprite.body.velocity.x = 0;
}

function createPlayer() {
	playerSprite = game.add.sprite(300, 309, 'player');
	playerSprite.animations.add('jump',[2],7,true);
	playerSprite.animations.add('dead',[3,2,3,2],4,true)
	playerSprite.frame = 1;
    
	game.camera.follow(playerSprite);
	
	game.physics.enable(playerSprite, Phaser.Physics.ARCADE);
	
	playerSprite.body.gravity.y = 200;
	playerSprite.anchor.setTo(0.5,0.5);
	playerSprite.body.acceleration.y = 500;
}

function jump() {
	
	if(jumps<2) {
		jumps++;
		collide = false;
		playerSprite.body.velocity.y = -500;
		playerSprite.body.velocity.x = 500;
		playerSprite.animations.play('jump');
		this.jumpSound = game.add.audio('jumpSound');
	    this.jumpSound.play();
	}
}

function stop() {
	playerSprite.animations.stop();
	playerSprite.frame = 1;
}

function createObstacles() {
	obstacles = game.add.group();
	obstacles.createMultiple(20,'obstacle');
	obstacles.enableBody = true;
    this.timer = this.game.time.events.loop(1500, addObstacle, this);
}

function addObstacle() {
	var heigth = game.world.randomY;

	if(heigth > 250 && heigth < 400) {
		obstacle = obstacles.getFirstDead();
		obstacle.reset(960, heigth+100);
		game.physics.enable(obstacle, Phaser.Physics.ARCADE);
		obstacle.body.velocity.x = -250;
		obstacle.body.immovable = true;
		obstacle.outOfBoundsKill = true;
	} else if (heigth <= 250) {
		obstacle = obstacles.getFirstDead();
		obstacle.reset(960, heigth+250);
		game.physics.enable(obstacle, Phaser.Physics.ARCADE);
		obstacle.body.velocity.x = -250;
		obstacle.body.immovable = true;
		obstacle.outOfBoundsKill = true;
	} else {
		obstacle = obstacles.getFirstDead();
		obstacle.reset(960, heigth-150);
		game.physics.enable(obstacle, Phaser.Physics.ARCADE);
		obstacle.body.velocity.x = -250;
		obstacle.body.immovable = true;
		obstacle.outOfBoundsKill = true;
	}
}

function gameOver(playerSprite,obstacle){
	if((playerSprite.position.y < obstacle.position.y)){
		game.physics.arcade.collide(playerSprite, obstacles);
		jumps=0;
		if(collide == false){
			score++;
			collide = true;
		}
	} else {	
		playerSprite.frame = 3;
		musicGame.stop();
		deadSound = game.add.audio('deadSound');
		deadSound.play('',0,0.2,false);
		game.state.start('gameScore');
	}
}