var menu_state = { preload: preload, create: create};

function preload() {
	 game.load.image('splash_screen', 'assets/splash_screen.png');
	 game.load.image('button_play', 'assets/menu_play.png');
	 game.load.image('button_credits', 'assets/menu_credits.png');
}

//Tela de Menu
function create() {
	game.add.sprite(0, 0, 'splash_screen');
	game.add.button(285, 495, 'button_play', startGame, this);
	game.add.button(555, 495, 'button_credits', credits, this);
}

// Começa o jogo
function startGame() {
	game.state.start('load');
}
function credits() {
	game.state.start('credits');
}
	
//	function soung() {
//		if(sound_flag){
//			sound_flag = false;
////			text_sound.text ="[2] NO SOUND";
//			img_sound.exists = false;
//			img_nosound.exists = true;
//		}else {
//			sound_flag = true;
////			text_sound.text = "[2] SOUND";
//			img_sound.exists = true;
//			img_nosound.exists = false;
//		}
//	}
