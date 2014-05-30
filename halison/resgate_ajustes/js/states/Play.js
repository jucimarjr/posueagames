
State.Play = function (game) {
	this.game = game;
	this.cursors;
};


State.Play.prototype = {

	preload: function () {
		game.load.image('nave', Config.game.nave.dir);
		game.load.image('space', Config.game.background.dir);
		game.load.image('spaceForeground', Config.game.foreground.dir);
		game.load.image('asteroid', Config.game.asteroid.dir);
		game.load.image('gameover', Config.game.gameover.dir);
		game.load.image('score', Config.game.score.dir);
		game.load.image('coin_green_1', Config.game.coins.green.dir1);
		game.load.image('coin_green_2', Config.game.coins.green.dir2);
		game.load.image('coin_green_3', Config.game.coins.green.dir3);
		game.load.image('coin_green_4', Config.game.coins.green.dir4);
		game.load.image('coin_green_5', Config.game.coins.green.dir5);
		game.load.image('coin_green_6', Config.game.coins.green.dir6);
		game.load.image('coin_green_7', Config.game.coins.green.dir7);
		game.load.image('coin_green_8', Config.game.coins.green.dir8);
		game.load.image('coin_red_1', Config.game.coins.red.dir1);
		game.load.image('coin_red_2', Config.game.coins.red.dir2);
		game.load.image('coin_red_3', Config.game.coins.red.dir3);
		game.load.image('coin_red_4', Config.game.coins.red.dir4);
		game.load.image('coin_yellow_1', Config.game.coins.yellow.dir1);
		game.load.image('coin_yellow_2', Config.game.coins.yellow.dir2);
	},
	
	create: function () {
		var time;
		var scale;
		
		velocityScore = 0;
		this.lifeNumber = 6;
		isJogo = true;
		isGameOver = false;
		
		score = 0;
		
		ASTEROID_NUMBER = 13;
		ASTEROID_SPEED = 100; 
		YELLOW_COIN_NUMBER = 30;
		RED_COIN_NUMBER = 30;
		GREEN_COIN_NUMBER = 30;
		
		space1 = game.add.image(0,0,'space');
		space2 = game.add.image(960,0,'space');
		spaceForeground1 = game.add.image(0,0,'spaceForeground');
		spaceForeground2 = game.add.image(960,0,'spaceForeground');

		this.life = [];
		yellowCoins = [];
		redCoins = [];
		greenCoins = [];

		yellowCoins[0] = game.add.image(960,0,'coin_yellow_1');
		yellowCoins[1] = game.add.image(960,0,'coin_yellow_2');
		redCoins[0] = game.add.image(960,0,'coin_red_1');
		redCoins[1] = game.add.image(960,0,'coin_red_2');
		redCoins[2] = game.add.image(960,0,'coin_red_3');
		redCoins[3] = game.add.image(960,0,'coin_red_4');
		greenCoins[0] = game.add.image(960,0,'coin_green_1');
		greenCoins[1] = game.add.image(960,0,'coin_green_2');
		greenCoins[2] = game.add.image(960,0,'coin_green_3');
		greenCoins[3] = game.add.image(960,0,'coin_green_4');
		greenCoins[4] = game.add.image(960,0,'coin_green_5');
		greenCoins[5] = game.add.image(960,0,'coin_green_6');
		greenCoins[6] = game.add.image(960,0,'coin_green_7');
		greenCoins[7] = game.add.image(960,0,'coin_green_8');
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y = 5;
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.restitution = 2.8;
	    
		nave = game.add.sprite(340, 300, 'nave');
		game.physics.p2.enable(nave,false);
		nave.body.setRectangle(90);
		
		nave.body.fixedRotation = true;
		nave.body.data.gravityScale = 0.5;
	
		naveCollisionGroup = game.physics.p2.createCollisionGroup();
		asteroidCollisionGroup = game.physics.p2.createCollisionGroup();
	    
		nave.body.setCollisionGroup(naveCollisionGroup);
	
		asteroidGroup = game.add.group();
		asteroidGroup.enableBody = true;
		asteroidGroup.physicsBodyType = Phaser.Physics.P2JS;
	    
		for (var i = 0; i < ASTEROID_NUMBER; i++)
	    {
			var sprite;
	    	sprite = asteroidGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'asteroid');
	    	sprite.body.setCircle(40);	
	    	sprite.body.setCollisionGroup(asteroidCollisionGroup); //add   
	    	sprite.body.collides([asteroidCollisionGroup, naveCollisionGroup]);
	    	game.physics.p2.enable(sprite, true);
//	    	time = game.rnd.integerInRange(1400,2000);
//	    	scale = time/1200; aqui mesmo oh
	    	sprite.body.allowGravity = false;
	    }
		
		nave.body.setCollisionGroup(naveCollisionGroup);
		nave.body.collides(asteroidCollisionGroup, this.hitAsteroid, this);
		
	//	CRIAR GRUPO MOEDAS AMARELAS E COLISAO COM NAVE
		yellowCoinsCollisionGroup = game.physics.p2.createCollisionGroup();
		yCoinsGroup = game.add.group();
		yCoinsGroup.enableBody = true;
		yCoinsGroup.physicsBodyType = Phaser.Physics.P2JS;
	
		for (var i = 0; i < YELLOW_COIN_NUMBER; i++)
		    {
				var sprite;
				if (Math.random() > 0.5 ){
					sprite = yCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_yellow_1');
				} else {
					sprite = yCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_yellow_2');
				}
		    	sprite.body.setCircle(31);	
		    	sprite.body.setCollisionGroup(yellowCoinsCollisionGroup); //add   
		    	sprite.body.collides([yellowCoinsCollisionGroup, naveCollisionGroup]);
		    	game.physics.p2.enable(sprite, false);
		    	sprite.body.allowGravity = false;
		    }
		
		nave.body.collides(yellowCoinsCollisionGroup, this.hitYellowCoins, this);
	
	
	//	CRIAR GRUPO MOEDAS VERMELHAS E COLISAO COM NAVE
		redCoinsCollisionGroup = game.physics.p2.createCollisionGroup();
		rCoinsGroup = game.add.group();
		rCoinsGroup.enableBody = true;
		rCoinsGroup.physicsBodyType = Phaser.Physics.P2JS;
	
		for (var i = 0; i < RED_COIN_NUMBER; i++)
		    {
				var number = Math.random();
				var sprite = null;
				if (number <= 0.25 ){
					sprite = rCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_red_1');
				} else if (number > 0.25 && number <= 0.5 ){
					sprite = rCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_red_2');
				} else if (number > 0.5  && number <= 0.75){
					sprite = rCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_red_3');
				} else if (number > 0.75){
					sprite = rCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_red_4');
				}
		    	sprite.body.setCircle(31);	
		    	sprite.body.setCollisionGroup(redCoinsCollisionGroup); //add   
		    	sprite.body.collides([redCoinsCollisionGroup, naveCollisionGroup]);
		    	game.physics.p2.enable(sprite, false);
		    	sprite.body.allowGravity = false;
		    }
		
		nave.body.collides(redCoinsCollisionGroup, this.hitRedCoins, this);
		
	//	CRIAR GRUPO MOEDAS VERDES E COLISAO COM NAVE
		greenCoinsCollisionGroup = game.physics.p2.createCollisionGroup();
		gCoinsGroup = game.add.group();
		gCoinsGroup.enableBody = true;
		gCoinsGroup.physicsBodyType = Phaser.Physics.P2JS;
	
		for (var i = 0; i < GREEN_COIN_NUMBER; i++)
		    {
				var number = Math.random();
				var sprite = null;
				if (number <= 0.1 ){
					sprite = gCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_1');
				} else if (number > 0.1 && number <= 0.2 ){
					sprite = gCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_2');
				} else if (number > 0.2 && number <= 0.3 ){
					sprite = gCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_3');
				} else if (number > 0.3 && number <= 0.4 ){
					sprite = gCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_4');
				} else if (number > 0.4 && number <= 0.5 ){
					sprite = gCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_5');
				} else if (number > 0.5 && number <= 0.7 ){
					sprite = gCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_6');
				} else if (number > 0.7 && number <= 0.8 ){
					sprite = gCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_7');
				} else if (number > 0.8){
					sprite = gCoinsGroup.create(500+(200 *i), game.rnd.integerInRange(-100, 600), 'coin_green_8');
				}
		    	sprite.body.setCircle(31);	
		    	sprite.body.setCollisionGroup(greenCoinsCollisionGroup); //add   
		    	sprite.body.collides([greenCoinsCollisionGroup, naveCollisionGroup]);
		    	game.physics.p2.enable(sprite, false);
		    	sprite.body.allowGravity = false;
		    }
		
		nave.body.collides(greenCoinsCollisionGroup, this.hitGreenCoins, this);
		
		game.add.image(Config.game.score.x,Config.game.score.y,'score');
		textScore = game.add.text(Config.game.score.textX,Config.game.score.textY, "000000", {
	        font: "32px Arial",
	        fill: "#ffffff",
	        align: "right"
	    });
		
		textScore.anchor.setTo(0.5, 0.5);
	
	    gameover = game.add.image(980,0,'gameover');
	  
	    this.drawLives();
		
	    this.cursors = game.input.keyboard.createCursorKeys();
		
		
//		setTimeout(function () {
//			game.state.start('HowToPlay').start();
//			game.add.tween(sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 6000, true).start();
//		}, 2000);

	},

	update: function(){
		if ( isJogo )
		{
			space1.x -= 4.8;
			space2.x -= 4.8;
		    if (space1.x + space1.width < 0)
		    {
		    	space1.x = 960;
		    }
		    
		    if (space2.x + space2.width < 0)
		    {
		    	space2.x = 960;
	  	    }
	
		    spaceForeground1.x -= 3;
		    spaceForeground2.x -= 3;
		    
		    if (spaceForeground1.x + spaceForeground1.width < 0)
		    {
		    	spaceForeground1.x = 960;
		    }
		    
		    if (spaceForeground2.x + spaceForeground2.width < 0)
		    {
		    	spaceForeground2.x = 960;
	  	    }
		    
		    nave.body.setZeroVelocity();
			
		    if (this.cursors.up.isDown)
		    {
		    	nave.body.moveDown(180+velocityScore);
		    }
		    
		    else if (this.cursors.down.isDown)
		    {
		    	nave.body.moveUp(180+velocityScore);
		    }  
			
			for (var i = 0; i < ASTEROID_NUMBER ; i++)
			{
				sprite = asteroidGroup.getAt(i);
				sprite.body.setZeroVelocity();
				sprite.body.moveLeft(ASTEROID_SPEED+velocityScore ); //game.rnd.integerInRange(100,200) );
		
				if (sprite.body.x < -sprite.width)
				{
					sprite.reset(game.world.width+sprite.width,game.rnd.integerInRange(-100, 620));
	//				sprite.body.x = game.world.width+sprite.width;
	//				sprite.body.y = game.rnd.integerInRange(-100, 620);
			    }
			}
			for (var i = 0; i < YELLOW_COIN_NUMBER ; i++)
			{
				var sprite = null;
				sprite = yCoinsGroup.getAt(i);
				if (sprite.alive){
					sprite.body.setZeroVelocity();
					sprite.body.moveLeft(ASTEROID_SPEED); //game.rnd.integerInRange(100,200) );
			
					if (sprite.body.x < -sprite.width)
					{
						sprite.body.x = game.world.width+sprite.width;
						sprite.body.y = game.rnd.integerInRange(-100, 620);
				    }
				}
			}
			for (var i = 0; i < RED_COIN_NUMBER ; i++)
			{
				var sprite = null;
				sprite = rCoinsGroup.getAt(i);
				if (sprite.alive){
					sprite.body.setZeroVelocity();
					sprite.body.moveLeft(ASTEROID_SPEED); //game.rnd.integerInRange(100,200) );
			
					if (sprite.body.x < -sprite.width)
					{
						sprite.body.x = game.world.width+sprite.width;
						sprite.body.y = game.rnd.integerInRange(-100, 620);
				    }
				}
			}
			for (var i = 0; i < GREEN_COIN_NUMBER ; i++)
			{
				sprite = gCoinsGroup.getAt(i);
				if (sprite.alive){
					sprite.body.setZeroVelocity();
					sprite.body.moveLeft(ASTEROID_SPEED); //game.rnd.integerInRange(100,200) );
			
					if (sprite.body.x < -sprite.width)
					{
						sprite.body.x = game.world.width+sprite.width;
						sprite.body.y = game.rnd.integerInRange(-100, 620);
				    }
				}
			}
		} 
		
		else if (isGameOver)
		{
			gameover.x = Config.game.gameover.x;
			gameover.y = Config.game.gameover.y;
		}
	
	},
	
	hitAsteroid: function (body1, body2)
	{
		this.decreaseLifeNumber();
	},

	hitYellowCoins: function (body1, body2) 
	{
		if (isGameOver) return;
		score+=3;
		if (score > 100000) 
			score = 999999;
		this.updateTextScore();
		body2.sprite.kill();
	},

	hitRedCoins: function (body1, body2) 
	{
		if (isGameOver) return;
		score--;
		if (score < 0) 
			score = 0;
		this.updateTextScore();
		body2.sprite.kill();
	},

	hitGreenCoins: function (body1, body2) 
	{
		if (isGameOver) return;	
		score+=6;
		if (score > 100000) 
			score = 999999;
		this.updateTextScore();
		body2.sprite.kill();
	},

	updateTextScore: function () {
		var zeros = "0000000";
		if (score < 10 )
			zeros = "00000";
		else if (score < 100)
			zeros = "0000";
		else if (score < 1000)
			zeros = "000";
		else if (score < 10000)
			zeros = "00";
		else if (score < 10000)
			zeros = "0";
		textScore.setText(""+zeros + score);
		if (score > 0)
			velocityScore = score/100; 
	},

	drawLives: function ()
	{
		for ( var i = 0; i < this.lifeNumber; i++)
		{
			this.life[i] = game.add.sprite(Config.game.score.lifeX+(i*50), Config.game.score.lifeY, 'nave');
			this.life[i].scale.x = 0.4;
			this.life[i].scale.y = 0.7;
		}
	},

	decreaseLifeNumber: function ()
	{

		if (this.lifeNumber > 0)
		{
			this.lifeNumber--;
			this.life[this.lifeNumber].kill();
		}
		else 
		{
			this.isJogo = false;
			this.isGameOver = true;
		}
	}
};


 