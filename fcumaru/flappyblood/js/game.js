var game = new Phaser.Game(960, 600, Phaser.AUTO, '');
var userScore;
var highScore = 0;

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
		this.game.load.spritesheet('cell_tail',
				'assets/celltail_500-50-10.png', 50, 50);
		this.game.load.image('piso', 'assets/piso_960-50.png', 960, 50);
		this.game.load.image('teto', 'assets/teto_960-50.png', 960, 50);
		this.game.load.image('fat1a', 'assets/fat1a_223-302.png', 223, 302);
		this.game.load.image('fat1b', 'assets/fat1b_223-302.png', 223, 302);
		this.game.load.image('fat2a', 'assets/fat2a_162-78.png', 162, 78);
		this.game.load.image('fat2b', 'assets/fat2b_162-78.png', 162, 78);
		this.game.load.image('fat3a', 'assets/fat3a_223-190.png', 223, 190);
		this.game.load.image('fat3b', 'assets/fat3b_223-190.png', 223, 190);

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

		// this.tubes = new Array();
		this.scored = new Array();

		this.points = 0;

		// background
		this.background = this.game.add.image(0, 0, 'background');

		// gorduras e veias
		this.fatVein = this.game.add.image(0, 57, 'fat_vein');

		// CREATE A tubos:
		this.fats = this.game.add.group();
		this.timer = this.game.time.events
				.loop(2000, this.add_row_of_fat, this);

		// CREATE A cena:
		this.cena = game.add.group();
		this.cena.create(0, 0, 'teto');
		this.cena.create(0, 550, 'piso');
		this.game.physics.enable(this.cena, Phaser.Physics.ARCADE);

		// CREATE A celula:
		this.cellHSprite = game.add.sprite(455, 275, 'cell_head');
		this.cellHSprite.animations.add('collision', [ 1, 2, 3, 4, 5, 6, 7, 8,
				9, 10 ], 15, true);
		this.game.physics.enable(this.cellHSprite, Phaser.Physics.ARCADE);

		this.cellHSprite.body.acceleration.y = 150;
		this.cellHSprite.body.collideWorldBounds = true;
		this.cellHSprite.body.drag.x = 100;
		this.cellHSprite.anchor.setTo(.5, .5);
		this.cellHSprite.body.gravity.y = 450;

		this.cellTSprite = game.add.sprite(405, 275, 'cell_tail');
		this.cellTSprite.animations.add('jump',
				[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], 10, true);
		this.game.physics.enable(this.cellTSprite, Phaser.Physics.ARCADE);

		this.cellTSprite.body.acceleration.y = 150;
		this.cellTSprite.body.collideWorldBounds = true;
		this.cellTSprite.body.drag.x = 100;
		this.cellTSprite.anchor.setTo(.5, .5);
		this.cellTSprite.body.gravity.y = 450;

		// exibe score
		var style = {
			font : "40px Arial",
			fill : "#ff0044",
			align : "center"
		};
		this.score = game.add.text(game.world.centerX + 220, 10, "SCORE: "
				+ this.points, style);
	},
	update : function() {
		// COLISAO:
		this.game.physics.arcade.overlap(this.cellHSprite, this.cena,
				this.collision, null, this);
		 this.game.physics.arcade.overlap(this.cellHSprite, this.fats,
		 this.collision, null, this);

		this.fats.setAll('body.velocity.x', -330);
		for (var i = 0; i < this.fats.total; i++) {
			var fat = this.fats.getAt(i);

			if ((this.cellHSprite.body.x > fat.body.x + fat.body.width)
					&& (!this.scored[i])) {
				this.scored[i] = true;
				this.points++;
				this.score.setText("SCORE: " + this.points);
			}
		}

		this.cellTSprite.animations.play('jump');

		// PEGA A ENTRADA (tecla pressionada):
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			// vai para cima
			this.cellHSprite.body.velocity.y = -200;
			this.cellTSprite.body.velocity.y = -200;
		}
	},
	collision : function(cell, bg) {
		this.backgroundSound.pause();

		this.backgroundSound = game.add.audio("collision_sound", 1, true);
		this.backgroundSound.play('', 0, 1, false);

		this.cellHSprite.animations.play('collision');

		userScore = this.points;
		if (userScore > highScore) {
			highScore = userScore;
		}

		this.game.time.events.remove(this.timer);

		this.game.state.start('game_over');
	},
	add_row_of_fat : function() {
		// var hole = Math.floor(Math.random() * 5) + 1;
		//
		// for (var i = 0; i < 8; i++) {
		// if (i != hole && i != hole + 1) {
		// this.add_one_fat(400, i * 60 + 10);
		// }
		// }

		var i = getRandomInt(0, 5);
		var fat;
		switch (i) {
		case 0:
			fat = this.fats.create(this.game.width, 50, 'fat1a');
			fat.outOfBoundsKill = true;
			break;
		case 1:
			fat = this.fats.create(this.game.width, this.game.height - 352,
					'fat1b');
			fat.outOfBoundsKill = true;
			break;

		case 2:
			fat = this.fats.create(this.game.width, 50, 'fat2a');
			fat.outOfBoundsKill = true;
			break;
		case 3:
			fat = this.fats.create(this.game.width, this.game.height - 128,
					'fat2b');
			fat.outOfBoundsKill = true;
			break;

		case 4:
			fat = this.fats.create(this.game.width, 50, 'fat3a');
			fat.outOfBoundsKill = true;
			break;
		case 5:
			fat = this.fats.create(this.game.width, this.game.height - 240,
					'fat3b');
			fat.outOfBoundsKill = true;
			break;

		default:
			break;
		}

		this.game.physics.enable(this.fats, Phaser.Physics.ARCADE);
	}
}

var GameOver = function() {
};
GameOver.prototype = {
	preload : function() {
		this.game.load.image('game_over',
				'assets/game_over_screen_960_600.png', 960, 600);
		this.game.load.image('bt_restart', 'assets/btrestart_487_87.png', 487,
				87);

		// Audio
		this.game.load.audio('game_over_sound',
				'audio/som_tela_de_game_over.mp3');
	},
	create : function() {
		if (this.backgroundSound != null) {
			this.backgroundSound.pause();
		}

		this.backgroundSound = this.game.add.audio("game_over_sound", 1, false);
		this.backgroundSound.play();

		// background
		this.background = this.game.add.image(0, 0, 'game_over');

		// restart button
		this.btRestart = this.game.add.image(230, 404, 'bt_restart');
		this.btRestart.inputEnabled = true;
		this.btRestart.events.onInputDown.add(this.btRestartClick, this);

		// exibe score
		var style = {
			font : "32px Arial",
			fill : "#ffdd44",
			align : "left"
		};
		if (userScore > 0) {
			this.game.add.text(this.game.world.centerX + 252,
					this.game.world.centerY - 188, userScore, style);
		} else {
			this.game.add.text(this.game.world.centerX + 252,
					this.game.world.centerY - 188, "0", style);
		}

		// exibe high score
		if (highScore > 0) {
			this.game.add.text(this.game.world.centerX + 252,
					this.game.world.centerY - 30, highScore, style);
		} else {
			this.game.add.text(this.game.world.centerX + 252,
					this.game.world.centerY - 30, "0", style);
		}
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