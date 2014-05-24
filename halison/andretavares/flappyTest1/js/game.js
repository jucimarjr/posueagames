
this.game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	game.load.image('nave1', 'assets/nave1_100-45.png'); 
	game.load.image('nave2', 'assets/nave2_50-25.png');
	game.load.image('ceu', 'assets/ceu_960-600.png');
	game.load.image('asteroid1', 'assets/asteroids1_48-43.png');
	game.load.image('asteroid2', 'assets/asteroids2_87-100.png');
	game.load.image('asteroid3', 'assets/asteroids3_178-175.png');
	game.load.image('ground', 'assets/ground_960-100.png');
}

function create () {
    this.background = game.add.sprite(0, 0, 'ceu');
    
    this.ground = this.game.add.tileSprite(0, 500, 960, 100, 'ground');
    this.ground.autoScroll(-200, 0);
	
	this.titleGroup = this.game.add.group();
	
	this.nave = game.add.sprite(450, 400, 'nave1');
    this.asteroid1 = this.game.add.sprite(500,100,'asteroid1');
    this.asteroid1.autoScrool(-200,0);
//    this.asteroidGroup = this.game.add.group();
//    this.asteroidGroup.add(this.asteroid1);
    
//	game.physics.enable(nave, Phaser.Physics.ARCADE); // permite que a sprite tenha um corpo fisico
//    nave.body.acceleration.y = 150;
//    nave.body.collideWorldBounds = true; // para no limite inferior da tela
//    nave.body.drag.x = 100; //desloca 100 e para, sÃ³ desloca de novo se clicada alguma tecla e quanto maior for seu valor, menos desloca
//    nave.anchor.setTo(.5,.5); // diminui o espaço do deslocamento do espelhamento 
//    nave.body.gravity.y = 100;
   
}


function update () {
		
}

