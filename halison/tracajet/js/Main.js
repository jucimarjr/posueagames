
var game = new Phaser.Game(Config.global.screen.width, Config.global.screen.height, Phaser.Auto, 'id-phaser-game',null,true); // last is transparent

game.state.add('LudusSplash', State.LudusSplash);
game.state.add('GameSplash', State.GameSplash);
game.state.add('Menu', State.Menu);
game.state.add('HowToPlay', State.HowToPlay);
game.state.add('Credits', State.Credits);
game.state.add('Fase1', State.Fase1);
game.state.add('Fase2', State.Fase2);
game.state.add('Fase3', State.Fase3);

game.state.start('LudusSplash');
//game.state.start('Fase2');
