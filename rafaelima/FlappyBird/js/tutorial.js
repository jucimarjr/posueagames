var tutorial_state = { create: create, update:update, start: start };

    function create() {
    	
    	if (music != null) {
    		music.pause();
    	}
    	
    	if (musicGame != null) {
			musicGame.pause();
		}
    	var bg1 = game.add.sprite(0, 0, 'background1');
    	var bg2 = game.add.sprite(0, 0, 'background2');
    	var bg3 = game.add.sprite(0, 0, 'background3');
    	var bg4 = game.add.sprite(0, 0, 'background4');
    	var bg5 = game.add.sprite(0, 0, 'background5');
    	playerSprite = game.add.sprite(172, 281.5, 'player');
    	var style = { font: '30px "edosz"', fill: "#D56469" };
    	this.label_score = this.game.add.text(20, 50, "0 m", style);
    	
    	var bg6 = game.add.sprite(0, 0, 'tutorial');
    }
    
    function update(){
    	var spacebar_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar_key.onDown.add(this.start, this);
        
        if (game.input.mousePointer.isDown){
        	this.start();
        }
    }
    function start() {
    	game.state.start('play');
    }