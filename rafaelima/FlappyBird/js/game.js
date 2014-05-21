var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game_div');

//variavel global
var score = 0;

// Define all the states
game.state.add('load', load_state);  
game.state.add('menu', menu_state);  
game.state.add('play', play_state);  

// Start with the 'load' state
game.state.start('load');

//var main_state = { preload: preload, create: create, update: update };
//game.state.add('main', main_state);
//game.state.start('main');