var game = new Phaser.Game(960, 600, Phaser.AUTO, 'phaser-game');

var GAME_CREDITS= 'credits';
var LOAD_GAME = 'loadGame';
var MENU = 'menu';
var GAME_PLAY = 'playGame';
var GAME_SCORE = 'gameScore';

var background;


  
game.state.add('loadGame', loadGame);
game.state.add('menu', mainMenu);
game.state.add('credits', cred);
game.state.add('playGame', playGame);
game.state.add('gameScore', gameScore);


game.state.start('loadGame');