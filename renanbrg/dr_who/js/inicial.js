

var inicial_state = { create: create, update: update, mouseClick: mouseClick};

function create () {
	
	inicioSprite = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'telaInicio');
	
	//Add sounds
	soundIn = game.add.audio("inicio");

    this.playbutton = this.game.add.button(this.game.world.centerX + 50, this.game.world.centerY + 50, 'playbtn', this.mouseClick, this, 1, 0, 1);
    this.playbutton.anchor.set(0.5, 0.5);
    
    //Playing sounds
    soundIn.play();
    soundIn.loop = true; 
    
}

function update () {
	if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
        this.mouseClick();
    }	  
}

function mouseClick() {
	game.state.start('Game');
}





