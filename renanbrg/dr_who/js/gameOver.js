/**
 *
 */
var gameOver_state = { create: create, update: update};

function create () {
	fimSprite = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'telaFim');
    //Playing sounds
    soundMus.stop();
    
    
    var style = { font: "44px Doctor-Who", fill: "#ffffff" };
    labelScore1 = game.add.text((game.world.width - 100) / 2, game.world.height/2, "Score: " + score, style);
}

function update () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
        game.state.start('Game');
    }
    
}