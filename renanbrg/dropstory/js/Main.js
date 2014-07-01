var game = new Phaser.Game(Config.global.screen.width,
		Config.global.screen.height, Phaser.Auto, 'game');

game.state.add('ludus-state', State.LudusSplash);
game.state.add('sponsor-state', State.SponsorSplash);
game.state.add('pause-state', State.Pause);
game.state.add('level1preloader-state', State.Level1Preloader);
game.state.add('level1-state', State.Level1);
game.state.add('menu-state', State.Menu);
game.state.add('howtoplay-state', State.HowToPlay);
game.state.add('credits-state', State.Credits);
game.state.add('boot-state', State.Boot);
game.state.add('gameOver-state', State.GameOver);

game.state.start('ludus-state');
