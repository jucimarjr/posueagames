var game = new Phaser.Game(960, 600, Phaser.AUTO, 'phaser-game');

var GAME_CREDITS= 'credits';
var LOAD_GAME = 'loadGame';
var MENU = 'menu';
var GAME_PLAY = 'playGame';
var GAME_SCORE = 'gameScore';

//var mainMenu;
//var credit;



game.state.add(GAME_CREDITS, credits);  
game.state.add(LOAD_GAME, loadGame);  
game.state.add(MENU, menu);  
game.state.add(GAME_PLAY, playGame);  
game.state.add(GAME_SCORE, gameScore);


game.state.start(LOAD_GAME);