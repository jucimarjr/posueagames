(function (app_container) {

	var init = function() {

		// Initialize Phaser, and creates a game
		app_container.game = new Phaser.Game(960, 600, Phaser.AUTO, 'game_container');
		
		// add phaser states
		app_container.game.state.add('Preload', app_container.Preload);
		app_container.game.state.add('Menu', app_container.Menu);
		app_container.game.state.add('Gameplay', app_container.Gameplay);
		app_container.game.state.add('Gameover', app_container.Gameover);

		// start preload
		app_container.game.state.start('Preload');
	};

	window.onload = function() {
		init();
	};

}(window.app_container = window.app_container || {}));