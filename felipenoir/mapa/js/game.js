
var game = new Phaser.Game(960, 600, Phaser.AUTO, '', {
	preload : preload,
	create : create,
	update : update
});

function preload() {
	game.load.tilemap('mapa','assets/novoMapa.json',null,Phaser.Tilemap.TILED_JSON);
}

function create() {
	
}

function update() {

}