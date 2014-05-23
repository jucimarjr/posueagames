
var base, playerSprite, sky, keySpaceBar, obstacles;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	
	game.load.spritesheet('player', 'assets/manspritesshet_485-131-4.png', 121.25,131);
	game.load.image('base', 'assets/base_200-200.png');
	game.load.image('obstacle', 'assets/Obstacle_129-509.png');
	game.load.image('sky', 'assets/background_980-600.png');

}

function create () {
	
	sky = game.add.tileSprite(0, 0, game.stage.bounds.width,game.cache.getImage('sky').height, 'sky');
    sky.autoScroll(-200, 0);
	
	createPlayer();
	
//	createObstacles();
	
	
	
	
//	jogadorSprite.body.drag.x = 100; //desloca 100 e para, só desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
//	jogadorSprite.anchor.setTo(.5,.5); // diminui o espaco do deslocamento do espelhamento 
//	jogadorSprite.body.gravity.y = 150;
	
    /*ossos = game.add.group();
    ossos.create( 500, 50, 'osso');
    ossos.create( 620, 60, 'osso');
    ossos.create( 100, 450, 'osso');
    ossos.create( 700, 450, 'osso');
    ossos.create( 800, 450, 'osso');
    game.physics.enable(ossos, Phaser.Physics.ARCADE);*/

//    plataformas = game.add.group();
//    plataformas.enableBody = true;
    
//    base = plataformas.create(0, 400, 'base');
//    base.body.immovable = true; // deixa o bloco imovivel
    
    //chao = plataformas.create(0, 546, 'chao');
    //chao.body.immovable = true;
    
    keySpaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    keySpaceBar.onDown.add(jump, this);
    keySpaceBar.onUp.add(stop, this);
	
	game.time.events.loop(1500, add_row_of_obstacles(), this);
}


function update () {
	

	keySpaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    keySpaceBar.onDown.add(jump, this);
    keySpaceBar.onUp.add(stop, this);
    
	playerSprite.body.velocity.x = 0;
	
	
//	if(game.input.activePointer.isDown){
//		jump();
//	} else {
//		stop();
//	}	
}

function createPlayer() {
	playerSprite = game.add.sprite(100, 300, 'player');
	playerSprite.animations.add('jump',[0,2],7,true);
    
	game.camera.follow(playerSprite);
	
	game.physics.enable(playerSprite, Phaser.Physics.ARCADE);
	
	playerSprite.body.gravity.y = 500;
	playerSprite.anchor.setTo(0.5,0.5);
	playerSprite.body.acceleration.y = 500;
	playerSprite.body.collideWorldBounds = true;
}

function createObstacles() {
	obstacles = game.add.group();  
	obstacles.createMultiple(20, 'obstacle'); 
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

function add_one_obstacle(x, y) {
	var obstacle = this.obstacles.getFirstDead();
	
	obstacle.reset(x, y);
	
	obstacle.body.velocity.x = -200;
	
	obstacle.outOfBoundsKill = true;
}


function add_row_of_obstacles() {  
    var value = Math.floor(Math.random()*5)+1;

    add_one_obstacle(400, value*60+10);   
}
