/*global Phaser*/

//Global
var Config = {
    global: {
        animationVelocity: 6,
        screen: {
            width: 960,
            height: 600
        },
        key: {
            nextScreen: Phaser.Keyboard.ENTER
        }
    }
};

//LudusSplash
Config.ludusSplash = {
    dir: 'assets/images/ludussplash_960-600.png',
    x: 0,
    y: 0,
    millis: 2000,
    nextState: 4000
};

//SponsorSplash
Config.sponsorSplash = {
	dir: 'assets/images/sponsorsplash_960-600.png',
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//GameSplash
Config.gameSplash = {
	dir: {
		background: 'assets/images/gamesplash_960-600.png',
		bar: 'assets/images/progress-bar_720-40.png'
	},
	progressBar: {
		x: 0,
		y: 500
	},
	x: 0,
	y: 0,
	millis: 2000,
	nextState: 4000
};

//Menu
Config.Menu = {
	dir: 'assets/images/gamesplash_960-600.png',
	x: 0,
	y: 0,
	buttonPlay: {
		dir: 'assets/images/playbutton_100-100.png',
		x: 215,
		y: (Config.global.screen.height - 50) / 2,
		width: 100,
		height: 100,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonHowToPlay: {
		dir: 'assets/images/howtobutton_100-100.png',
		x: 85,
		y: (Config.global.screen.height - 50) / 2,
		width: 100,
		height: 100,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	buttonCredits: {
		dir: 'assets/images/creditsbutton_100-100.png',
		x: 350,
		y: (Config.global.screen.height - 50) / 2,
		width: 100,
		height: 100,
		anchor: {
			x: 0.5,
			y: 0.5
		}
	},
	textStyle: {
		font: '25px Ms Sans Serif',
		fill: '#ffffff'
	}
};

//HowToPlay
Config.howToPlay = {
	dir: 'assets/images/howtoplay_960-600.png',
	x: 0,
	y: 0
};

//Credits
Config.credits = {
	dir: 'assets/images/credits_960-600.png',
	x: 0,
	y: 0
};

//GameOver
Config.gameOver = {
	dir: 'assets/images/telaFinal_960-600.png',
	x: 0,
	y: 0
};
/*Config.gamePlay = {
	dir: 'assets/images/GamePlayBg_600-960.png',
	x: 0,
	y: 0,
};*/
