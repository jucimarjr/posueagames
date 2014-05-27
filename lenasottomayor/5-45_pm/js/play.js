var playGame = { create: create, update: update };

function create() {
	musicMenu.stop();
	timerInstructions.stop();
	
	background = game.add.tileSprite(0, 0, game.stage.bounds.width,game.cache.getImage('background').height, 'background');
	background.autoScroll(-60, 0);	 
	
	computer = game.add.sprite(30, 264,'computer');
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

	scorePartial = game.add.bitmapText(750, 20, 'font', 'score: '+score, 36);
	
	musicGame = game.add.audio('music');
    musicGame.play('',0,0.2,true);
	jumpSound = game.add.audio('jumpSound');
}

function update() {
	game.physics.arcade.collide(playerSprite, plataforms);
	game.physics.arcade.overlap(playerSprite, obstacles, gameOver, null, this);
		
	keySpaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    keySpaceBar.onDown.add(jump, this);
	
	mouseClick = game.input.activePointer.isDown;
	
	if(mouseClick){
		jump();
		setTimeout(update, 1000);
	}
    
    if (playerSprite.inWorld == false ) {
    	game.state.start('gameScore');
    }
    
	if (score<10){
		scorePartial.setText('score 0' + score);
	} else {
    	scorePartial.setText('score ' + score);
    }
	
	playerSprite.body.velocity.x = 0;
}

function createPlayer() {
	playerSprite = game.add.sprite(400, 309, 'player');
	playerSprite.animations.add('jump',[2],1,true);
	playerSprite.animations.add('dead',[3,2,3,2],4,true);
	playerSprite.frame = 1;
    
	game.camera.follow(playerSprite);
	
	game.physics.enable(playerSprite, Phaser.Physics.ARCADE);
	
	playerSprite.body.gravity.y = 200;
	playerSprite.anchor.setTo(0.5,0.5);
	playerSprite.body.acceleration.y = 200;
}

function jump() {
	if(jumps<2) {
		jumps++;
		collide = false;
		playerSprite.body.velocity.y = -375;
		playerSprite.body.velocity.x = 1000;
		playerSprite.animations.play('jump');
		jumpSound.play();
	}
}

function stop() {
	playerSprite.animations.stop();
	playerSprite.frame = 1;
}

function createObstacles() {
	obstacles = game.add.group();
	obstacles.createMultiple(200,'obstacle');
	obstacles.enableBody = true;
    this.timer = this.game.time.events.loop(1300, addObstacle, this);
}

function addObstacle() {
	var heigth = game.world.randomY;

	obstacle = obstacles.getFirstDead();
	
	if(heigth > 250 && heigth < 400) {
		obstacle.reset(960, heigth+100);
		obstacleTop = game.add.sprite(960, heigth+73, 'obstacleTop');
	} else if (heigth <= 250) {
		obstacle.reset(960, heigth+250);
		obstacleTop = game.add.sprite(960, heigth+223, 'obstacleTop');
	} else {
		obstacle.reset(960, heigth-150);
		obstacleTop = game.add.sprite(960, heigth-177, 'obstacleTop');
	}
	
	game.physics.enable(obstacleTop, Phaser.Physics.ARCADE);
	obstacleTop.body.velocity.x = -250;
	game.physics.enable(obstacle, Phaser.Physics.ARCADE);
	obstacle.body.velocity.x = -250;
	obstacle.body.immovable = true;
	obstacle.outOfBoundsKill = true;
}

function gameOver(playerSprite,obstacle){
	if((playerSprite.position.y < obstacle.position.y)){
		game.physics.arcade.collide(playerSprite, obstacles);
		jumps=0;
		if(collide == false){
			stop();
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