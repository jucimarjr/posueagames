/*global Config, State, Phaser*/

var game = new Phaser.Game(Config.global.screen.width, Config.global.screen.height, Phaser.Auto, 'game');
this.game.state.add('LudusSplash', State.LudusSplash);
this.game.state.add('SponsorSplash', State.SponsorSplash);
this.game.state.add('GameSplash', State.GameSplash);
this.game.state.add('Menu', State.Menu);
this.game.state.add('Story', State.Story);
this.game.state.add('HowToPlay', State.HowToPlay);
this.game.state.add('Credits', State.Credits);
this.game.state.add('Game', State.Game);
this.game.state.add('GameOver', State.GameOver);
this.game.state.add('Victory', State.Victory);
this.game.state.start('LudusSplash');
