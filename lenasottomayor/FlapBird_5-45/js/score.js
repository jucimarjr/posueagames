var gameScore = { create: create, update:update };

function create() {
	musicGame.stop();
    scoreScren = game.add.sprite(0, 0, 'scorescreen');
    if (score<10){
    	text = game.add.bitmapText(545, 250, 'font', '0'+score, 90);  
    } else {
    	text = game.add.bitmapText(545, 250, 'font', ''+score, 90);
    }
    musicGameOver = game.add.audio('music');
    musicGameOver.play('',0,0.05,true);
}
    
function update(){
	var keySpacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	keySpacebar.onDown.add(restart, this);
}
function restart() {
	musicGameOver.stop();
	game.state.start('playGame');
}