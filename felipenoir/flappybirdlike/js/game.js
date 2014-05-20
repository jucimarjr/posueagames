var game = new Phaser.Game(960, 600, Phaser.AUTO, '');

var player = null;
var level = null;

game.state.add('warning', warningState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('warning');
//game.state.start('load');