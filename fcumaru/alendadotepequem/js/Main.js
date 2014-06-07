/*global Config, State, Phaser*/

var game = new Phaser.Game(Config.global.screen.width,
		Config.global.screen.height, Phaser.Auto, 'game');
game.state.add('LudusSplash', State.LudusSplash);
game.state.add('SponsorSplash', State.SponsorSplash);
game.state.add('GameSplash', State.GameSplash);
game.state.add('Menu', State.Menu);
game.state.add('HowToPlay', State.HowToPlay);
game.state.add('Game', State.Game);
game.state.add('Credits', State.Credits);
game.state.add('GameOver', State.GameOver);
game.state.add('YouWin', State.YouWin);
//game.state.start('LudusSplash');
 game.state.start('Game');
