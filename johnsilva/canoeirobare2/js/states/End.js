State.End = function (game) {
		"use strict";
		this.game = game;
};
State.End.prototype = {
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		this.initEnd(1);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},

	initEnd: function(id){
		
		var end = this.game.add.sprite(Config.end.x, Config.end.y, 'end'+id);

		this.game.add.tween(end).to({alpha:0}, 
			Config.end.millis, Phaser.Easing.Linear.None).start().onComplete.add(function() {
				if(id == 4)
					this.menu();
				else
					this.initEnd(id+1);
		}, this);
	},

	menu: function(){
		this.game.state.start('Menu');
	}
};