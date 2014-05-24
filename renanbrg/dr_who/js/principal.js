var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');

var inicioSprite;
var soundIn;
var soundMus;
var background;
var tardisSprite;
var meteors;
var timer;
var meteorCounter;
var score;
var labelScore;


game.state.add('Inicial', inicial_state);
game.state.add('Preload', preload_state);
game.state.add('Game', game_state);
game.state.add('GameOver', gameOver_state);
game.state.start('Preload');