var credits_state = { create: create, update: update };
	
	//Sem function preload() pq já existe no load.js
    function create() {
    	var background = game.add.sprite(0, 0, 'background');
    	
    	var style = { font: "20px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height/2 -100;
        
		var text = game.add.text(x, y, "Developed by", style);
        text.anchor.setTo(0.5, 0.5); 
        
        y+=20;
        var text = game.add.text(x, y, "Juliana Figueira", style);
        
        y+=20;
        var text = game.add.text(x-70, y, "Yumi Ouchi", style);
        
        y+=20;
        var text = game.add.text(x-70, y, "Rafael Lima", style);
        
        y+=20;
        var text = game.add.text(x-70, y, "Vivian Lô", style);
    }

    function update() {
    	var backspace_key = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    	backspace_key.onDown.add(menu, this);
    }
    
    function menu() {
		game.state.start('menu');
	}
