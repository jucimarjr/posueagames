var score_state = { create: create, update:update };

    function create() {
    	var style = { font: "20px Arial", fill: "#fff" };
        var x = game.world.width/2, y = game.world.height/2;
        
		var text = game.add.text(x, y, "SCORE: "+ score.toFixed(0) +"m", style);
        text.anchor.setTo(0.5, 0.5); 
        
        var x = game.world.width/2, y = game.world.height/2 -100;
        var text = game.add.text(x, y, "Press [space] to start", style);
        text.anchor.setTo(0.5, 0.5); 
    	
    }
    
    function update(){
    	var spacebar_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar_key.onDown.add(start, this);
    }
    function start() {
    	game.state.start('play');
    }