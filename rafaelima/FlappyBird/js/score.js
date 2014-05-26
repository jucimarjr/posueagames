var score_state = { create: create, update:update, start: start };

    function create() {
    	musicGame.pause();
    	var bg1 = game.add.sprite(0, 0, 'background1');
    	var bg2 = game.add.sprite(0, 0, 'background2');
    	var bg3 = game.add.sprite(0, 0, 'background3');
    	var bg4 = game.add.sprite(0, 0, 'background4');
    	var bg5 = game.add.sprite(0, 0, 'background5');
    	var bg6 = game.add.sprite(0, 0, 'scorebg');
    	
    	
    	var style = { font: '80pt "edosz"', fill: "#E95618" };
        var x = 481, y = 316;
        var number = score.toFixed(0);
        if (number < 10){
        	var text = game.add.text(x, y, "0" + number, style);
        } else {
        	var text = game.add.text(x, y, number, style);
        }
        text.anchor.setTo(0.5, 0.5); 
    }
    
    function update(){
    	var spacebar_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar_key.onDown.add(this.start, this);
    }
    function start() {
    	game.state.start('tutorial');
    }