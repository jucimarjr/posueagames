var credits_state = { create: create, update: update };
	
	//Sem function preload() pq já existe no load.js
    function create() {
    	var background = game.add.sprite(0, 0, 'background');
    	
    	var style = { font: "20px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height/2 -100;
        
		var text = game.add.text(x, y, "Developer by", style);
        text.anchor.setTo(0.5, 0.5); 
        
        y+=20;
        var text = game.add.text(x, y, "Juliana", style);
        
        y+=20;
        var text = game.add.text(x, y, "Yumi", style);
        
        y+=20;
        var text = game.add.text(x, y, "Rafael", style);
        
        y+=20;
        var text = game.add.text(x, y, "Vivian", style);
    }

    function update() {
    }