
var plataformas;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
	game.load.image('ceu', 'assets/sky.png');
    game.load.image('plataforma', 'assets/platform.png');

}

function create () {
	game.add.sprite(0, 0, 'ceu');
	platformas = game.add.group();
    platformas.enableBody = true;

    var chao = plataformas.create(0, game.world.height - 64, 'plataforma');

    chao.scale.setTo(2, 2);

    chao.body.immovable = true;
	
	
}


function update () {

}

