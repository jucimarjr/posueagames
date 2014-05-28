var animacao_state = { create: create, update: update};

function create () {
	tardisSound = game.add.audio("tardisSound");
	timer = 0;
	total=0;
	timer = game.time.now + 100;
	
	animSprite = game.add.sprite(0, 0, 'telaInicial');
	animSprite.animations.add('init',[0,1,2,3,4],1,true);
	animSprite.animations.play('init');
	
	
    //Playing sounds
	soundIn.stop();
    tardisSound.play();
    
    
}

function update () {
	total++;
	if (total > 500 && game.time.now > timer)
	{
		game.state.start('Game');
	}
}

