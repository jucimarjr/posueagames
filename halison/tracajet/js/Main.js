
var game = new Phaser.Game(Config.global.screen.width, Config.global.screen.height, Phaser.Auto, 'id-phaser-game',null,true); // last is transparent

game.state.add('LudusSplash', State.LudusSplash);
game.state.add('GameSplash', State.GameSplash);
game.state.add('Menu', State.Menu);
game.state.add('Fase1', State.Fase1);

game.state.start('LudusSplash');
