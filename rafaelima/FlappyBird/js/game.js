var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game_div');

//variavel global
var score = 0;
var label_score;
var stop_score;
var music;
var musicGame;
var explosionSprite;

var playerSprite, deathSprite, bossSprite;
var playersGroup; //for multiply Power up
var plataformas;
var porwerUps;
var space_key;
var sound_flag = true;
var jump_sound;
var countHeadButts = 0;
var bossDirection;

//text
var text_sound;

//parallax
var background2;
var background3;
var background4;
var bossBackground;
var speed;

//obstacle
var timer;
var deathSprite;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle;
var playerCollisionGroup;
var obstacleCollisionGroup;

//power up
var cursors;
var timerPowerUp;
var timeoutPowerUp = 11000;
var timeoutNormalSize = 10000;
var powerUp1;
var powerUp2;
var powerUp3;
var powerUp4;

//menu
var buttonPlay;
var buttonCredits;
var cloud;
var isPlay;

var img_sound;

// Define all the states
game.state.add('credits', credits_state);  
game.state.add('load', load_state);  
game.state.add('menu', menu_state);  
game.state.add('tutorial', tutorial_state);  
game.state.add('play', play_state);  
game.state.add('score', score_state);  

// Start with the 'load' state
game.state.start('menu');