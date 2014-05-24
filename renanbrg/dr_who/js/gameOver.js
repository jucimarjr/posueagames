/**
 *
 */
var gameOver_state = { create: create, update: update};

function create () {
	fimSprite = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'telaFim');
    //Playing sounds
    soundMus.stop();
}

function update () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
        game.state.start('Game');
    }
}