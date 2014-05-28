var menu_state = { create: create, update: update};

//Tela de Menu
function create() {
	if(music == null){
		music = game.add.audio('menuMusic',1,true);
		music.play('',0,1,true);
	}
	
	game.add.sprite(0, 0, 'splash_screen');
	this.buttonPlay = game.add.button(285, 495, 'button_play', startGame, this);
	this.buttonCredits = game.add.button(555, 495, 'button_credits', credits, this);
	this.cloud = game.add.sprite(161, 502, 'cloud_selector');
	game.add.sprite(417, 562, 'splash_screen_space');
	this.isPlay = true;
	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
	
}

//Come�a o jogo
function startGame() {
	music.pause();
	game.state.start('tutorial');
}
function credits() {
	game.state.start('credits');
}

function update(){
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		this.cloud.x = 161;
		this.isPlay = true;
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.cloud.x = 451;
		this.isPlay = false;
	}

	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		if(this.isPlay){
			startGame();
		}else{
			credits();
		}
	}
}
