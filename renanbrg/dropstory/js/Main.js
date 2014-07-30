var game = new Phaser.Game(Config.global.screen.width,
		Config.global.screen.height, Phaser.CANVAS, 'game');

var hud = new HUD(game);

game.state.add('ludus-state', State.LudusSplash);
game.state.add('story-state', State.Story);
game.state.add('ending-state', State.Ending);
game.state.add('gameover-state', State.GameOver);
game.state.add('level1preloader-state', State.Level1Preloader);
game.state.add('level1-state', State.Level1);
game.state.add('level2preloader-state', State.Level2Preloader);
game.state.add('level2-state', State.Level2);
game.state.add('menu-state', State.Menu);
game.state.add('howtoplay-state', State.HowToPlay);
game.state.add('credits-state', State.Credits);
game.state.add('boot-state', State.Boot);

game.state.start('boot-state');
