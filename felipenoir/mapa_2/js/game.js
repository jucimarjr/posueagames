var game = new Phaser.Game(960, 600, Phaser.AUTO, '', {
	preload : preload,
	create : create,
	update : update
});

function preload() {
	game.load.tilemap('map', 'assets/untitled.json', null,
			Phaser.Tilemap.TILED_JSON);
	game.load.image('tileset', 'assets/tile.png');
	game.load.image('sky', 'assets/sky.jpg');
	game.load.spritesheet('robo', 'assets/robo_33-38-3.png', 33, 38, 3);
}

var map, layer, robo;

function create() {
	game.physics.startSystem(Phaser.Game.ARCADE);
	game.physics.arcade.gravity.y = 800;

	var sky = game.add.tileSprite(0, 0, 1920, 600, 'sky');
	sky.fixedToCamera = true;

	map = game.add.tilemap('map');
	map.addTilesetImage('tileset', 'tileset');

	layer = map.createLayer('Camada de Tiles 1');
	layer.resizeWorld();
	map.setCollisionBetween(0, 3, true, 'Camada de Tiles 1');

	robo = game.add.sprite(50, 10, 'robo', 0);
	robo.animations.add('walk', [ 1, 2 ], 6, true);
	game.physics.enable(robo, Phaser.Physics.ARCADE);

	robo.body.collideWorldBounds = true;
	robo.body.drag.x = 100;
	robo.anchor.setTo(.5, .5);
	robo.body.gravity.y = 100;
	game.camera.follow(robo);
}

function update() {
	game.physics.arcade.collide(layer, robo);

	if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		robo.body.velocity.x = 100;
		robo.scale.x = +1;
		robo.animations.play('walk');
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		robo.body.velocity.x = -100;
		robo.scale.x = -1;
		robo.animations.play('walk');
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.UP) /*&& robo.body.touching.down*/) {
		robo.body.velocity.y = -250;
	} else {
		robo.animations.stop();
		robo.frame = 0;
	}
}