/*global State, Config*/

State.Pause = function (game) {
	"use strict";
	this.game = game;
};
State.Pause.prototype = {
		preload: function () {
			"use strict";
			
			var read = this;
	        this.game.input.keyboard.onDownCallback = function (args) {
	            read.teclaIn(args);
	        };
	        
			this.game.load.image('pause','assets/images/telaPause_503-246.png');
		},
		create: function () {
			"use strict";
			gamePaused.destroy();

	        pausetela = this.game.add.image(0, this.game.height-80, 'pause');
	        
	        pausetela.fixedToCamera = true;

	        unPause.fixedToCamera = true;
	        unPause.alpha = 0.4;
	        
	        teclaIn: function (args) {
	            var keyCode = args.keyCode;
	            var letter = String.fromCharCode(keyCode);
	    		
	            if (letter=='P'){
	            	this.unPauseGame();	
	            }
		},
		update: function () {
			"use strict";
			Config.global.screen.resize(this.game);
		},
		
		unPauseGame: function()
	    {
			this.game.input.keyboard.onDownCallback = null;
			unPause.destroy();

	        pausetela.destroy();

	        this.input.keyboard.disabled = false;
	        this.input.pointer1.disabled = false; 
	        
	        gamePaused.fixedToCamera = true;
	        gamePaused.alpha = 0.4;
	        
	        this.state.start('GamePlay');
	    }
		};

	