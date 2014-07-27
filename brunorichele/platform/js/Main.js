/*global Config, State, Phaser*/

var game = new Phaser.Game(Config.screen.width, Config.screen.height, Phaser.Auto, 'game');
game.state.add('LudusSplash', State.LudusSplash);
game.state.add('SponsorSplash', State.SponsorSplash);
game.state.add('GameSplash', State.GameSplash);
game.state.add('Menu', State.Menu);
game.state.add('HowToPlay', State.HowToPlay);
game.state.add('Credits', State.Credits);
game.state.add('GameOver', State.GameOver);
game.state.add('GameFinal', State.GameFinal);
game.state.add('GameIntro1', State.GameIntro1);
game.state.add('GameIntro2', State.GameIntro2);
game.state.add('Game', /*State.Phase1*/State.Phase1_test);
game.state.start('LudusSplash');