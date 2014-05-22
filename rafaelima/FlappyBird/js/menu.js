var menu_state = { create: create, update: update, start: start };

	//Tela de Menu
	function create() {
		var background = game.add.sprite(0, 0, 'background');
		
		var logo = game.add.sprite(game.world.width/2, game.world.height/2, 'logo');
		logo.anchor.setTo(0.5, 0.5); 
		
		var style = { font: "20px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height -100;
        
		var text = game.add.text(x, y, "Pressione [espaco] para comecar", style);
        text.anchor.setTo(0.5, 0.5); 
        
        y += 30;
        var text = game.add.text(x, y, "[1] CREDITS", style);
        text.anchor.setTo(0.5, 0.5);
        
        y += 30;
        var text = game.add.text(x, y, "[2] SOUND", style);
        text.anchor.setTo(0.5, 0.5);

        var spacebar_keyboar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar_keyboar.onDown.add(start, this);
        
        var one_keyboar = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        one_keyboar.onDown.add(credits, this);
        
        var two_keyboar = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        two_keyboar.onDown.add(soung, this);
        
        playerSprite = game.add.sprite(0, game.world.height/2, 'player');

		game.add.tween(playerSprite).to({y:15}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);  
	}
	
	function update(){
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
		}else {
			soungFlag = true;
		}
	}
	