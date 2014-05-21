
var game = new Phaser.Game(960, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var cat;
var fence;
var trash;

function preload() {
	game.stage.backgroundColor = "#ffffff";
	game.load.spritesheet('gato', 'assets/gato.png', 154, 81, 4);
	game.load.spritesheet('lata', 'assets/lixeiras.png', 111, 173, 1);
	game.load.image('cerca', 'assets/muro_842-131.png');
}

function create() {
	cat   = game.add.sprite(40,284,'gato');
	fence = game.add.tileSprite(100, 350, 842, 131,'cerca');
	trash = game.add.sprite(1100, 320,'lata');
	
	//trash = game.add.sprite(40,284,'lata');
	cat.animations.add('run');
	//cat.animations.add('lata');
	cat.animations.play('run', 10, true);
	
}

function update() {
	fence.tilePosition.x -= 5;
	trash.x -=5;
}