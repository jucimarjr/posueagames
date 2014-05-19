/**
 * THE FOLLOWING GAME MAKES NO APOLOGY TO DRUGS, CONTAINS COARSE LANGUAGE AND
 * DUE TO ITS CONTENT IT SHOULD NOT BE PLAYED BY ANYONE
 */

function Warning(game) {
	this.game = game;
	this.tween = null;
}

Warning.prototype = {

	create : function() {
		var style = {
			font : "55px Arial",
			fill : "#FFFFFF",
			align : "center"
		};
		var text = this.game.add.text(this.game.world.centerX,
				this.game.world.centerY, "THE FOLLOWING GAME\n"
						+ "MAKES NO APOLOGY TO\nDRUGS, CONTAINS COARSE\n"
						+ "LANGUAGE AND DUE TO\nITS CONTENT IT SHOULD\n"
						+ "NOT BE PLAYED BY ANYONE", style);
		text.anchor.set(0.5);
		text.alpha = 0;
		this.tween = this.game.add.tween(text).to({
			alpha : 1
		}, 3000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		this.tween.onComplete.add(onComplete, this);
	}

}

function onComplete() {
	console.log('complete tween');
}