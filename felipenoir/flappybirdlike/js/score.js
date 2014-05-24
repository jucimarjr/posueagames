Score = function() {
	this.count;
	this.score;
}

Score.prototype = {

	preload : function() {
		game.load.image('scoreBack', 'assets/score.png');
	},

	create : function() {
		console.log('score -> create');
		this.count = 0;

		var scoreBack = game.add.sprite(0, 0, 'scoreBack');
		scoreBack.fixedToCamera = true;

		var style = {
			font : '30px Arial',
			fill : '#000000'
		};
		this.score = game.add.text(95, 45, this.count, style);
		this.score.fixedToCamera = true;
	},

	update : function() {
		this.score.setText(this.count);
	}

}