
var game = new Phaser.Game(Config.global.screen.width, Config.global.screen.height, Phaser.Auto, 'ph-game');

game.state.add('LudusSplash', State.LudusSplash);
game.state.add('GameSplash', State.GameSplash);
game.state.add('Menu', State.Menu);
game.state.add('HowToPlay', State.HowToPlay);
game.state.add('Credits', State.Credits);
game.state.start('LudusSplash');