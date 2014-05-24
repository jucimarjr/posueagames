Score = function() {
	this.count;
	this.text;
}

Score.prototype = {

	create : function() {
		this.count = 0;
		console.log('score -> create');
		var style = {
			fill : '#ffffff'
		};
		this.text = game.add.text(0, 0, "SCORE : ", style);
		this.text.fixedToCamera = true;
	},
	
	update : function() {
		this.text.setText("SCORE : " + this.count);
	}

}