var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');

var enterClick;
var backKey;
var inicioSprite;
var creditsSprite;
var soundIn;
var soundMus;
var tardisSound;
var background;
var tardisSprite;
var animSprite;
var meteors;
var timer;
var meteorCounter;
var score;
var labelScore;
var lifeCounter;


game.state.add('Inicial', inicial_state);
game.state.add('Preload', preload_state);
game.state.add('Game', game_state);
game.state.add('GameOver', gameOver_state);
game.state.add('Animacao', animacao_state);
game.state.add('Creditos', creditos_state);
game.state.start('Preload');