
var plataformas;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	game.load.image('ceu', 'assets/sky.png');
    game.load.image('plataforma', 'assets/platform.png');

}

function create () {
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	 
	game.add.sprite(0, 0, 'ceu');
	platformas = game.add.group();
    platformas.enableBody = true;

//    var barreira = plataformas.create(400, 400, 'plataforma');
 //   barreira.body.immovable = true;
	
	
}


function update () {

}

