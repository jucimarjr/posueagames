var gameScore = { create: create, update:update };

function create() {
	musicGame.stop();
    scoreScren = game.add.sprite(0, 0, 'scorescreen');
    if (score<10){
    	text1 = game.add.bitmapText(525, 250, 'font', '00'+score, 90);  
    } else if (score<100){
		text1 = game.add.bitmapText(525, 250, 'font', '0'+score, 90);  
	} else {
    	text1 = game.add.bitmapText(525, 250, 'font', ''+score, 90);
    }
	
	if (score > localStorage.getItem("highScore")) {
        localStorage.setItem("highScore", score);
		if (score<10){
			text2 = game.add.bitmapText(427, 130, 'font', 'new record 00' + localStorage.getItem("highScore"), 42);
		} else if (score<100){
			text2 = game.add.bitmapText(427, 130, 'font', 'new record 0' + localStorage.getItem("highScore"), 42);
		} else {
			text2 = game.add.bitmapText(427, 130, 'font', 'new record ' + localStorage.getItem("highScore"), 42);
		}
    } else {
		if (localStorage.getItem("highScore")<10){
			text2 = game.add.bitmapText(475, 130, 'font', 'record 00' + localStorage.getItem("highScore"), 42);
		} else if (localStorage.getItem("highScore")<100){
			text2 = game.add.bitmapText(475, 130, 'font', 'record 0' + localStorage.getItem("highScore"), 42);
		} else {
			text2 = game.add.bitmapText(475, 130, 'font', 'record ' + localStorage.getItem("highScore"), 42);
		}
    }
	
    musicGameOver = game.add.audio('music');
    musicGameOver.play('',0,0.05,true);
}
    
function update(){
	var keyENTER = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	keyENTER.onDown.add(restart, this);
	
	var mouseClick = game.input.activePointer.isDown;
	
	if(mouseClick){
		restart();
	}
}
function restart() {
	musicGameOver.stop();
	game.state.start('playGame');
}