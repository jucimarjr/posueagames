var SuperMouse  = {};
var gameoverSnd;
var musicTheme;
var score = 0;

SuperMouse.Load = function(game) {	

	this.ready = false;
}; 

SuperMouse.Load.prototype.preload = function() {
	
	this.load.image('universe', 'assets/universe_900-600.png');
    this.load.image('asteroid', 'assets/asteroid_80-80.png');
    this.load.image('cheese', 'assets/cheese_60-60.png');
    this.load.image('rat', 'assets/rat_40-40.png');
    this.load.image('supermouse', 'assets/supermouse_360-448.png');
    this.load.image('supermouse2', 'assets/supermouse2_245-269.png');
    this.load.image('logo', 'assets/logo_480-246.png');
    this.load.image('bt_play', 'assets/bt_play_232-57.png');
    this.load.image('bt_credits', 'assets/bt_credits_232-57.png');
    this.load.image('bt_back', 'assets/bt_back_232-57.png');
    this.load.image('bt_share', 'assets/bt_share_191x53.png');
    this.load.image('bt_try_again', 'assets/bt_try_again_361x52.png');
    this.load.image('gameover', 'assets/gameover_740-401.png');
    this.load.spritesheet('player', 'assets/player_120-50.png', 120, 50);
    this.load.spritesheet('star', 'assets/star_4-4.png', 4, 4);
    this.load.spritesheet('health', 'assets/health_396-54.png', 396, 54);

    this.load.audio('fly_sound', 'assets/fly_sound.mp3');
    this.load.audio('ambience', 'assets/ambience.wav');
    this.load.audio('music_theme', 'assets/music_theme.mp3'); 
    this.load.audio('alert', 'assets/alert.wav'); 
    this.load.audio('break_bone', 'assets/break_bone.wav'); 
    this.load.audio('game_over', 'assets/game_over.wav'); 
    this.load.audio('rat', 'assets/mouse.wav'); 
    this.load.audio('eat', 'assets/eat.mp3');

    this.ready = true;
};

SuperMouse.Load.prototype.create = function() {
	
};

SuperMouse.Load.prototype.update = function() {
	if (this.ready) {
		this.state.start('Menu');
	}
};