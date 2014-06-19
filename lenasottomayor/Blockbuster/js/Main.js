/*global Config, State, Phaser*/

var game = new Phaser.Game(Config.global.screen.width, Config.global.screen.height, Phaser.Auto, 'game');
game.state.add('LudusSplash', State.LudusSplash);
game.state.add('SponsorSplash', State.SponsorSplash);
game.state.add('GameSplash', State.GameSplash);
game.state.add('Menu', State.Menu);
game.state.add('GamePlay', State.GamePlay);
game.state.add('HowToPlay', State.HowToPlay);
game.state.add('Credits', State.Credits);
game.state.add('Story', State.Story);
game.state.add('GameOver', State.GameOver);
game.state.add('GameWin', State.Gamewin);
game.state.start('LudusSplash');