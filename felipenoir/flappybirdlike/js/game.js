var game = new Phaser.Game(960, 600, Phaser.AUTO, '', {
	preload : preload,
	create : create,
	update : update
});

var player = null;
var level = null;

function preload() {
	player = new Player(game);
	level = new Level(game);

	level.preload();
	player.preload();
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	level.create();
	player.create();
}

function update() {
	player.update();
}