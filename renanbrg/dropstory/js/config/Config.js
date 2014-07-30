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
        dir: 'assets/spritesheets/playbutton_240-120.png',
        x: 175,
        y: (Config.global.screen.height - 50) / 2,
        width: 120,
        height: 120,
        anchor: {
            x: 0.5,
            y: 0.5
        }
    },
    buttonHowToPlay: {
        dir: 'assets/spritesheets/howtoplaybutton_200-100.png',
        x: 60,
        y: Config.global.screen.height * 0.6,
        width: 100,
        height: 100,
        anchor: {
            x: 0.5,
            y: 0.5
        }
    },
    buttonCredits: {
        dir: 'assets/spritesheets/creditsbutton_200-100.png',
        x: 310,
        y: Config.global.screen.height * 0.6,
        width: 100,
        height: 100,
        anchor: {
            x: 0.5,
            y: 0.5
        }
    },
    buttonBack: {
        dir: 'assets/spritesheets/backbutton_240-120.png',
        x: 820,
        y: 460,
        width: 120,
        height: 120,
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
    dir: 'assets/images/gameoverbg_960-600.png',
    x: 0,
    y: 0
};

//Preloader image of the Level 1
Config.pause = {
    dir: 'assets/images/pausesplash_298-200.png',
    x: (Config.global.screen.width / 2) - 160,
    y: (Config.global.screen.height / 2) - 160
};

//Preloader image of the Level 1
Config.preloaderLevel1 = {
    dir: 'assets/images/level1preloaderbg_960-600.png',
    x: 0,
    y: 0
};
Config.preloaderLevel2 = {
    dir: 'assets/images/level2preloaderbg_960-600.png',
    x: 0,
    y: 0
};
Config.ending = {
    dir: 'assets/images/thanks_960-600.png',
    x: 0,
    y: 0
};
