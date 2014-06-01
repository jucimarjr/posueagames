var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game_div');


// Define all the states
game.state.add('menu', menu_state);  
game.state.add('load', load_state);  
game.state.add('play', play_state);  
//game.state.add('tutorial', tutorial_state);  
//game.state.add('credits', credits_state);  
//game.state.add('score', score_state);  

// Start with the 'load' state
game.state.start('load');
