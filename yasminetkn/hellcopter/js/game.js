var game = new Phaser.Game(960, 600, Phaser.AUTO, 'hellcopter');

game.state.add('preload', preloader);
game.state.add('menu', gameMenuHell);
game.state.add('fase', primeiraFaseHell);

game.state.start('preload');
console.log('Game start');