var game = new Phaser.Game(960, 600, Phaser.AUTO, 'phaser-game');

game.state.add('loadGame', loadGame);
game.state.add('menu', mainMenu);
game.state.add('gameInstructions', gameInstructions);
game.state.add('credits', creditsGame);
game.state.add('playGame', playGame);
game.state.add('gameScore', gameScore);


game.state.start('loadGame');