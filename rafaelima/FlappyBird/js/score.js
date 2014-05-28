var score_state = { create: create, update:update, start: start };

function create() {

	var style = { font: '80pt "edosz"', fill: "#E95618" };

	var bg1 = game.add.sprite(0, 0, 'background1');
	var bg2 = game.add.sprite(0, 0, 'background2');
	var bg3 = game.add.sprite(0, 0, 'background3');
	var bg4 = game.add.sprite(0, 0, 'background4');
	var bg5 = game.add.sprite(0, 0, 'background5');
	var bg6 = game.add.sprite(0, 0, 'scorebg');

	x = 481, y = 307;
	var number = score.toFixed(0)*1000;
	var text;
	if (number < 10){
		text = game.add.text(x, y, "0" + number, style);
	} else {
		text = game.add.text(x, y, number, style);
	}
	text.anchor.setTo(0.5, 0.5);

	addHighscore(number);
}

function update(){
	var spacebar_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spacebar_key.onDown.add(this.start, this);
	if (game.input.mousePointer.isDown){
		this.start();
	}
}
function start() {
	game.state.start('tutorial');
}

function addHighscore(number){
	
	styleRecord = { font: '30px "edosz"', fill: "#FFFFFF" };

	highscore = localStorage.getItem("highscore");

	if (number > highscore) {
		highscore = number;
		localStorage.setItem("highscore", number);
		if (highscore < 10){
			textHighscore = "0" + highscore;
		} else {
			textHighscore = highscore;
		}

		game.add.text(20, 50, 'Novo Record: ' + textHighscore + ' M', styleRecord);
	}
	else {
		if (highscore < 10){
			textHighscore = "0" + highscore;
		} else {
			textHighscore = highscore;
		}

		game.add.text(20, 50, 'Record: ' + textHighscore + ' M', styleRecord);
	}
}