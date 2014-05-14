var game = null;

var KEY_LEFT = 37;
var KEY_RIGHT = 39;

var SCREEN_WIDTH = 600;
var SCREEN_HEIGHT = 480;

function init() {
    game = new Game('canvas', SCREEN_WIDTH, SCREEN_HEIGHT);

    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('keydown', keyDown, false);

    ImageLoader.load({
        'ball': 'assets/ball.png',
        'player': 'assets/player_tron.png',
        'brick': 'assets/bricks_tron60x20.png'
    }, function(){

        game.init();
        game.start();

    });
}

//===============================================================
// Key Handler
//===============================================================

function keyDown(e) {
    switch (e.keyCode) {
        case KEY_RIGHT:
            game.keys.right = true;
            break;
        case KEY_LEFT:
            game.keys.left = true;
            break;
    }
}

function keyUp(e) {
    switch (e.keyCode) {
        case KEY_RIGHT:
            game.keys.right = false;
            break;
        case KEY_LEFT:
            game.keys.left = false;
            break;
    }
}
