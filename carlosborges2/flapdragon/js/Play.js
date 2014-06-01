//Play.js

var GAME_INIT_STATE = 0;
var GAME_PLAY_STATE = 1;
var GAME_OVER_STATE = 2;
var GAME_PAUSE_STATE = 3;

var GAME_OVER_TRANSITION_STATE = 10;

var gamePlayState = GAME_INIT_STATE;

var playState = function(game) {
	
	var score;
	
	this.create = function() {
		console.log('playState-create');
		
//		this.game.physics.startSystem(Phaser.Physics.P2JS);
		
		score = 0;
		
		level.create();
		player.create();
		enemies.create();
		
	};
	
	this.update = function() {
		
		
		switch(gamePlayState) {
		case GAME_INIT_STATE:
			this.updateInitState();
			break;
			
		case GAME_PLAY_STATE:
			player.updatePlayStation();
			
			score += enemies.updatePlayState();
			
			level.updatePlayStation(score);
			
//			this.updatePlayStation();
			break;
			
		case GAME_OVER_TRANSITION_STATE:
			
			gamePlayState = GAME_OVER_STATE;
			
			level.stopLevel();
			enemies.stopEnemies();
			level.showGameOver(score);
			
			break;
			
		case GAME_OVER_STATE:
			player.updateGameOverState();
			
			this.updateGameOverState();
			break;
			
		case GAME_PAUSE_STATE:
//			this.updatePauseState();
			break;
		}
		
	};
	
	this.updateGameOverState = function() {
		
		if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			gamePlayState = GAME_INIT_STATE;
			game.state.start(STATE_PLAY);
		}
		
	};
	
//	this.updatePlayStation = function() {
//		
//		this.hud.text = 'score: '+score;
//	};
	
	this.updateInitState = function () {
		
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			
			gamePlayState = GAME_PLAY_STATE;
			
			player.initGravity();
			enemies.initEnemies();
			level.initLevel();
		}
		
		
		
	};
	
};

