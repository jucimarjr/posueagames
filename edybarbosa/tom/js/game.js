
var game = new Phaser.Game(960, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var cat;
var fence;

function preload() {
	game.stage.backgroundColor = "#ffffff";
	game.load.spritesheet('gato', 'assets/gato.png', 154, 81, 4);
//	game.load.spritesheet('lata', 'assets/lixeiras.png', 111, 173, 4);
	game.load.image('cerca', 'assets/muroteste.png');
}


function create() {

	cat   = game.add.sprite(40,284,'gato');
	fence = game.add.tileSprite(0, 350, 847, 130,'cerca');
	//trash = game.add.sprite(40,284,'lata');

	cat.animations.add('run');
	//cat.animations.add('lata');
	
	cat.animations.play('run', 10, true);

}

function update() {
	
	fence.tilePosition.x -= 5;
}