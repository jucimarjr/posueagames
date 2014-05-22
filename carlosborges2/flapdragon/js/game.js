var game = new Phaser.Game(960, 600, Phaser.AUTO, '');

var player = null;
var level = null;
var enemies = null;

game.state.add(STATE_WARNING, warningState);
game.state.add(STATE_LOAD, loadState);
game.state.add(STATE_MENU, menuState);
game.state.add(STATE_PLAY, playState);

// game.state.start('warning');
game.state.start(STATE_LOAD);
