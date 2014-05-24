var game = new Phaser.Game(900, 600, Phaser.AUTO, 'game_div');

game.state.add('menu', GameMenu);
game.state.add('fase', primeiraFase);
game.state.add('gameOver', gameOver);
game.state.add('gameWin', gameWin);
game.state.add('credits', credito);

// Start with the 'load' state
game.state.start('menu');
console.log('Game start');