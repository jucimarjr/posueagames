var menu_state = { create: create, update: update, start: start };

	//Tela de Menu
	function create() {
		var background = game.add.sprite(0, 0, 'background');
		
		var logo = game.add.sprite(game.world.width/2, game.world.height/2, 'logo');
		logo.anchor.setTo(0.5, 0.5); 
		
		var style = { font: "20px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height -100;
        
		var text = game.add.text(x, y, "Press [space] to start", style);
        text.anchor.setTo(0.5, 0.5); 
        
        y += 30;
        var text = game.add.text(x, y, "[1] CREDITS", style);
        text.anchor.setTo(0.5, 0.5);
        
        y += 30;
        textsound = game.add.text(x, y, "[2] SOUND", style);
        textsound.anchor.setTo(0.5, 0.5);

        playerSprite = game.add.sprite(0, game.world.height/2, 'player');

		game.add.tween(playerSprite).to({y:15}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);  
	}
	
	function update(){
		var spacebar_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar_key.onDown.add(start, this);
        
        var one_key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        one_key.onDown.add(credits, this);
        
        var two_key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        two_key.onDown.add(soung, this);
	}
	
	// Começa o jogo
	function start() {
		game.state.start('play');
	}
	function credits() {
		game.state.start('credits');
	}
	function soung() {
		if(soungFlag){
			soungFlag = false;
			textsound.text ="[2] NO SOUND";
		}else {
			soungFlag = true;
			textsound.text = "[2] SOUND";
		}
	}
	