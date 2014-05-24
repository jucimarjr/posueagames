var game = new Phaser.Game(960, 600, Phaser.AUTO, '');

var player = null;
var level = null;
var enemies = null;
var coins = null;
var score = null;

var TRIANGLE_ENEMY = 0;
var SNAKE_ENEMY = 1;
var STAIRS_ENEMY = 2;
var SIMPLE_ENEMY = 3;

function geraEnemyFloor() {
	return (game.world.height - 90) - 134;
}

function geraEnemyMiddle() {
	return (game.world.height - 90) - 2 * 134;
}

function geraEnemyTop() {
	return (game.world.height - 90) - 3 * 134;
}

function selecionaEnemy() {
	var ran = Math.round(Math.random() * 3);

	if (ran == 0) {
		return geraEnemyFloor();
	} else if (ran == 1) {
		return geraEnemyMiddle();
	} else if (ran == 2) {
		return geraEnemyTop();
	}
}

game.state.add('warning', warningState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('gameover', gameoverState);

game.state.start('warning');
//game.state.start('load');
