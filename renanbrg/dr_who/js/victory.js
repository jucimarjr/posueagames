var victory_state = { create: create, update: update};

function create () {
    fimSprite = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'victoryImage');
    //Playing sounds
    soundMus.stop();

    var style = { font: "40px Doctor-Who", fill: "#ffffff" };
    labelScore1 = game.add.text((game.world.width / 2) - 130, game.world.height * 0.6, "Score: " +
            score + " (times " + lifeCounter + " up)", style);
    var styleScore = { font: "50px Doctor-Who", fill: "#ffffff" };
    labelScore1 = game.add.text((game.world.width - 100) / 2, game.world.height * 0.7, "Score: " +
            score * lifeCounter, styleScore);
}

function update () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
        game.state.start('Game');
    }

}