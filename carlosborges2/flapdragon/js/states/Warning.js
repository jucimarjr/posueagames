var warningState = {

	preload : function() {
		this.style = {
			font : "55px Arial",
			fill : "#FFFFFF",
			align : "center"
		};
	},

	create : function() {
		text = this.game.add.text(this.game.world.centerX,
				this.game.world.centerY, "THE FOLLOWING GAME\n"
						+ "MAKES NO APOLOGY TO\nDRUGS, CONTAINS COARSE\n"
						+ "LANGUAGE AND DUE TO\nITS CONTENT IT SHOULD\n"
						+ "NOT BE PLAYED BY ANYONE", this.style);

		text.anchor.set(0.5);
		text.alpha = 0;

		t1 = this.game.add.tween(text);
		t1.to({
			alpha : 1
		}, 2000, Phaser.Easing.Linear.None, true);
		t1.onComplete.add(secondTween, text, this);

	},

};

function secondTween(text) {
	t2 = this.game.add.tween(text);
	t2.to({
		alpha : 0
	}, 2000, Phaser.Easing.Linear.None, true, 5000, 0);
	t2.onComplete.add(onComplete, this);
}

function onComplete() {
	game.state.start('load');
}