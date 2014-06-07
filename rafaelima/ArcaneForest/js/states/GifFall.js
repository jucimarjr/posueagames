State.GifFall = function (game) {
	"use strict";
	this.game = game;
};

var contaFrameGif;
var image;

State.GifFall.prototype = {
	preload: function () {
		contaFrameGif = 0;
	},
	create: function () {
		"use strict";
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		
		if(image!=null){
			image.kill();
		}

		if (contaFrameGif < 30){
			game.add.sprite(0, 0, Config.animationFall.fallGif[contaFrameGif]);
			contaFrameGif++;
		}else{
			this.game.state.start('GameRotate');
		}
         
	}
}