/*global State, Config*/

State.GamePlay = function (game) {
	"use strict";
	this.game = game;
};
State.GamePlay.prototype = {
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		
		game.physics.startSystem(Phaser.Game.ARCADE);
		game.physics.arcade.gravity.y = 800;
		
		var background;//, buttonPlay, buttonCredits, buttonHowToPlay;
		
		background = this.game.add.sprite(Config.game.x, Config.game.y, Config.game.bgKey);
//		
//		buttonPlay = this.game.add.button(Config.menu.buttonPlay.x, Config.menu.buttonPlay.y, 'button-play', this.clickPlay, this, 0, 1, 2, 3);
//		buttonPlay.anchor.setTo(Config.menu.buttonPlay.anchor.x, Config.menu.buttonPlay.anchor.y);
//		
//		buttonHowToPlay = this.game.add.button(Config.menu.buttonHowToPlay.x, Config.menu.buttonHowToPlay.y, 'button-how-to-play', this.clickHowToPlay, this, 0, 1, 2, 3);
//		buttonHowToPlay.anchor.setTo(Config.menu.buttonHowToPlay.anchor.x, Config.menu.buttonHowToPlay.anchor.y);
//		
//		buttonCredits = this.game.add.button(Config.menu.buttonCredits.x, Config.menu.buttonCredits.y, 'button-credits', this.clickCredits, this, 0, 1, 2, 3);
//		buttonCredits.anchor.setTo(Config.menu.buttonCredits.anchor.x, Config.menu.buttonCredits.anchor.y);
		
		
		this.map = game.add.tilemap(Config.game.map.key);
		this.map.addTilesetImage(Config.game.map.tileSetKey, Config.game.map.tileSetKey);
		
		this.layer = this.map.createLayer(Config.game.map.layerName);
		this.layer.resizeWorld();
		this.map.setCollisionBetween(0, 30, true, Config.game.map.layerName);
		
		game.camera.y = 1200;
		
		this.player = game.add.sprite(Config.game.player.x, Config.game.player.y, Config.game.player.key, 0);
		this.player.anchor.setTo(Config.game.player.anchor.x, Config.game.player.anchor.y);
		game.physics.enable(this.player);
		this.player.animations.add(Config.game.player.anim.walk, [0,1,2,3,4,5], 10, true);
		this.player.animations.add(Config.game.player.anim.jump, [6], 1, false);
		this.player.body.collideWorldBounds = true;
		game.camera.follow(this.player);
		
		this.cursors = game.input.keyboard.createCursorKeys();
		this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function () {
		"use strict";
		
		game.physics.arcade.collide(this.layer, this.player);
		
		this.player.body.velocity.x = 0;
		if(this.cursors.left.isDown)
		{
			this.player.scale.x = .9; 
			this.player.scale.x = -.9;
			this.player.animations.play(Config.game.player.anim.walk);
			this.player.body.velocity.x = -150;
		}
		else if(this.cursors.right.isDown)
		{
			this.player.scale.x = -.9; 
			this.player.scale.x = .9;
			this.player.animations.play(Config.game.player.anim.walk);
			this.player.body.velocity.x = 150;
		}
		
		if(this.player.body.velocity.y !== 0)
			this.player.animations.play(Config.game.player.anim.jump);
		
		if (this.jumpButton.isDown && this.player.body.onFloor())
		{
			this.player.body.velocity.y = -450;
		}
		
//		Config.global.screen.resize(this.game);
	},
	
};