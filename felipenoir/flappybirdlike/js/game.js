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

	player.preload();
	level.preload();
}

function create() {

}

function update() {

}