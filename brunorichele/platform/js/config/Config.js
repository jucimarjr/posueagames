var Config = {
	choiseLabel : null,
	global: {
		animationVelocity: 6
	},
	screen: {
		width: 1920,
		height: 1080,
		resize: function (game) {
			"use strict";
			game.scale.minWidth = 320;
			game.scale.minHeight = 240;
			game.scale.maxWidth = 1920;
			game.scale.maxHeight = 1080;
			
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize();	
		}
	},
	pause: function (game){
		pause_label = game.add.text(0, 0, 'Pause', { font: '24px Arial', fill: '#fff' });
		pause_label.fixedToCamera = true;
    	pause_label.cameraOffset.setTo(Config.screen.width - 100, 20);
		pause_label.inputEnabled = true;
		pause_label.events.onInputUp.add(function () {
			// When the paus button is pressed, we pause the game
			game.paused = true;
	
			// And a label to illustrate which menu item was chosen. (This is not necessary)
			this.choiseLabel = game.add.text(Config.screen.width/2, 1500, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
			this.choiseLabel.anchor.setTo(0.5, 0.5);
			game.input.onDown.add(Config.unpause, self);
		});	
	},
	unpause: function(){
		this.choiseLabel.destroy();

		// Unpause the game
		game.paused = false;	
	}		
};

//Menu
Config.button = {
	load: function(game){
		game.load.spritesheet('button-back', Config.button.back.background, Config.button.back.width, Config.button.back.height);
		game.load.spritesheet('button-next', Config.button.next.background, Config.button.next.width, Config.button.next.height);
		game.load.spritesheet('button-init', Config.button.init.background, Config.button.init.width, Config.button.init.height);		
	},
	back: {
		background: 'assets/spritesheets/voltar_474-55-2.png',
		x: Config.screen.width * 0.1,
		y: Config.screen.height * 0.9,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	next: {
		background: 'assets/spritesheets/avancar_474-55-2.png',
		x: Config.screen.width * 0.9,
		y: Config.screen.height * 0.9,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	init: {
		background: 'assets/spritesheets/inicio_474-55-2.png',
		x: Config.screen.width * 0.9,
		y: Config.screen.height * 0.9,
		width: 237,
		height: 55,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},				
	textStyle: {
		font: '25px Ms Sans Serif',
		fill: '#ffffff'
	}
};