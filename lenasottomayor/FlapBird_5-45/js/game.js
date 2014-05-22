
var plataformas, base, jogadorSprite, background, sky, keySpaceBar, mouseClickLeft;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	
	game.load.spritesheet('player', 'assets/manspritesheet_245-102-3.png', 77,102);
	game.load.image('base', 'assets/base_200-200.png');
	game.load.image('background', 'assets/background_960-600.png');
	game.load.image('sky', 'assets/sky_1920-600.png');
    //game.load.image('chao', 'assets/chao_960-54.png');
    //game.load.image('bloco', 'assets/bloco_276-107.png');
    //game.load.image('osso', 'assets/osso_109-87.png');

}
//
function create () {
	background = game.add.sprite(0, 0, 'background');
	
	sky = game.add.sprite(0, 0, 'sky');
    game.physics.arcade.enable(sky);
	
	jogadorSprite = game.add.sprite(100, 0, 'player');
	jogadorSprite.animations.add('jump',[0,1,3],5,true);
	game.physics.enable(jogadorSprite, Phaser.Physics.ARCADE);
	jogadorSprite.body.acceleration.y = 500;
	jogadorSprite.body.collideWorldBounds = true;
    game.camera.follow(jogadorSprite);
	
	
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
    keySpaceBar.onUp.add(stop(), this);
}


function update () {
	
	jogadorSprite.body.velocity.x = 0;
    sky.body.velocity.x = 0;
	
    if (game.camera.x >= 0) {
    	 sky.body.velocity.x = -10;
    }
	
	if(game.input.activePointer.isDown){
		jump();
	} else {
		jogadorSprite.animations.stop();
		jogadorSprite.frame = 0;
	}	
}

function jump() {
	jogadorSprite.body.velocity.y = -300;
	jogadorSprite.body.velocity.x = 0;
	jogadorSprite.animations.play('jump');
}

function stop() {
	jogadorSprite.animations.stop();
	jogadorSprite.frame = 0;
}

