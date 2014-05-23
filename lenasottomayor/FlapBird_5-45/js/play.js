var playGame = { create: create, update: update };

function create() {
	background = game.add.tileSprite(0, 0, game.stage.bounds.width,game.cache.getImage('background').height, 'background');
	background.autoScroll(-70, 0);	 
	 
	createObstacles();
	createPlayer();
	
	this.timer = this.game.time.events.loop(2500, addObstacle, this);
	this.music = game.add.audio('music',1,true);
    this.music.play('',0,0.2,true);
}

function update() {
	keySpaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    keySpaceBar.onDown.add(jump, this);
    keySpaceBar.onUp.add(stop, this);
    
	playerSprite.body.velocity.x = 0;
}

function createPlayer() {
	playerSprite = game.add.sprite(150, 300, 'player');
	playerSprite.animations.add('jump',[2],7,true);
	playerSprite.frame = 1;
    
	game.camera.follow(playerSprite);
	
	game.physics.enable(playerSprite, Phaser.Physics.ARCADE);
	
	playerSprite.body.gravity.y = 100;
	playerSprite.anchor.setTo(0.5,0.5);
	playerSprite.body.acceleration.y = 500;
	playerSprite.body.collideWorldBounds = true;
}

function jump() {
	playerSprite.body.velocity.y = -400;
	playerSprite.body.velocity.x = 0;
	playerSprite.animations.play('jump');

}

function stop() {
	playerSprite.animations.stop();
	playerSprite.frame = 1;
}

function createObstacles() {
	platforms = game.add.group();
    platforms.enableBody = true;
}

function addObstacle() {
	var heigth = game.world.randomY;
	
	if((heigth+200) < 500) {
		obstacle = platforms.create(960, heigth+300, 'obstacle');
		game.physics.enable(obstacle, Phaser.Physics.ARCADE);
		obstacle.body.velocity.x = -250;
	} else {
		obstacle = platforms.create(960, heigth-100, 'obstacle');
		game.physics.enable(obstacle, Phaser.Physics.ARCADE);
		obstacle.body.velocity.x = -250;
	}
}