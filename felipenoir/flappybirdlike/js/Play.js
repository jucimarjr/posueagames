//Play.js
var playState = {

	preload : function() {
		player = new Player();
		level = new Level(game);
		enemies = new Enemies(game);
		coins = new Coin(game);
		score = new Score();

		level.preload();
		player.preload();
		enemies.preload();
		coins.preload();
		score.preload();
	},

	create : function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.world.setBounds(0, 0, 600, game.cache.getImage('mountains').width);
		// Toca audio do menu
		audioMenu = game.add.audio('audioMenu', 1, true);
		audioMenu.play('', 0, 1, true);
		// game.world.setBounds(0, 0, game.stage.bounds.width,
		// game.cache.getImage('trees').height);
		level.create();
		player.create(audioMenu);
		enemies.create();
		coins.create();
		score.create();
		game.camera.follow(player.sprite);
	},

	update : function() {
		game.physics.arcade.collide(player.sprite, level.ground);
		game.physics.arcade.overlap(player.sprite, enemies.enemies, lost, null, this);
		game.physics.arcade.overlap(player.sprite, coins.coins, getCoin, null, this);

		player.update();
		level.update();
		coins.update();
		score.update();
	}

};

function lost(enemy, player) {
	audioMenu.stop();
	console.log('lost');
	game.state.start('gameover');
}

function getCoin(player, coin) {
	console.log('getcoin');
	score.count++;
	coin.kill();
}