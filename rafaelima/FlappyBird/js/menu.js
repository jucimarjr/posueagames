var menu_state = { create: create, update: update, start: start };

	//Tela de Menu
	function create() {
		var background = game.add.sprite(0, 0, 'background');
		
		var logo = game.add.sprite(game.world.width/2, game.world.height/2, 'logo');
		logo.anchor.setTo(0.5, 0.5); 
		
		var style = { font: "20px Arial", fill: "#000" };
        var x = game.world.width/2, y = game.world.height -100;
        
		var text = game.add.text(x, y, "Press [SPACEBAR] to start", style);
        text.anchor.setTo(0.5, 0.5); 
        
        y += 30;
        var text = game.add.text(x, y, "[1] CREDITS", style);
        text.anchor.setTo(0.5, 0.5);
        
        y += 30;
        text_sound = game.add.text(game.world.width-70, y+18, "[2]", style);
        text_sound.anchor.setTo(0.5, 0.5);
        
        img_sound = game.add.sprite(game.world.width-50, y, 'sound');
        img_nosound = game.add.sprite(game.world.width-50, y, 'nosound').exists = false;
        

        playerSprite = game.add.sprite(0, 500, 'player');
        playerSprite.animations.add('walk', [0, 1, 2, 3], 8, true);

		game.add.tween(playerSprite).to({y:15}, 2000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);  
	}
	
	function update(){
		playerSprite.animations.play('walk');
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
		if(sound_flag){
			sound_flag = false;
//			text_sound.text ="[2] NO SOUND";
			img_sound.exists = false;
			img_nosound.exists = true;
		}else {
			sound_flag = true;
//			text_sound.text = "[2] SOUND";
			img_sound.exists = true;
			img_nosound.exists = false;
		}
	}
	