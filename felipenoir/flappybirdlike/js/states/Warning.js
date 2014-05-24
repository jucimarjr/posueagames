var warningState = {

	preload : function() {
		game.load.image('warning', 'assets/warning.png');
	},

	create : function() {
		var warning = game.add.sprite(0, 0, 'warning');

		warning.alpha = 0;

		t1 = this.game.add.tween(warning);
		t1.to({
			alpha : 1
		}, 2000, Phaser.Easing.Linear.None, true);
		t1.onComplete.add(secondTween, warning, this);

	},

};

function secondTween(warning) {
	t2 = this.game.add.tween(warning);
	t2.to({
		alpha : 0
	}, 2000, Phaser.Easing.Linear.None, true, 5000, 0);
	t2.onComplete.add(onComplete, this)
}

function onComplete() {
	game.state.start('load');
}