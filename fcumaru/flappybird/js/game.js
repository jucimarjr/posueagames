var game = new Phaser.Game(960, 600, Phaser.AUTO, '');

var Menu = function() {
};
Menu.prototype = {
	preload : function() {
		this.game.load.image('background', 'assets/background_960-600.png',
				960, 600);
		this.game.load.image('fat_vein', 'assets/backgroundmask_960-490.png',
				800, 190);
		this.game.load.image('logo', 'assets/logo_800-190.png', 800, 190);
		this.game.load.image('bt_play', 'assets/btplay_280-100.png', 280, 100);

		// Audio
		this.game.load.audio('background_sound', 'audio/som_principal.mp3');
	},
	create : function() {
		if (this.backgroundSound != null) {
			this.backgroundSound.pause();
		}

		this.backgroundSound = game.add.audio("background_sound", 1, true);
		this.backgroundSound.play('', 0, 1, true);

		// background
		this.background = this.game.add.image(0, 0, 'background');

		// gorduras e veias
		this.fatVein = this.game.add.image(0, 57, 'fat_vein');

		// logo
		this.logo = this.game.add.image(90, 180, 'logo');

		// play button
		this.btPlay = game.add.image(350, 370, 'bt_play');
		this.btPlay.inputEnabled = true;
		this.btPlay.events.onInputDown.add(this.btPlayClick, this);
	},
	update : function() {
		;
	},
	btPlayClick : function() {
		this.backgroundSound.pause();

		this.game.state.start('play');
	}
}

var Play = function() {
};
Play.prototype = {
	preload : function() {
		this.game.load.image('background', 'assets/background_960-600.png',
				960, 600);
		this.game.load.image('fat_vein', 'assets/backgroundmask_960-490.png',
				800, 190);

		this.game.load.spritesheet('cell_head',
				'assets/cellhead_500-50-10.png', 50, 50);
		this.game.load.image('piso', 'assets/piso_960-50.png', 960, 50);
		this.game.load.image('teto', 'assets/teto_960-50.png', 960, 50);
		this.game.load.image('tubeinf1', 'assets/tubeinf_80-480.png', 80, 480);
		this.game.load.image('tubesup1', 'assets/tubesup_80-480.png', 80, 480);

		// Audio
		this.game.load.audio('background_sound', 'audio/som_principal.mp3');
		this.game.load.audio('collision_sound',
				'audio/som_quando_houver_colisa_o.mp3');
	},
	create : function() {
		if (this.backgroundSound != null) {
			this.backgroundSound.pause();
		}

		this.backgroundSound = game.add.audio("background_sound", 1, true);
		this.backgroundSound.play('', 0, 1, true);

		this.tubes = new Array();
		this.scored = new Array();

		this.points = 0;

		// background
		this.background = this.game.add.image(0, 0, 'background');

		// gorduras e veias
		this.fatVein = this.game.add.image(0, 57, 'fat_vein');

		// CREATE A tubos:
		for (var i = 0; i < 4; i++) {
			var tube = this.game.add.group();

			var posYtuboSuperior = (Math.floor((Math.random() * 300) + 100) * (-1));

			tube.create(1000 + (i * 260), posYtuboSuperior, 'tubesup1');
			tube.create(1000 + (i * 260), posYtuboSuperior + 600, 'tubeinf1');

			this.game.physics.enable(tube, Phaser.Physics.ARCADE);

			this.tubes.push(tube);
			this.scored.push(false);
		}

		// CREATE A cena:
		this.cena = game.add.group();
		this.cena.create(0, 0, 'teto');
		this.cena.create(0, 550, 'piso');
		this.game.physics.enable(this.cena, Phaser.Physics.ARCADE);

		// CREATE A celula:
		this.cellSprite = game.add.sprite(455, 275, 'cell_head');
		this.cellSprite.animations.add('jump', [ 1, 2, 3, 4, 5 ], 15, true);
		this.game.physics.enable(this.cellSprite, Phaser.Physics.ARCADE);

		this.cellSprite.body.acceleration.y = 100;
		this.cellSprite.body.collideWorldBounds = true;
		this.cellSprite.body.drag.x = 100;
		this.cellSprite.anchor.setTo(.5, .5);
		this.cellSprite.body.gravity.y = 350;

		// exibe titulo
		var style = {
			font : "40px Arial",
			fill : "#ff0044",
			align : "center"
		};
		this.title = game.add.text(game.world.centerX - 180, 10,
				"FLAPPY BLOOD", style);

		// exibe score
		this.score = game.add.text(game.world.centerX + 220, 10, "SCORE: "
				+ this.points, style);
	},
	update : function() {
		// COLISAO:
		this.game.physics.arcade.overlap(this.cellSprite, this.cena,
				this.collision, null, this);

		for (var i = 0; i < 4; i++) {
			var tube = this.tubes[i];

			 this.game.physics.arcade.overlap(this.cellSprite, tube,
			 this.collision, null, this);
			
			if ((this.cellSprite.body.x > tube.getAt(0).body.x
					+ tube.getAt(0).body.width)
					&& (!this.scored[i])) {
				this.scored[i] = true;
				this.points++;
				this.score.setText("SCORE: " + this.points);
			}

			tube.setAll('body.velocity.x', -100);
			if (tube.getAt(0).body.x < -tube.getAt(0).body.width) {
				tube.setAll('body.x', this.game.width);

				// gera a posicao y do tube superior de forma aleatoria
				var posYtuboSuperior = (Math
						.floor((Math.random() * 300) + 100) * (-1));
				tube.getAt(0).body.y = posYtuboSuperior;
				// a posicao y do tubo inferior sempre sera 600 a mais do
				// superior
				tube.getAt(1).body.y = posYtuboSuperior + 600;
				this.scored[i] = false;
			}
		}

		this.cellSprite.animations.play('jump');

		// PEGA A ENTRADA (tecla pressionada):
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			// vai para cima
			this.cellSprite.body.velocity.y = -200;
		}
	},
	collision : function(cell, bg) {
		this.backgroundSound.pause();

		this.backgroundSound = game.add.audio("collision_sound", 1, true);
		this.backgroundSound.play('', 0, 1, false);

		this.game.state.start('game_over');
	}
}

var GameOver = function() {
};
GameOver.prototype = {
	preload : function() {
		game.load.image('game_over', 'assets/game_over_screen_960_600.png',
				960, 600);
		game.load.image('bt_restart', 'assets/btrestart_487_87.png', 487, 87);

		// Audio
		this.game.load.audio('game_over_sound',
				'audio/som_tela_de_game_over.mp3');
	},
	create : function() {
		if (this.backgroundSound != null) {
			this.backgroundSound.pause();
		}

		this.backgroundSound = game.add.audio("game_over_sound", 1, false);
		this.backgroundSound.play();

		// background
		this.background = game.add.image(0, 0, 'game_over');

		// restart button
		this.btRestart = game.add.image(230, 404, 'bt_restart');
		this.btRestart.inputEnabled = true;
		this.btRestart.events.onInputDown.add(this.btRestartClick, this);
	},
	update : function() {
		;
	},
	btRestartClick : function() {
		this.backgroundSound.pause();

		this.game.state.start('play');
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

game.state.add('menu', Menu);
game.state.add('play', Play);
game.state.add('game_over', GameOver);
game.state.start('menu');