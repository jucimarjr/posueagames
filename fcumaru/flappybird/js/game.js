var celulaSprite, fundo, cena;
var style = {
	font : "40px Arial",
	fill : "#ff0044",
	align : "center"
};

var points;
var scored;
var tubos;
var gameOver;
var background;

var startScreen = true;

var game = new Phaser.Game(960, 600, Phaser.AUTO, '', {
	preload : preload,
	create : create,
	update : update
});

function preload() {
	// first screen
	game.load.image('background', 'assets/fundo_960-600.png', 960, 600);
	game.load.image('logo', 'assets/logo_800-190.png', 800, 190);
	game.load.image('fat_vein', 'assets/assets-02.png', 800, 190);
	game.load.image('bt_play', 'assets/btn_play_280-100.png', 280, 100);

	// game.load.spritesheet('celula', 'assets/celula_50-50-2.png', 50, 50);
	game.load.spritesheet('celula', 'assets/bird_275-50-5.png', 55, 50);
	game.load.image('piso', 'assets/piso_960-50.png', 960, 50);
	game.load.image('teto', 'assets/teto_960-50.png', 960, 50);
	game.load.image('tuboinferior', 'assets/tuboinferior_80-480.png', 80, 480);
	game.load.image('tubosuperior', 'assets/tubosuperior_80-480.png', 80, 480);

	// Audio
	game.load.audio('background_sound', 'audio/som_principal.mp3');
	game.load.audio('collision_sound', 'audio/som_quando_houver_colisa_o.mp3');
	game.load.audio('game_over_sound', 'audio/som_tela_de_game_over.mp3');

	// game over screen
	game.load.image('game_over', 'assets/game_over_screen_960_600.png', 960,
			600);
	game.load.image('bt_restart', 'assets/bt_restart_487_87.png', 487, 87);

}

function create() {

	firstScreen();
	// startGame();
	// gameOverScreen();

}

function update() {
	if (startScreen) {

	} else {
		if (!gameOver) {
			// COLISAO:
			game.physics.arcade.overlap(celulaSprite, cena, colisaoCena, null,
					this);

			for (var i = 0; i < 4; i++) {
				var tubo = tubos[i];

				game.physics.arcade.overlap(celulaSprite, tubo, colisaoTubo,
						null, this);

				if ((celulaSprite.body.x > tubo.getAt(0).body.x
						+ tubo.getAt(0).body.width)
						&& (!scored[i])) {
					scored[i] = true;
					points++;
					score.setText("SCORE: " + points);
				}

				tubo.setAll('body.velocity.x', -100);
				if (tubo.getAt(0).body.x < -tubo.getAt(0).body.width) {
					tubo.setAll('body.x', game.width);

					// gera a posicao y do tubo superior de forma aleatoria
					posYtuboSuperior = (Math.floor((Math.random() * 300) + 100) * (-1));
					tubo.getAt(0).body.y = posYtuboSuperior;
					// a posicao y do tubo inferior sempre sera 600 a mais do
					// superior
					tubo.getAt(1).body.y = posYtuboSuperior + 600;
					scored[i] = false;
				}
			}

			celulaSprite.animations.play('jump');

			// PEGA A ENTRADA (tecla pressionada):
			if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				// vai para cima
				celulaSprite.body.velocity.y = -200;
			}
		} else {
			backgroundSound = game.add.audio("collision_sound", 1, false);
			// backgroundSound.play();
			gameOverScreen();
		}
	}
}

function colisaoCena(celula, cena) {
	celula.kill();
	gameOver = true;
}

function colisaoTubo(celula, tubo) {
	celula.kill();
	gameOver = true;
}

function firstScreen() {
	// background
	background = game.add.image(0, 0, 'background');

	// gorduras e veias
	fatVein = game.add.image(0, 57, 'fat_vein');

	// logo
	logo = game.add.image(90, 180, 'logo');

	// play button
	btPlay = game.add.image(350, 370, 'bt_play');
	btPlay.inputEnabled = true;
	btPlay.events.onInputDown.add(btlistener, this);

}

function startGame() {
	backgroundSound = game.add.audio("background_sound", 1, true);
	// backgroundSound.play('', 0, 1, true);

	tubos = new Array();
	scored = new Array();

	points = 0;
	gameOver = false;

	// CREATE A fundo:
	// fundo = game.add.image(0, 0, 'fundo');
	// game.physics.enable(fundo, Phaser.Physics.ARCADE);

	// CREATE A tubos:
	for (var i = 0; i < 4; i++) {
		var tubo = game.add.group();

		posYtuboSuperior = (Math.floor((Math.random() * 300) + 100) * (-1));

		tubo.create(1000 + (i * 260), posYtuboSuperior, 'tubosuperior');
		tubo.create(1000 + (i * 260), posYtuboSuperior + 600, 'tuboinferior');

		game.physics.enable(tubo, Phaser.Physics.ARCADE);

		tubos.push(tubo);
		scored.push(false);
	}

	// CREATE A cena:
	cena = game.add.group();
	cena.create(0, 0, 'teto');
	cena.create(0, 550, 'piso');
	game.physics.enable(cena, Phaser.Physics.ARCADE);

	// CREATE A celula:
	celulaSprite = game.add.sprite(455, 275, 'celula');
	celulaSprite.animations.add('jump', [ 1, 2, 3, 4, 5 ], 15, true);
	game.physics.enable(celulaSprite, Phaser.Physics.ARCADE); // permite que a
	// sprite tenha
	// um corpo
	// fisico

	celulaSprite.body.acceleration.y = 100;

	celulaSprite.body.collideWorldBounds = true; // para no limite inferio da
	// tela
	celulaSprite.body.drag.x = 100; // desloca 100 e para, só desloca de novo
	// se clicada alguma tecla e quanto maior
	// for seu valor, menos desloca
	celulaSprite.anchor.setTo(.5, .5); // diminui o espaço do deslocamento do
	// espelhamento
	celulaSprite.body.gravity.y = 350;

	// exibe titulo
	title = game.add.text(game.world.centerX - 150, 10, "FLAPPY BIRD", style);

	// exibe score
	score = game.add.text(game.world.centerX + 220, 10, "SCORE: " + points,
			style);

}

function gameOverScreen() {
	backgroundSound = game.add.audio("game_over_sound", 1, false);
	// backgroundSound.play();

	// background
	background = game.add.image(0, 0, 'game_over');
	restart = game.add.image(230, 404, 'bt_restart');
	restart.inputEnabled = true;
	restart.events.onInputDown.add(restartListener, this);
}

function btlistener() {
	startScreen = false;
	startGame();
}

function restartListener() {
	startGame();
}