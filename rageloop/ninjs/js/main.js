(function (app_container) {

	var init = function() {

		// Initialize Phaser, and creates a game
		app_container.game = new Phaser.Game(960, 600, Phaser.AUTO, 'game_container');

		// add phaser states
		app_container.game.state.add('LudusSplash', app_container.LudusSplash);
		app_container.game.state.add('Preload', app_container.Preload);
		app_container.game.state.add('Menu', app_container.Menu);
		app_container.game.state.add('Gameplay', app_container.Gameplay);
		app_container.game.state.add('Gameover', app_container.Gameover);

		app_container.game.state.add('Credits', app_container.Credits);
		app_container.game.state.add('Howto', app_container.HowToPlay);
		app_container.game.state.add('StoryPresentation', app_container.StoryPresentation);

		//levels
		app_container.game.state.add('Level1', app_container.Level1);
		app_container.game.state.add('Level2', app_container.Level2);

		// start preload
		app_container.game.state.start('LudusSplash');
	};

	window.onload = function() {
		init();
	};

}(window.app_container = window.app_container || {}));