var game = null;

var KEY_LEFT = 37;
var KEY_RIGHT = 39;

function init() {
    game = new Game('canvas', 600, 480);

    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('keydown', keyDown, false);

    ImageLoader.load({
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
