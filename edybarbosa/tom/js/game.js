var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');

game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Tutorial', Game.Tutorial);
game.state.add('Play', Game.Play);
game.state.add('Gameover', Game.Gameover);
game.state.start('Boot');