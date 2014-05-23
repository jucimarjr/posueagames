
var plataformas, base, jogadorSprite, background, sky, keySpaceBar, mouseClickLeft, obstacles;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload () {
	
	game.load.spritesheet('player', 'assets/manspritesshet_485-131-4.png', 121.25,131,4);
	game.load.image('base', 'assets/base_200-200.png');
	game.load.image('obstacle', 'assets/Obstacle_129-509.png');
	game.load.image('sky', 'assets/background_980-600.png');
	game.load.image('bgtile','assets/bgtiles_256-256.png');
    //game.load.image('chao', 'assets/chao_960-54.png');
    //game.load.image('bloco', 'assets/bloco_276-107.png');
    //game.load.image('osso', 'assets/osso_109-87.png');
	game.load.audio('music', 'assets/AirDucts.wav');
	game.load.audio('jump', 'assets/Blip.wav');
}


function create () {
	
	sky = game.add.sprite(0, 0, 'sky');
    game.physics.arcade.enable(sky);
	
	jogadorSprite = game.add.sprite(100, 0, 'player');
	jogadorSprite.animations.add('jump',[0,2],5,true);
	game.physics.enable(jogadorSprite, Phaser.Physics.ARCADE);
	jogadorSprite.body.acceleration.y = 500;
	jogadorSprite.body.collideWorldBounds = true;
    game.camera.follow(jogadorSprite);
	
	obstacles = game.add.group();  
	obstacles.createMultiple(20, 'obstacle'); 
	
	
//	jogadorSprite.body.drag.x = 100; //desloca 100 e para, sÃ³ desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
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
    
	music = game.add.audio('music',0.5,true);
    music.play('',0,1,true);
	
    keySpaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    keySpaceBar.onDown.add(jump, this);
    keySpaceBar.onUp.add(stop(), this);
	
	game.time.events.loop(1500, add_row_of_obstacles(), this);
}



	function update () {
		
		jogadorSprite.body.velocity.x = 0;
	    sky.body.velocity.x = 0;
		
	    if (game.camera.x >= 0) {
	    	 sky.body.velocity.x = -150;
	    }
		
		if(game.input.activePointer.isDown){
			jump();
		} else {
			stop();
		}	
	}


function jump() {
	jogadorSprite.body.velocity.y = -300;
	jogadorSprite.body.velocity.x = 0;
	jogadorSprite.frame = 2;

}


function stop() {
	jogadorSprite.animations.stop();
	jogadorSprite.frame = 1;
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


//for SCORE --> SET FONT 'Visitor TT1 BRK' 90  #216025 Posição aproximada X= 545 px  Y = 315px (do topo)
// scoreString = 'Score : ';
// scoreText = game.add.text(10, 10, scoreString + score, { font: '90px Visitor TT1 BRK', fill: '#216025' });
	





