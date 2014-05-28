

var inicial_state = { create: create, update: update, mouseClick: mouseClick};

function create () {

	inicioSprite = game.add.sprite(0, 0, 'telaInicial1');
	inicioSprite.animations.add('run',[0,1,2],6,true);

	//Add sounds
	soundIn = game.add.audio("inicio");

    this.playbutton = this.game.add.button(this.game.world.centerX+8, this.game.world.centerY+168, 'startButton', this.mouseClick, this, 1, 0, 1);
    this.playbutton.anchor.set(0.5, 0.5);

    //Playing sounds
    soundIn.play();
    soundIn.loop = true;
}

function update () {
	inicioSprite.animations.play('run');
	if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
        this.mouseClick();
    }
	if (game.input.keyboard.isDown(Phaser.Keyboard.C)) {
		game.state.start('Creditos');
		}
}

function mouseClick() {
	game.state.start('Animacao');
}





