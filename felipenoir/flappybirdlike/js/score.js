var score = {

	preload : function() {
//		game.load.bitmapFont();
	},

	create : function() {
		console.log('score -> create');
		var style = {
			fill : '#ffffff'
		};
		var text = game.add.text(0, 0, "SCORE : ", style);
	},

	update : function() {

	}

}