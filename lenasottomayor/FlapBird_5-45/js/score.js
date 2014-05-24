var gameScore = { create: create, update:update };

function create() {
	musicMenu.stop();
    scoreScren = game.add.sprite(0, 0, 'scorescreen');   
    text = game.add.bitmapText(545, 345, 'font', '00', 90);  
    
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