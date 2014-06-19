/*global setTimeout, Config, Phaser*/

State.Story = function (game) {
	"use strict";
	this.game = game;
};

var isShowRayHelp;
var contFrame;
var imgRay;

State.Story.prototype = {
		
	preload: function () {
		"use strict";
		isShowRayHelp = false;
		contFrame = 0;
	},
	
	create: function () {
		"use strict";
		
		var sprite = this.game.add.sprite(Config.story.x, Config.story.y, Config.story.key);
		
		setTimeout(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.story.alphaTime, Phaser.Easing.Linear.None).start();
		}, Config.story.alphaWait);
		
		setTimeout(function () {
//			this.game.state.start('Game');
			isShowRayHelp = true;
		}, Config.story.nextStateWait);
		
	},
	
	update: function () {
		"use strict";
		
		//Config.global.screen.resize(this.game);
		if(isShowRayHelp){
			if (contFrame < 69){
	    		if(imgRay!=null){
	    			imgRay.kill();
	    		}
	    		
	    		imgRay = this.game.add.sprite(0, 0, Config.story.rayHelp.ray[contFrame]);
	    	}else{
	    		imgRay.kill();
	    		this.game.state.start('Game');
	    	}
			
			contFrame ++;
		}
		
		
	}
};