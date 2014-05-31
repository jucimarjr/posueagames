/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
    this.map = null;
    this.layer = null;
    this.player = null;
    try {
        this.drop = new Character(this.game, 'dude',
                'assets/images/Dude_32-48.png', [32, 48]);
    } catch(exception) {
        console.log(exception.toString());
    }
};
State.GamePlay.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('gameplay-bg',  Config.gamePlay.dir);
		this.game.load.tilemap('map', 'assets/mapLevel1_480-1600.json', null, Phaser.Tilemap.TILED_JSON);
	    this.game.load.image('tileset','assets/images/tileset.png');

		// Player
        this.drop.preload();
	},
	create: function () {
		"use strict";
		var background;
		background = this.game.add.tileSprite(Config.gamePlay.x, Config.gamePlay.y, 480, 900, 'gameplay-bg');
		background.fixedToCamera = true;

		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tileset','tileset');
		this.layer = this.map.createLayer('Camada de Tiles 1');
        this.layer.resizeWorld();
        this.map.setCollisionBetween(1, 3, true,'Camada de Tiles 1');

		// Creating player
        this.drop.create(50, game.world.height - 400);
	},
	update: function () {
		"use strict";
		//Config.global.screen.resize(this.game); //dont resize game
        this.game.physics.arcade.collide(this.drop.getSpriteObject(), this.layer);

		this.handleKeyDown();
	},
	handleKeyDown: function () {
		"use strict";

		//this.player.body.velocity.x = 0;
		this.drop.setVelocityX(0);

		if ( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
            this.drop.moveRight(10);

		} else if ( this.game.input.keyboard.isDown (Phaser.Keyboard.LEFT) ) {
            this.drop.moveLeft(10);

		} else {
            this.drop.stop();
		}
		// Jump
		if ( this.game.input.keyboard.isDown (Phaser.Keyboard.UP) ) {
            this.drop.jump(600);
		}
	},
	clickHowToPlay: function () {
		"use strict";
		this.game.state.start('HowToPlay');
	},
	clickCredits: function () {
		"use strict";
		this.game.state.start('Credits');
	}
};
