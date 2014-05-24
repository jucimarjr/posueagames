var menu_state = { preload: preload, create: create, update: update};

function preload() {
	game.load.image('splash_screen', 'assets/splash_screen.png');
	game.load.image('button_play', 'assets/menu_play.png');
	game.load.image('button_credits', 'assets/menu_credits.png');
	game.load.image('cloud_selector', 'assets/splash_selector.png');
}

//Tela de Menu
function create() {
	game.add.sprite(0, 0, 'splash_screen');
	this.buttonPlay = game.add.button(285, 495, 'button_play', startGame, this);
	this.buttonCredits = game.add.button(555, 495, 'button_credits', credits, this);
	this.cloud = game.add.sprite(161, 502, 'cloud_selector');
	this.isPlay = true;
	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);

}

//Começa o jogo
function startGame() {
	game.state.start('load');
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

//function soung() {
//if(sound_flag){
//sound_flag = false;
////text_sound.text ="[2] NO SOUND";
//img_sound.exists = false;
//img_nosound.exists = true;
//}else {
//sound_flag = true;
////text_sound.text = "[2] SOUND";
//img_sound.exists = true;
//img_nosound.exists = false;
//}
//}
