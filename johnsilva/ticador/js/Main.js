/*global Config, State, Phaser*/

var game = new Phaser.Game(Config.global.screen.width, Config.global.screen.height, Phaser.CANVAS, 'game_div');
game.state.add('LudusSplash', State.LudusSplash);
game.state.add('SponsorSplash', State.SponsorSplash);
game.state.add('GameSplash', State.GameSplash);
game.state.add('Menu', State.Menu);
game.state.add('HowToPlay', State.HowToPlay);
game.state.add('Credits', State.Credits);
game.state.add('GamePlay', State.GamePlay);
game.state.add('End', State.End);
game.state.start('LudusSplash');